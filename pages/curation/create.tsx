import React, { useState } from 'react'
import styled from 'styled-components'
import InputText from '../../src/common/cmponent/input/DefaultInput'
import { DefaultButton } from '../../src/common/style/theme'
import useScript from '../../src/hook/useScript'
import axios from 'axios'
import { Youtube } from '../../src/feature/curation/dto/Youtube'
import { CurationCreateDTO } from '../../src/feature/curation/dto/CurationCreateDTO'
import { createCuration } from '../../src/feature/curation/api/CurationAPI'
import { TimeStamp } from '../../src/feature/curation/dto/TimeStamp'
import { useRouter } from 'next/router'
import YoutubePlayer from '../../src/feature/curation/component/YoutubePlayer'
import TimeStampComponent from '../../src/feature/curation/component/TimestampComponent'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 0px;

  .title {
    font-size: 24px;
  }

  .videoWrapper {
    margin-top: 16px;
    position: relative;
    padding-bottom: 56.25%; /* 16:9 비율인 경우 */
    /* padding-bottom값은 4:3 비율인 경우 75%로 설정합니다 */
    padding-top: 25px;
    height: 0;
  }

  .videoWrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

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

const CurationCreate = () => {
  const [player, setPlayer] = useState<any>(null)
  const [youtubeId, setId] = useState('')
  const [url, setUrl] = useState('')
  const [timestamp, setTimestamp] = useState<TimeStamp[]>([])
  const [curationTitle, setCurationTitle] = useState('')
  const successScript = useScript('https://www.youtube.com/iframe_api')
  const router = useRouter()

  function youtube_parser(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
    const match = url.match(regExp)
    return match && match[7].length == 11 ? match[7] : false
  }

  const onChangeUrl = (keyword: string) => {
    setUrl(keyword)
    if (youtube_parser(keyword)) {
      setId(youtube_parser(keyword))
    }
  }

  function onCreateCuration() {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDRSMHVJ850BO1WwH55Ii7raCnkR3LcGRc&part=snippet&id=${youtubeId}`
      )
      .then((r) => {
        const { data } = r
        const { categoryId, channelTitle, thumbnails, title, tags } = data.items[0].snippet

        const resolution = thumbnails.high
          ? thumbnails.high
          : thumbnails.medium
          ? thumbnails.medium
          : thumbnails.default
        console.log(resolution)
        const thumbnail = resolution.url
        const youtube = new Youtube()
        youtube.thumbnail = thumbnail
        youtube.categoryId = categoryId
        youtube.channelTitle = channelTitle
        youtube.youtubeTitle = title
        youtube.url = url
        youtube.tags = tags ? tags.join('') : channelTitle
        youtube.id = youtubeId
        const cDto = new CurationCreateDTO()
        cDto.timestamp = timestamp
        cDto.title = curationTitle
        cDto.youtube = youtube
        createCuration(cDto)
          .then((r) => {
            const createdId = r.data.id
            router.replace('/my_curation/' + createdId)
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Container>
      <b className="title">큐레이션 생성</b>

      <InputText
        style={{ marginTop: '16px' }}
        onChangeKeyword={(keyword) => setCurationTitle(keyword)}
        placeholder="제목을 입력해주세요"
        divider
      />

      <InputText
        style={{ marginTop: '16px' }}
        onChangeKeyword={(keyword) => onChangeUrl(keyword)}
        placeholder="영상 URL을 입력해주세요"
        id="url"
        divider
      />

      <YoutubePlayer youtubeId={youtubeId} onReadyPlayer={(player) => setPlayer(player)} />

      {youtubeId && (
        <TimestampContainer>
          <TimeStampComponent
            youtubePlayer={player}
            isYours={true}
            isCreate={true}
            defaultTimestamps={timestamp}
            onChangeTimestamp={(timestamp) => {
              setTimestamp(timestamp)
            }}
          />
        </TimestampContainer>
      )}

      <DefaultButton onClick={onCreateCuration}>생성완료</DefaultButton>
    </Container>
  )
}

export default CurationCreate
