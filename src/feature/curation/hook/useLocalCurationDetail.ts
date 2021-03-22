import { useSwrLocal } from '../../../hook/useSwrLocal'
import { CURATION_DETAIL } from '../api/CurationAPI'
import { CurationDetailResponse } from '../dto/CurationDetailResponse'

export const useLocalCurationDetail = (data?: CurationDetailResponse) => {
  return useSwrLocal(CURATION_DETAIL, data)
}
