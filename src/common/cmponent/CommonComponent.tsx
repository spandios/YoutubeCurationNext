import React, { useEffect } from 'react'
import { setIsLogin } from '../../feature/common.slice'
import { useDispatch } from 'react-redux'
import { getAccessToken } from '../../service/TokenService'
import { fetchMe } from '../../feature/user/api/UserAPI'
import { useIsLogin } from '../../hook/ussIsLogin'

const CommonComponent = () => {
  const dispatch = useDispatch()
  const isLogin = useIsLogin()
  useEffect(() => {
    if (getAccessToken() != null) {
      if (!isLogin)
        fetchMe()
          .then((r) => {
            console.log('get fetch me')
            console.log(r.data)
            if (r.data) dispatch(setIsLogin(true))
          })
          .catch((err) => {
            dispatch(setIsLogin(false))
            console.log(err)
          })
    }
  }, [])
  return <></>
}

export default CommonComponent
