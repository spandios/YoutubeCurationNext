import axios from 'axios'
import { getAccessToken, setAccessToken } from '../service/TokenService'
import { sign, verify } from '../service/JwtService'
import { objectTraps } from 'immer/dist/core/proxy'
import jwt from 'jsonwebtoken'
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
  async function (config) {
    const token = getAccessToken()
    const decode = jwt.decode(token) as any
    const exp = decode.exp
    if (Date.now() >= exp * 1000) {
      console.log('Expired')
    }
    if (token) config.headers.Authorization = 'Bearer ' + token
    // verify(token)
    //   .then((r) => {
    //     console.log(r)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    return Promise.resolve(config)
    if (token) {
      // verify(token)
      //   .then((r) => {
      //     console.log('verify')
      //     config.headers.Authorization = 'Bearer ' + token
      //     return Promise.resolve(config)
      //   })
      //   .catch((err) => {
      //     console.log('token이 expired됨')
      //     console.log(err)
      //     if (err.message === 'jwt expired') {
      //       return myAxios
      //         .post('/auth/refresh_token')
      //         .then((res) => {
      //           if (res.data) {
      //             const access_token = res.data.accessToken
      //             console.log('[axios]success new token receive : ' + access_token)
      //             setAccessToken(access_token)
      //             config.headers.Authorization = 'Bearer ' + token
      //             return Promise.resolve(config)
      //           } else {
      //             return Promise.reject('재발급에러')
      //           }
      //         })
      //         .catch((err) => {
      //           console.log('토큰 재발급 중 에러가 발생했습니다.')
      //           console.log(err)
      //           return Promise.reject(err)
      //         })
      //     }
      //   })
    } else {
      return new Promise((resolve) => {
        const retryToken = getAccessToken()
        if (retryToken) {
          console.log('[axios]success get async token from app')
          console.log(retryToken)
          config.headers.Authorization = 'Bearer ' + retryToken
        }
        resolve(config)
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
        return myAxios
          .post('/auth/refresh_token')
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

export function setCookieFromServer(context: any) {
  myAxios.defaults.headers.Cookie = context.req.headers.cookie
}

export default myAxios
