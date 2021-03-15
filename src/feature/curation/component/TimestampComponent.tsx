import React, { useEffect, useState } from 'react'
import InputText from '../../../common/cmponent/input/DefaultInput'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import styled from 'styled-components'
import { DefaultButton } from '../../../common/style/theme'
import { TimeStamp } from '../dto/TimeStamp'
const TimestampContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`
const AddTime = styled(DefaultButton)`
  width: 200px;
  margin: 0 auto;
`

const TimestampList = styled.ul`
  padding: 46px;
`

const TimeStampItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  .time_title {
    font-size: 24px;
  }
  .time_timestamp {
    font-size: 16px;
    margin-left: 8px;
    color: cornflowerblue;
  }

  .time_crate_delete {
    display: flex;
    align-items: center;
  }
`

const TimeStampLeft = styled.div`
  display: flex;
  align-items: center;
`

interface TimestampListProps {
  youtubePlayer: any
  isCreate: boolean
  isYours: boolean
  onUpdate: boolean
  defaultTimestamps?: TimeStamp[]
  onCompleteUpdate: (timestamp: TimeStamp[]) => void
}
const TimeStampComponent = ({
  youtubePlayer,
  isCreate = false,
  isYours,
  defaultTimestamps,
  onUpdate,
  onCompleteUpdate,
}: TimestampListProps) => {
  const [timestampForUpdate, setTimestamp] = useState<TimeStamp[]>(defaultTimestamps ?? [])

  const goToTimeStamp = (time: string) => () => {
    if (youtubePlayer) youtubePlayer.seekTo(time)
  }

  // useEffect(() => {
  //   if (timestampForUpdate) {
  //     onChanged(timestampForUpdate)
  //   }
  // }, [timestampForUpdate])

  const addTimeStamp = () => {
    if (youtubePlayer) {
      const title = ''
      let time
      const second: number = youtubePlayer.getCurrentTime()
      let seconds = parseInt(second.toString(), 10)
      if (second > 60) {
        const minute = Math.floor(seconds / 60)
        seconds = seconds - minute * 60
        time = `${minute}:${seconds < 10 ? '0' : ''}${seconds}`
      } else {
        time = '00:' + seconds
      }
      if (!timestampForUpdate.find((etime) => etime.timestamp == time)) {
        const nStamp = new TimeStamp()
        nStamp.second = second.toString()
        nStamp.timestamp = time
        nStamp.title = title
        setTimestamp(timestampForUpdate.concat(nStamp))
      }
    }
  }

  const removeItem = (time: TimeStamp) => () => {
    setTimestamp(timestampForUpdate.filter((etime) => etime.timestamp != time.timestamp))
  }

  const showItem = (timestamp: TimeStamp[]) => {
    return timestamp.map((time, index) => (
      <TimeStampItem key={time.timestamp + time.title}>
        <TimeStampLeft>
          {index + 1}
          <InputText
            id={'time_' + time.timestamp}
            placeholder={'타임스탬프명'}
            innerStyle={{ fontSize: '18px' }}
            defaultText={time.title}
            style={{ marginLeft: '16px' }}
            readonly={!isCreate && !onUpdate}
            onChangeKeyword={() => {}}
          />
          <div className="time_timestamp" onClick={goToTimeStamp(time.second)}>
            {time.timestamp}
          </div>
        </TimeStampLeft>
        {isYours && onUpdate && (
          <div className="time_crate_delete">
            <AiOutlineMinusCircle size={24} onClick={removeItem(time)} />
          </div>
        )}
      </TimeStampItem>
    ))
  }

  return (
    <TimestampContainer>
      {(isCreate || (onUpdate && isYours)) && (
        <AddTime onClick={addTimeStamp}>현재시간으로 타임스탬프 추가</AddTime>
      )}
      <TimestampList>{showItem(onUpdate ? timestampForUpdate : defaultTimestamps)}</TimestampList>
      {onUpdate && (
        <DefaultButton onClick={() => onCompleteUpdate(timestampForUpdate)}>수정완료</DefaultButton>
      )}
    </TimestampContainer>
  )
}

export default TimeStampComponent
