import React, { useEffect, useRef, useState } from 'react'
import { setCookieFromServer } from '../../src/common/MyAxios'
import {
  getCurationDetail,
  useMyCurationDetail,
  useMyCurationList,
} from '../../src/feature/curation/api/CurationAPI'
import YoutubePlayer from '../../src/feature/curation/component/YoutubePlayer'
import styled from 'styled-components'
import { CurationDetailResponse } from '../../src/feature/curation/dto/CurationDetailResponse'
import TimestampList from '../../src/feature/curation/component/TimestampList'
import { TimeStamp } from '../../src/feature/curation/dto/TimeStamp'
import { CurationResponse } from '../../src/feature/curation/dto/CurationResponse'
import { DefaultButton } from 'src/common/style/theme'
import { useQueryClient } from 'react-query'
import { elementType } from 'prop-types'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Information = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  .curation_title {
    font-size: 18px;
  }

  .curation_viewCnt {
    margin-top: 4px;
    font-size: 14px;
  }
`

export const getServerSideProps = async (context) => {
  setCookieFromServer(context)
  let result: CurationDetailResponse
  try {
    const response = await getCurationDetail(Number(context.params.id))
    console.log(response.data)
    result = response.data
  } catch (e) {
    console.log(e)
  }

  return {
    props: {
      data: result,
      id: context.params.id,
    },
  }
}
interface Props {
  data: CurationDetailResponse
  id: string
}

const CurationDetail = ({ data, id }: Props) => {
  const yPlayer = useRef(null)
  const { isLoading, error, data: curation, refetch } = useMyCurationDetail<CurationDetailResponse>(
    data,
    id
  )

  const [curations, setCurations] = useState<CurationDetailResponse>(null)
  useEffect(() => {
    if (curation) {
      setCurations(curation)
    }
  }, [curation])

  const [onUpdate, setOnUpdate] = useState(false)

  const goToTimeStamp = (time: string) => {
    if (yPlayer.current) yPlayer.current.seekTo(time)
  }

  function removeItem(time: TimeStamp) {
    setCurations({
      ...curations,
      timestamp: curations.timestamp.filter((etime) => etime.timestamp != time.timestamp),
    })
  }

  function onCompleteUpdate() {}

  return (
    <Container>
      {curations && (
        <>
          <YoutubePlayer
            youtubeId={curations.youtube.id}
            onReadyPlayer={(player) => (yPlayer.current = player)}
          />
          <Information>
            <div>
              <b className="curation_title">{curations.title}</b>
              <div className="curation_viewCnt">조회수 {curations.viewCnt}회</div>
            </div>

            {curations.yours && (
              <DefaultButton onClick={() => setOnUpdate(!onUpdate)}>
                {onUpdate ? '수정취소' : '수정하기'}
              </DefaultButton>
            )}
          </Information>

          <TimestampList
            onUpdate={onUpdate}
            isYours={curations.yours}
            goToTime={goToTimeStamp}
            isCreate={false}
            timestamp={curations.timestamp}
            removeTimeStamp={removeItem}
          />

          {onUpdate && <DefaultButton onClick={onCompleteUpdate}>수정완료</DefaultButton>}
        </>
      )}
    </Container>
  )
}

export default CurationDetail
