import myAxios from '../../../common/MyAxios'
import { UserResponse } from '../dto/UserResponse'
const DOMAIN = '/user'

export const fetchMe = () => {
  return myAxios.get<UserResponse>(DOMAIN + '/me')
}
