import React, { useEffect } from 'react'
import { setIsLogin } from '../../feature/common.slice'
import { useDispatch } from 'react-redux'
import { getAccessToken } from '../../service/TokenService'
import { fetchMe } from '../../feature/user/api/UserAPI'

const CommonComponent = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (getAccessToken() != null) {
      fetchMe()
        .then((r) => {
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
