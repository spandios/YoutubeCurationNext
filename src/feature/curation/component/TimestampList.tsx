import React from 'react'
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
  isCreate: boolean
  isYours: boolean
  onUpdate: boolean
  timestamp: TimeStamp[]
  goToTime: (time: string) => void
  addTimeStamp?: () => void
  removeTimeStamp?: (time: TimeStamp) => void
}
const TimeStampList = ({
  isCreate = false,
  isYours,
  timestamp,
  goToTime,
  addTimeStamp,
  removeTimeStamp,
  onUpdate,
}: TimestampListProps) => {
  return (
    <TimestampContainer>
      {isCreate && <AddTime onClick={addTimeStamp}>현재시간으로 타임스탬프 추가</AddTime>}
      <TimestampList>
        {timestamp.map((time, index) => (
          <TimeStampItem key={time.timestamp + time.title}>
            <TimeStampLeft>
              {index + 1}
              <InputText
                id={'time_' + time.timestamp}
                placeholder={'타임스탬프명'}
                innerStyle={{ fontSize: '18px' }}
                defaultText={time.title}
                style={{ marginLeft: '16px' }}
                readonly={!isCreate}
              />
              <div className="time_timestamp" onClick={() => goToTime(time.second)}>
                {time.timestamp}
              </div>
            </TimeStampLeft>
            {isYours && onUpdate && (
              <div className="time_crate_delete">
                <AiOutlineMinusCircle size={24} onClick={() => removeTimeStamp(time)} />
              </div>
            )}
          </TimeStampItem>
        ))}
      </TimestampList>
    </TimestampContainer>
  )
}

export default TimeStampList
