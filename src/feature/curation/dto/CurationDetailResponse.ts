import { Youtube } from './Youtube'
import { TimeStamp } from './TimeStamp'

export class CurationDetailResponse {
  id: number
  title: string
  viewCnt: number
  likeCnt: number
  commentCnt: number
  youtube: Youtube
  timestamp: TimeStamp[]
  yours: boolean
  createdAt: Date
}
