import React, { useEffect, useState } from 'react'
import { setCookieFromServer } from '../../src/common/MyAxios'
import {
  CURATION_DETAIL,
  getCurationDetail,
  useCurationDetail,
} from '../../src/feature/curation/api/CurationAPI'
import YoutubePlayer from '../../src/feature/curation/component/YoutubePlayer'
import styled from 'styled-components'
import TimestampList from '../../src/feature/curation/component/TimestampComponent'
import { useIsLogin } from '../../src/hook/ussIsLogin'
import { useSwrLocal } from '../../src/hook/useSwrLocal'
import { useLocalCurationDetail } from '../../src/feature/curation/hook/useLocalCurationDetail'
import { CurationDetailResponse } from '../../src/feature/curation/dto/CurationDetailResponse'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 46px 0px 100px 0px;
`

const Information = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;

  .curation_title {
    font-size: 24px;
  }

  .curation_viewCnt {
    margin-top: 4px;
    font-size: 14px;
  }
`

export const getServerSideProps = async (context) => {
  setCookieFromServer(context)
  let result = null
  try {
    const response = await getCurationDetail(context.params.id)
    result = response.data || null
  } catch (e) {
    console.log(e)
  }

  return {
    props: {
      id: context.params.id,
      data: result,
    },
  }
}

const MyCurationDetail = ({ data, id }) => {
  const isLogin = useIsLogin()
  const [youtubePlayer, setYoutubePlayer] = useState()
  const { data: curation, isValidating, error, mutate } = useCurationDetail(id, data)
  const { mutation } = useSwrLocal<CurationDetailResponse>(CURATION_DETAIL)
  useEffect(() => {
    if (curation) mutation(curation)
  }, [curation])

  return (
    <Container>
      {curation && (
        <>
          <YoutubePlayer
            youtubeId={curation.youtube.id}
            onReadyPlayer={(player) => {
              setYoutubePlayer(player)
            }}
          />
          <Information>
            <div>
              <b className="curation_title">{curation.title}</b>
              <div className="curation_viewCnt">조회수 {curation.viewCnt}회</div>
            </div>
          </Information>

          <TimestampList
            youtubePlayer={youtubePlayer}
            isYours={isLogin && curation.yours}
            isCreate={false}
            defaultTimestamps={curation.timestamp}
            onCompleteUpdate={(timestamp) => {
              // setCuration({ ...curation, timestamp: timestamp })
            }}
          />
        </>
      )}
    </Container>
  )
}

export default MyCurationDetail
