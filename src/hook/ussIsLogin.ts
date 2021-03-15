import { useSelector } from 'src/store/rootReducer'

export function useIsLogin(): boolean {
  const isLogin = useSelector((state) => state.common.isLogin)
  return isLogin
}
