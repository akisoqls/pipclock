import React, { useState, useEffect } from 'react'
import {ClockSettings, appearance} from './types'

import ClockVideo from './clockvideo'
import ColorCodeInput from './colorCodeInput'


const ClockBody: React.VFC = () => {
  const defaultSettings: appearance = {
    width: 400,
    height: 4000,
    colors:{
      hour: '#e76a2b',
      minute: '#75d87d',
      second: '#529ef5',
      background: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#000000' :'#eeeeee' ,
      circleBackground: '',
    },
    analogClock: true
  }
  const [now, setNow] = useState(new Date())
  const [appearances, setAppearances] = useState(defaultSettings)

  useEffect(() => {
    setInterval(() => {
      setNow(new Date())
    },100)
  }, [])
  
  const settings:ClockSettings = {
    time: now,
    appearance: appearances
  }

  return (
    <>
      <ClockVideo {...settings} />
      <ColorCodeInput stateAction={setAppearances} appearance={appearances}/>
    </>
  )
}

export default ClockBody