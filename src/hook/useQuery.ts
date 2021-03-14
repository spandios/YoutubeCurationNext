import myAxios from '../common/MyAxios'
import { useQuery, UseQueryOptions } from 'react-query'

export const useMyQuery = <T>(
  key: string,
  request: string,
  options: UseQueryOptions<unknown, unknown, T> = { refetchOnMount: false }
) => {
  return useQuery(key, () => myAxios.get<T>(request).then((r) => r.data), options)
}
