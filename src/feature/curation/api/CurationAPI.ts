import myAxios from '../../../common/MyAxios'
import { CurationCreateDTO } from '../dto/CurationCreateDTO'
import { CurationDetailResponse } from '../dto/CurationDetailResponse'
import useSWR from 'swr'
import { CurationResponse } from '../dto/CurationResponse'
import { useIsLogin } from '../../../hook/ussIsLogin'
import { TimeStampCreateDTO, TimestampUpdateDTO } from '../dto/TimestampUpdateDTO'
import { TimeStamp } from '../dto/TimeStamp'

const DOMAIN = 'curation'
export const CURATION_DETAIL = 'CURATION_DETAIL'
export function getMyCurationList() {
  return myAxios.get<CurationResponse[]>(DOMAIN + '/me')
}

export function useMyCurationList() {
  const isLogin = useIsLogin()
  return useSWR<CurationResponse[]>(isLogin ? 'getMyCurationList' : null, () =>
    getMyCurationList().then((r) => r.data)
  )
}

export function getCurationDetail(curationId: string) {
  return myAxios.get<CurationDetailResponse>(DOMAIN + '/me/' + curationId)
}

export function useCurationDetail(curationId: string, initialData) {
  return useSWR<CurationDetailResponse>(
    'getCurationDetail' + curationId,
    () => getCurationDetail(curationId).then((r) => r.data),
    { initialData }
  )
}

export function createCuration(curation: CurationCreateDTO) {
  return myAxios.post(DOMAIN + '/', curation)
}

export function updateTimestamp(dto: TimestampUpdateDTO) {
  return myAxios.put(DOMAIN + '/me/' + dto.curationId + '/timestamp', dto.timestamp)
}

export function createTimestamp(time: TimeStampCreateDTO) {
  return myAxios.post<TimeStamp>(DOMAIN + '/me/' + time.curationId + '/timestamp', time.timestamp)
}
