import myAxios from '../../../common/MyAxios'
import { JwtResponse, LoginRequest } from '../dto/LoginRequest'
const DOMAIN = '/auth'

export const fetchLogin = (loginRequest: LoginRequest) => {
  return myAxios.post<JwtResponse>(DOMAIN + '/login', loginRequest)
}
