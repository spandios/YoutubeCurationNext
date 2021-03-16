import React from 'react'
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login'
import { LoginRequest, Provider } from '../dto/LoginRequest'
import { fetchLogin } from '../api/AuthAPI'
import styled from 'styled-components'
import { DefaultButton } from '../../../common/style/theme'
import { useDispatch } from 'react-redux'
import { setIsLogin } from 'src/feature/common.slice'
import { setToken } from '../../../service/TokenService'

const MyGoogleLogin = () => {
  const Login = styled(DefaultButton)``
  const dispatch = useDispatch()
  const onSuccess = (response: GoogleLoginResponse) => {
    const loginRequest = new LoginRequest()
    if (response.profileObj) {
      const basicProfile = response.getBasicProfile()
      loginRequest.email = basicProfile.getEmail()
      loginRequest.name = basicProfile.getFamilyName() + basicProfile.getGivenName()
      loginRequest.providerId = basicProfile.getId()
      loginRequest.provider = Provider.GOOGLE
      fetchLogin(loginRequest)
        .then((r) => {
          if (r.data.accessToken && r.data.refreshToken) {
            setToken(r.data.accessToken, r.data.refreshToken)
            dispatch(setIsLogin(true))
          } else {
            dispatch(setIsLogin(false))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      console.log('로그인 실패')
    }
  }

  return (
    <GoogleLogin
      buttonText="Login"
      render={(renderProps) => (
        <Login onClick={renderProps.onClick} disabled={renderProps.disabled}>
          로그인
        </Login>
      )}
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
      onSuccess={onSuccess}
      onFailure={(err) => {
        console.log(err)
      }}
    />
  )
}

export default MyGoogleLogin
