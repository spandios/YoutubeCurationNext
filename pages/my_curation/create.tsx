import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import InputText from '../../src/common/cmponent/input/DefaultInput'
import { isMobile } from 'react-device-detect'
import { DefaultButton, DefaultButtonCss } from '../../src/common/style/theme'
import useScript from '../../src/hook/useScript'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import axios from 'axios'
import { Youtube } from '../../src/feature/curation/dto/Youtube'
import { CurationCreateDTO } from '../../src/feature/curation/dto/CurationCreateDTO'
import { createCuration } from '../../src/feature/curation/api/CurationAPI'
import { TimeStamp } from '../../src/feature/curation/dto/TimeStamp'
import nextServerlessLoader from 'next/dist/build/webpack/loaders/next-serverless-loader'
import { useRouter } from 'next/router'

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
  const player = useRef(null)
  const [youtubeId, setId] = useState('')
  const [url, setUrl] = useState('')
  const [timestamp, setTimestamp] = useState<TimeStamp[]>([])
  const [curationTitle, setCurationTitle] = useState('')
  const successScript = useScript('https://www.youtube.com/iframe_api')
  const router = useRouter()
  const goToTimeStamp = (time: string) => {
    if (player) player.current.seekTo(time)
  }
  const addTimestamp = () => {
    if (player) {
      const title = ''
      let time
      const second: number = player.current.getCurrentTime()
      let seconds = parseInt(second.toString(), 10)
      if (second > 60) {
        const minute = Math.floor(seconds / 60)
        seconds = seconds - minute * 60
        time = `${minute < 10 ? '0' : ''}${minute}:${seconds < 10 ? '0' : ''}${seconds}`
      } else {
        time = '00:' + seconds
      }
      if (!timestamp.find((etime) => etime.timestamp == time)) {
        const nStamp = new TimeStamp()
        nStamp.second = second.toString()
        nStamp.timestamp = time
        nStamp.title = title
        setTimestamp(timestamp.concat(nStamp))
      }
    }
  }

  useEffect(() => {
    console.log(timestamp)
  }, [timestamp])

  function youtube_parser(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
    const match = url.match(regExp)
    return match && match[7].length == 11 ? match[7] : false
  }

  useEffect(() => {
    if (successScript && youtubeId) {
      onYouTubeIframeAPIReady(youtubeId)
    }
  }, [successScript, youtubeId])

  function onYouTubeIframeAPIReady(id: string) {
    // @ts-ignore
    if (YT.loaded) {
      // @ts-ignore
      player.current = new YT.Player('player', {
        height: isMobile ? 250 : 500,
        width: '100%',
        videoId: id,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      })
    }
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo()
  }

  function onPlayerStateChange(event) {
    console.log('event', event)
  }

  function stopVideo() {
    player.current.stopVideo()
  }

  const onChangeUrl = (keyword: string) => {
    setUrl(keyword)
    if (youtube_parser(keyword)) {
      setId(youtube_parser(keyword))
    }
  }

  function removeItem(time: TimeStamp) {
    return function () {
      setTimestamp(timestamp.filter((etime) => etime.timestamp !== time.timestamp))
    }
  }

  function onCreateCuration() {
    const timestamps: TimeStamp[] = timestamp.map((etime) => {
      const elementById = document.getElementById(`time_${etime.timestamp}`) as HTMLInputElement
      return { ...etime, title: elementById.value }
    })

    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDRSMHVJ850BO1WwH55Ii7raCnkR3LcGRc&part=snippet&id=${youtubeId}`
      )
      .then((r) => {
        const { data } = r
        console.log(data.items[0])
        const { categoryId, channelTitle, thumbnails, title, tags } = data.items[0].snippet
        const thumbnail = thumbnails.standard.url
        const youtube = new Youtube()
        youtube.thumbnail = thumbnail
        youtube.categoryId = categoryId
        youtube.channelTitle = channelTitle
        youtube.youtubeTitle = title
        youtube.url = url
        youtube.tags = tags ? tags.join('') : channelTitle
        youtube.id = youtubeId
        const cDto = new CurationCreateDTO()
        cDto.timestamp = timestamps
        cDto.title = curationTitle
        cDto.youtube = youtube
        console.log(cDto)
        createCuration(cDto)
          .then((r) => {
            const createdId = r.data.id
            router.replace('/curation/' + createdId)
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
      />

      <InputText
        style={{ marginTop: '16px' }}
        onChangeKeyword={(keyword) => onChangeUrl(keyword)}
        placeholder="영상 URL을 입력해주세요"
        id="url"
      />

      <div className="videoWrapper">
        <div id="player" />
      </div>

      {youtubeId && (
        <TimestampContainer>
          <AddTime onClick={addTimestamp}>현재시간으로 타임스탬프 추가</AddTime>
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
                  />
                  <div className="time_timestamp" onClick={() => goToTimeStamp(time.second)}>
                    {time.timestamp}
                  </div>
                </TimeStampLeft>
                <div className="time_crate_delete">
                  <AiOutlineMinusCircle size={24} onClick={removeItem(time)} />
                </div>
              </TimeStampItem>
            ))}
          </TimestampList>
        </TimestampContainer>
      )}

      <DefaultButton onClick={onCreateCuration}>완료</DefaultButton>
    </Container>
  )
}

export default CurationCreate
