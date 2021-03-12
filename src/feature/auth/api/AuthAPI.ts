import myAxios from '../../../common/MyAxios'
import { LoginRequest } from '../dto/LoginRequest'
const DOMAIN = '/auth'

export const fetchLogin = (loginRequest: LoginRequest) => {
  return myAxios.post(DOMAIN + '/login', loginRequest)
}
