import { Youtube } from './Youtube'

export class CurationResponse {
  id: number
  title: string
  viewCnt: number
  likeCnt: number
  commentCnt: number
  youtube: Youtube
  createdAt: Date
}
