import React, { useEffect, useRef } from 'react'
import useScript from '../../../hook/useScript'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'

const Container = styled.div`
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

interface MyProps {
  youtubeId: string
  onReadyPlayer: (player: any) => void
}
const YoutubePlayer = ({ youtubeId, onReadyPlayer }: MyProps) => {
  useEffect(() => {
    return () => {
      player.current = null
    }
  }, [])
  const player = useRef(null)
  const successScript = useScript('https://www.youtube.com/iframe_api')

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
      onReadyPlayer(player.current)
    }
  }

  const goToTimeStamp = (time: string) => {
    if (player) player.current.seekTo(time)
  }

  function onPlayerReady(event) {
    // event.target.playVideo()
  }

  function onPlayerStateChange(event) {
    // console.log('event', event)
  }

  function stopVideo() {
    player.current.stopVideo()
  }

  useEffect(() => {
    if (successScript && youtubeId) {
      setTimeout(() => onYouTubeIframeAPIReady(youtubeId), 500)
    }
  }, [successScript, youtubeId])

  function youtube_parser(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
    const match = url.match(regExp)
    return match && match[7].length == 11 ? match[7] : false
  }

  return (
    <Container>
      {youtubeId ? (
        <div className="videoWrapper">
          <div id="player" />
        </div>
      ) : null}
    </Container>
  )
}

export default YoutubePlayer
