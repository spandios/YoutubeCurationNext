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
    }
    return Promise.resolve(config)
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
        if (!originalRequest.headers.Authorization) {
          console.log('토큰이 없습니다.')
          if (process.browser) {
            return (document.location.href = '/')
          }
        }
        console.log('[axios]start refresh token')
        originalRequest._retry = true
        return myAxios
          .post('/auth/refresh_token')
          .then((res) => {
            if (res.data) {
              const access_token = res.data.accessToken
              console.log('[axios]success new token receive : ' + access_token)
              if (process.browser) setAccessToken(access_token)
              myAxios.defaults.headers['Authorization'] = 'Bearer ' + access_token
              originalRequest.headers['Authorization'] = 'Bearer ' + access_token
              console.log('start originalreqeust')
              return myAxios(originalRequest)
            } else {
              return Promise.reject('재발급에러')
            }
          })
          .catch((err) => {
            console.log('토큰 재발급 중 에러가 발생했습니다.')
            console.log(err)
            return Promise.reject(error)
          })
      } else {
        console.log(error)
      }
    }
  }
)

export function setCookieFromServer(context: any) {
  myAxios.defaults.headers.cookie = context.req.headers.cookie
  myAxios.defaults.headers.Authorization = context.req.headers.Authorization
  // console.log(myAxios)
  // const decode = decoded(context.req.headers.cookie.access_token)
  // console.log(decode)
}

export default myAxios
