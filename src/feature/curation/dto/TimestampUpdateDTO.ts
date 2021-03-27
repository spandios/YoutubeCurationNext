import { TimeStamp } from './TimeStamp'

export class TimestampUpdateDTO {
  curationId: number
  timestamp: TimeStamp
}

export class TimeStampCreateDTO {
  curationId: number
  timestamp: TimeStamp
}
