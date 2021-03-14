import myAxios from '../../../common/MyAxios'
import { useMyQuery } from '../../../hook/useQuery'
import { CurationCreateDTO } from '../dto/CurationCreateDTO'
import { CurationDetailResponse } from '../dto/CurationDetailResponse'
const DOMAIN = 'curation'
export function getMyCurationList() {
  return myAxios.get(DOMAIN + '/me')
}

export function useMyCurationList<T>(initialData: T) {
  return useMyQuery<T>('getMyCurationList', DOMAIN + '/me', { initialData, refetchOnMount: false })
}

export function getCurationDetail(curationId: number) {
  return myAxios.get<CurationDetailResponse>(DOMAIN + '/' + curationId)
}

export function useMyCurationDetail<T>(initialData: T, curationId) {
  return useMyQuery<T>('getMyCurationDetail', DOMAIN + '/' + curationId, {
    initialData,
    refetchOnMount: false,
  })
}

export function createCuration(curation: CurationCreateDTO) {
  return myAxios.post(DOMAIN + '/', curation)
}
