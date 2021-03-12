import axios from 'axios'
import { getAccessToken, setAccessToken } from '../service/TokenService'

const myAxios = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_HOST + '/api/v1',
  timeout: 5000,
})

myAxios.defaults.withCredentials = true

if (getAccessToken() != null) {
  myAxios.defaults.headers.common['Authorization'] = 'Bearer ' + getAccessToken()
}

myAxios.interceptors.request.use(
  function (config) {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
      return Promise.resolve(config)
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          const retryToken = getAccessToken()
          if (retryToken) {
            console.log('[axios]success get async token from app')
            console.log(retryToken)
            config.headers.Authorization = 'Bearer ' + retryToken
          }
          resolve(config)
        }, 500)
      })
    }
  },
  (error) => Promise.reject(error)
)

myAxios.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {
    const originalRequest = error.config
    if (error.response) {
      if (error.response.status === 401 && originalRequest.url.includes('refresh_token')) {
        console.log('재발급 중 오류')
        return Promise.reject(error)
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        if (!getAccessToken()) {
          console.log('토큰이 없습니다.')
          // return (document.location.href = '/')
        }
        console.log('[axios]start refresh token')
        originalRequest._retry = true
        return axios
          .get('https://localhost:3100/auth/refresh_token')
          .then((res) => {
            if (res.data) {
              const access_token = res.data.accessToken
              console.log('[axios]success new token receive : ' + access_token)
              setAccessToken(access_token)
              originalRequest.headers['Authorization'] = 'Bearer ' + access_token
              return myAxios(originalRequest)
            } else {
              return Promise.reject('재발급에러')
            }
          })
          .catch((err) => {
            console.log('토큰 재발급 중 에러가 발생했습니다.')
            console.log(err)
            // console.log('refresh token error');
            // window.location.href = '/login';
            return Promise.reject(error)
          })
      } else {
        console.log(error)
      }
    }
  }
)

export default myAxios
