import myAxios from '../../../common/MyAxios'
import { CurationCreateDTO } from '../dto/CurationCreateDTO'
import { CurationDetailResponse } from '../dto/CurationDetailResponse'
import useSWR from 'swr'
import { CurationResponse } from '../dto/CurationResponse'

const DOMAIN = 'curation'

export function getMyCurationList() {
  return myAxios.get<CurationResponse[]>(DOMAIN + '/me')
}

export function useMyCurationList() {
  return useSWR<CurationResponse[]>('getMyCurationList', () =>
    getMyCurationList().then((r) => r.data)
  )
}

export function getCurationDetail(curationId: string) {
  return myAxios.get<CurationDetailResponse>(DOMAIN + '/' + curationId)
}

export function useCurationDetail(curationId: string, initialData) {
  return useSWR<CurationDetailResponse>(
    'getCurationDetail',
    () => getCurationDetail(curationId).then((r) => r.data),
    { initialData }
  )
}

export function createCuration(curation: CurationCreateDTO) {
  return myAxios.post(DOMAIN + '/', curation)
}
