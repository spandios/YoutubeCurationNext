import React from 'react'
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login'
import { LoginRequest, Provider } from '../dto/LoginRequest'
import { fetchLogin } from '../api/AuthAPI'
import { getAccessToken } from '../../../service/TokenService'

const MyGoogleLogin = () => {
  const onSuccess = (response: GoogleLoginResponse) => {
    const loginRequest = new LoginRequest()
    if (response.profileObj) {
      const basicProfile = response.getBasicProfile()
      loginRequest.email = basicProfile.getEmail()
      loginRequest.name = basicProfile.getName()
      loginRequest.providerId = basicProfile.getId()
      loginRequest.name = basicProfile.getName()
      loginRequest.provider = Provider.GOOGLE

      fetchLogin(loginRequest)
        .then((r) => {
          console.log(r)
          setTimeout(() => {
            console.log(getAccessToken())
          }, 1000)
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
      cookiePolicy={'single_host_origin'}
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
      onSuccess={onSuccess}
      onFailure={(err) => {
        console.log(err)
      }}
    />
  )
}

export default MyGoogleLogin
