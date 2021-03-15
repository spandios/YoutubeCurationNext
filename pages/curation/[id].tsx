import React, { useEffect, useRef, useState } from 'react'
import { setCookieFromServer } from '../../src/common/MyAxios'
import { getCurationDetail, useCurationDetail } from '../../src/feature/curation/api/CurationAPI'
import YoutubePlayer from '../../src/feature/curation/component/YoutubePlayer'
import styled from 'styled-components'
import { CurationDetailResponse } from '../../src/feature/curation/dto/CurationDetailResponse'
import TimestampList from '../../src/feature/curation/component/TimestampComponent'
import { DefaultButton } from 'src/common/style/theme'
import { useIsLogin } from '../../src/hook/ussIsLogin'
import { useParams } from 'react-router'
import { useRouter } from 'next/router'

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
  let result
  try {
    const response = await getCurationDetail(context.params.id)
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

const CurationDetail = ({ data, id }) => {
  const router = useRouter()
  const isLogin = useIsLogin()
  const yPlayer = useRef(null)
  const [onUpdate, setOnUpdate] = useState(false)
  const { data: curation, isValidating, error, mutate } = useCurationDetail(id, data)

  return (
    <Container>
      {curation && (
        <>
          <YoutubePlayer
            youtubeId={curation.youtube.id}
            onReadyPlayer={(player) => (yPlayer.current = player)}
          />
          <Information>
            <div>
              <b className="curation_title">{curation.title}</b>
              <div className="curation_viewCnt">조회수 {curation.viewCnt}회</div>
            </div>

            {isLogin && curation.yours ? (
              <DefaultButton onClick={() => setOnUpdate(!onUpdate)}>
                {onUpdate ? '수정취소' : '수정하기'}
              </DefaultButton>
            ) : null}
          </Information>

          <TimestampList
            youtubePlayer={yPlayer.current}
            onUpdate={onUpdate}
            isYours={curation.yours}
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

export default CurationDetail
