import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

type ClockComponent = {
  time: Date;
}


const Clockbody: React.VFC<ClockComponent> = (props: ClockComponent) => {
  const clockRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [canPip,switchCanPip] = useState(false)
  const seconds: number = props.time.getSeconds()
  const [msg,setMsg] = useState('loading...')

  useEffect(() => {
    const clockEl = clockRef.current
    if (!clockEl) return
    const clockCtx = clockRef.current.getContext('2d')
    if (!clockCtx) return
    clockRef.current.width = 400
    clockRef.current.height = 4000

    type colorCode = string;
    const hourColor: colorCode    = '#e76a2b'
    const minutesColor: colorCode = '#75d87d'
    const secondColor: colorCode = '#529ef5'
    let backgroudColor: colorCode = '#eee'
    let circleBackgroudColor: colorCode = '#ddd'
    
    if (window.matchMedia('(prefers-color-scheme: dark)').matches === true) {
      backgroudColor = '#000'
      circleBackgroudColor = '#222'
    }
    clockCtx.fillStyle = backgroudColor
    clockCtx.fillRect(0, 0, clockEl.width, clockEl.height)
    
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
    clockCtx.strokeStyle = props.time.getHours() % 2 == 0 ? minutesColor : circleBackgroudColor
    clockCtx.lineWidth = props.time.getHours() % 2 == 0 ? 25 : 26
    clockCtx.stroke()
    
    clockCtx.beginPath()
    clockCtx.arc( clockEl.width/2, 200, 80, (0 + 270) * Math.PI / 180, (props.time.getMinutes() * 6 + props.time.getSeconds() * 0.1 + 270) * Math.PI / 180, false )
    clockCtx.strokeStyle = props.time.getHours() % 2 == 1 ? minutesColor : circleBackgroudColor
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
    
    clockCtx.font = '300px Hiragino Sans'
    clockCtx.textBaseline = 'middle'
    const hourMargin = 540
    const minutesMargin = 300

    clockCtx.fillStyle = hourColor
    clockCtx.fillText(('0'+props.time.getHours()).slice(-2), 0, hourMargin)

    clockCtx.fillStyle = minutesColor
    clockCtx.fillText(('0'+props.time.getMinutes()).slice(-2), 0, hourMargin+minutesMargin)

    clockCtx.fillStyle = secondColor
    clockCtx.fillText(('0'+props.time.getSeconds()).slice(-2), 0, hourMargin+minutesMargin*2)

  }, [seconds])
  
  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return
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
        <canvas ref={clockRef} ></canvas>
        {/* <canvas ref={clockRef} width={380} height={1280}></canvas> */}
        <video
          muted={true}
          playsInline={true}
          ref={videoRef}
        />
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
`

export default Clockbody