import React, { useEffect, useState } from 'react'
import InputText from '../../../common/cmponent/input/DefaultInput'
import styled from 'styled-components'
import theme, { DefaultButton, DefaultText, ErrorMessage } from '../../../common/style/theme'
import { TimeStamp } from '../dto/TimeStamp'
import { LeftRightAnimation } from '../../../common/style/animation/LeftRightAnimation'
import { CURATION_DETAIL, updateTimestamp } from '../api/CurationAPI'
import { useSwrLocal } from '../../../hook/useSwrLocal'
import { CurationDetailResponse } from '../dto/CurationDetailResponse'
import { MdMoreVert } from 'react-icons/md'
import SelectDrop from '../../../common/cmponent/select/drop/SelectDrop'

const TimestampContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  width: 100%;
  height: fit-content;
  overflow: visible;
  .highlight_title {
    margin-top: 8px;
    font-size: 24px;
    font-weight: bold;
  }
  .timestamp_update_btn {
    margin: 0 auto;
  }
`
const AddTime = styled(DefaultButton)`
  width: 200px;
  margin: 0 auto;
`

const TimestampList = styled.ul`
  //padding: 38px;
  margin-bottom: 38px;
  overflow: visible;
`

const TimeStampItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  height: 48px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${theme.colors.border_color};
  position: relative;
  overflow: visible;
  .time_title {
    font-size: 16px;
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

const TimestampDoButton = styled.div`
  display: flex;
  margin-top: 16px;
  margin-left: 8px;
`

const TimeStampLeft = styled.div`
  display: flex;
  align-items: center;
`

interface TimestampListProps {
  youtubePlayer: any
  isCreate: boolean
  isYours: boolean
  defaultTimestamps?: TimeStamp[]
  onCompleteUpdate: (timestamp: TimeStamp[]) => void
}

const TimeStampComponent = ({
  youtubePlayer,
  isCreate = false,
  isYours,
  defaultTimestamps,
  onCompleteUpdate,
}: TimestampListProps) => {
  const [error, setError] = useState(null)
  const [onUpdate, setOnUpdate] = useState(false)
  const [visibleSelectDrop, setVisibleSelectDrop] = useState<number>(undefined)

  const closeSelectDrop = () => {
    setVisibleSelectDrop(undefined)
  }
  const [timestampForUpdate, setTimestamp] = useState<TimeStamp[]>(defaultTimestamps ?? [])
  const { data: selectedCuration } = useSwrLocal<CurationDetailResponse>(CURATION_DETAIL)
  const goToTimeStamp = (time: string) => () => {
    if (youtubePlayer) youtubePlayer.seekTo(time)
  }

  useEffect(() => {
    console.log(visibleSelectDrop)
  }, [visibleSelectDrop])

  //타임스탬프 업데이트
  const onClickUpdateBtn = (timestamp: TimeStamp) => () => {
    if (selectedCuration) {
      console.log(selectedCuration)
      timestampForUpdate.forEach((time) => {
        const title = document.getElementById('time_' + time.timestamp) as HTMLInputElement
        if (title) {
          time.title = title.value
        }
      })

      updateTimestamp({ curationId: selectedCuration.id, timestamp })
        .then((r) => {
          onClickUpdateCancel()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  //타임스탬프 추가하기
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
      } else {
        if (error == null) {
          setError('DUPLICATED')
          setTimeout(() => {
            setError(null)
          }, 3000)
        }
      }
    }
  }

  //타임스탬프 삭제하기
  const removeItem = (time: TimeStamp) => () => {
    setTimestamp(timestampForUpdate.filter((etime) => etime.timestamp != time.timestamp))
  }

  function onClickUpdate(time: TimeStamp) {
    return function () {
      closeSelectDrop()
      setTimestamp(
        timestampForUpdate.map((tt) => {
          return { ...tt, is_update: tt.timestamp === time.timestamp }
        })
      )

      setTimeout(() => {
        const input = document.getElementById('time_' + time.timestamp) as HTMLInputElement
        if (input) input.focus()
      }, 300)
    }
  }

  function onClickUpdateCancel() {
    closeSelectDrop()
    setTimestamp(
      timestampForUpdate.map((tt) => {
        return { ...tt, is_update: false }
      })
    )
  }

  function onClickDelete(time: TimeStamp) {
    return function () {
      closeSelectDrop()
    }
  }

  return (
    <TimestampContainer>
      <DefaultText bold fontSize={'20px'} margin="16px 0px 8px 0px">
        하이라이트
      </DefaultText>

      <TimestampList>
        {timestampForUpdate.map((time, index) => (
          <>
            <TimeStampItem key={time.timestamp + time.title}>
              <TimeStampLeft>
                {!time.is_update ? (
                  <div className="time_title">{time.title}</div>
                ) : (
                  <InputText
                    id={'time_' + time.timestamp}
                    placeholder={'타임스탬프명'}
                    innerStyle={{ fontSize: '18px' }}
                    defaultText={time.title}
                  />
                )}

                <div className="time_timestamp" onClick={goToTimeStamp(time.second)}>
                  {time.timestamp}
                </div>
              </TimeStampLeft>
              {isYours && (
                <>
                  <div className="time_crate_delete">
                    {!time.is_update && (
                      <MdMoreVert size={22} onClick={() => setVisibleSelectDrop(index)} />
                    )}
                    <SelectDrop
                      active={index === visibleSelectDrop}
                      setActive={() => {
                        setVisibleSelectDrop(undefined)
                      }}
                    >
                      <span onClick={onClickUpdate(time)}>수정</span>
                      <span onClick={onClickDelete(time)}>삭제</span>
                    </SelectDrop>
                  </div>
                </>
              )}
            </TimeStampItem>
            {isYours && time.is_update && (
              <TimestampDoButton>
                <DefaultButton noDivider onClick={onClickUpdateCancel}>
                  취소
                </DefaultButton>
                <DefaultButton onClick={onClickUpdateBtn(time)}>적용</DefaultButton>
              </TimestampDoButton>
            )}
          </>
        ))}
      </TimestampList>

      {(isCreate || isYours) && (
        <>
          <LeftRightAnimation error={error === 'DUPLICATED'}>
            <AddTime error={error === 'DUPLICATED'} onClick={addTimeStamp}>
              타임스탬프 추가
            </AddTime>
          </LeftRightAnimation>
          <ErrorMessage error={error === 'DUPLICATED'}>
            이미 같은 시간의 타임스탬프가 있습니다.
          </ErrorMessage>
        </>
      )}
    </TimestampContainer>
  )
}

export default TimeStampComponent
