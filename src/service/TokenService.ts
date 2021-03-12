import Cookies from 'universal-cookie'

const cookies = new Cookies()
export const setAccessToken = (accessToken: string) => {
  cookies.set('access_token', accessToken, {
    path: '/',
  })
}

export const setRefreshToken = (refreshToken: string) => {
  cookies.set('refresh_token', refreshToken, { path: '/', httpOnly: true, maxAge: 60 * 60 * 1000 })
}

export const setToken = (accessToken: string, refreshToken?: string) => {
  cookies.set('access_token', accessToken, {
    path: '/',
  })

  if (refreshToken != null) {
    setRefreshToken(refreshToken)
  }
  cookies.get('refresh_token')
}

export const getAccessToken = (): string => {
  return cookies.get('access_token')
}

export const isInitWebview = (): string => {
  return cookies.get('isInitWebview')
}

export const getRefreshToken = (): string => {
  return cookies.get('refresh_token')
}

export const clearToken = (): void => {
  cookies.remove('access_token')
  cookies.remove('refresh_token')
}
