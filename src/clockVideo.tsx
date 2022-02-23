// hogehoge

import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import {colorCode,isColorCode, ClockSettings } from './types'

const ClockVideo: React.VFC<ClockSettings> = (props: ClockSettings) => {
  const clockRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [canPip,switchCanPip] = useState(false)
  const [msg, setMsg] = useState('loading...')

  useEffect(() => {
    // console.log(props.appearance)
    const clockEl = clockRef.current
    if (!clockEl) {
      console.log('clockRefないerror!')
      return
    }
    const clockCtx = clockRef.current.getContext('2d')
    if (!clockCtx) {
      console.log('getContextできないerror!')
      return
    }
    clockRef.current.width = props.appearance.width
    clockRef.current.height = props.appearance.height
    if (
      !isColorCode(props.appearance.colors.hour) || 
      !isColorCode(props.appearance.colors.minute) || 
      !isColorCode(props.appearance.colors.second) || 
      !isColorCode(props.appearance.colors.background)
    ) {
      console.log('error!')
      return
    }
    const hourColor: colorCode    = props.appearance.colors.hour
    const minuteColor: colorCode = props.appearance.colors.minute
    const secondColor: colorCode = props.appearance.colors.second
    const backgroudColor: colorCode =  props.appearance.colors.background
    const circleBackgroudColor: colorCode = props.appearance.colors.background

    clockCtx.fillStyle = backgroudColor
    clockCtx.fillRect(0, 0, clockEl.width, clockEl.height)
    if (props.appearance.analogClock) {
      clockCtx.beginPath()
      clockCtx.arc( clockEl.width/2, 200, 60, 0 * Math.PI / 170,  360 * Math.PI / 180, false )
      clockCtx.strokeStyle = props.time.getHours() >= 12 ? circleBackgroudColor:hourColor
      clockCtx.lineWidth = props.time.getHours() >= 12 ? 25:24
      clockCtx.stroke()
      
      clockCtx.beginPath()
      clockCtx.arc( clockEl.width/2, 200, 60, (0 + 270) * Math.PI / 180, ((props.time.getHours() - 12) * 30 + props.time.getMinutes() * 0.5 + 270) * Math.PI / 180, false )
      clockCtx.strokeStyle = props.time.getHours() >= 12 ? hourColor : circleBackgroudColor
      clockCtx.lineWidth = props.time.getHours() >= 12 ? 24:25
      clockCtx.stroke()

      clockCtx.beginPath()
      clockCtx.arc( clockEl.width/2, 200, 80, 0 * Math.PI / 180,  360 * Math.PI / 180, false )
      clockCtx.strokeStyle = props.time.getHours() % 2 == 0 ? minuteColor : circleBackgroudColor
      clockCtx.lineWidth = props.time.getHours() % 2 == 0 ? 25 : 26
      clockCtx.stroke()
      
      clockCtx.beginPath()
      clockCtx.arc( clockEl.width/2, 200, 80, (0 + 270) * Math.PI / 180, (props.time.getMinutes() * 6 + props.time.getSeconds() * 0.1 + 270) * Math.PI / 180, false )
      clockCtx.strokeStyle = props.time.getHours() % 2 == 1 ? minuteColor : circleBackgroudColor
      clockCtx.lineWidth = props.time.getHours() % 2 == 1 ? 25 : 26
      clockCtx.stroke()

      clockCtx.beginPath()
      clockCtx.arc( clockEl.width/2, 200, 100, 0 * Math.PI / 180,  360 * Math.PI / 180, false )
      clockCtx.strokeStyle = props.time.getMinutes() % 2 == 0 ? secondColor : circleBackgroudColor
      clockCtx.lineWidth = props.time.getMinutes() % 2 == 0 ? 25 : 26
      clockCtx.stroke()
      
      clockCtx.beginPath()
      clockCtx.arc( clockEl.width/2, 200, 100, (0 + 270) * Math.PI / 180, (props.time.getSeconds() * 6 + 270) * Math.PI / 180, false )
      clockCtx.strokeStyle = props.time.getMinutes() % 2 == 1 ? secondColor : circleBackgroudColor
      clockCtx.lineWidth = props.time.getMinutes() % 2 == 1 ? 25 : 26
      clockCtx.stroke()
    }
    
    clockCtx.font = '300px Hiragino Sans'
    clockCtx.textBaseline = 'middle'
    const hourMargin = 540
    const minutesMargin = 300

    clockCtx.fillStyle = hourColor
    clockCtx.fillText(('0'+props.time.getHours()).slice(-2), 0, hourMargin)

    clockCtx.fillStyle = minuteColor
    clockCtx.fillText(('0'+props.time.getMinutes()).slice(-2), 0, hourMargin+minutesMargin)

    clockCtx.fillStyle = secondColor
    clockCtx.fillText(('0'+props.time.getSeconds()).slice(-2), 0, hourMargin+minutesMargin*2)

  }, [props])
  
  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) {
      return
    }
    videoEl.autoplay = true
    videoEl.volume = 0.0
    videoEl.playsInline = true
    videoEl.setAttribute('autoPictureInPicture','true')
    videoEl.setAttribute('volume', '0.0')
    videoEl.setAttribute('playsinline', 'true')
    if(!clockRef.current) return
    videoEl.srcObject = clockRef.current.captureStream(60)
    videoEl.play()
    videoEl.addEventListener('playing', function () {
      switchCanPip(true)
      setMsg('open clock window')
    })
  }, [])
  return (
    <>
      <Preview className={'clock'}>
        <video
          muted={true}
          playsInline={true}
          ref={videoRef}
        />
        <canvas ref={clockRef} ></canvas>
      </Preview>
      <p>If the button is disabled, please check Low Power Mode is turned off with iOS.</p>
      <p>ボタンが無効になっている場合は、低電力モードがオフになっていることを確認してください。</p>
      <p><button onClick={() => videoRef.current && videoRef.current.requestPictureInPicture()} disabled={!videoRef.current || !canPip}>{msg}</button></p>
    </>
  )
}

const Preview = styled.div`
  width: 34px;
  aspect-ratio: 0.1;
  position: fixed;
  right: 12px;
  bottom: 10px;
  & canvas,
  & video{
    height: 100%;
    position: absolute;
    border-radius: 10px;
    box-shadow: 0px 0px 8px #ddd8;
    border: 1px solid #eee;
    background-color: #fff;
    @media (prefers-color-scheme: dark) {
      background-color: #000;
      box-shadow: 0px 0px 8px #4448;
      border: 1px solid #888;
    }
  }
  & canvas{
    /* right: -10px; */
    /* border: 1px solid #f00; */
  }
`

export default ClockVideo