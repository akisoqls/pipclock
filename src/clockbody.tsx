import React, { useState, useEffect } from 'react'
import { ClockSettings } from './types'

import ClockVideo from './clockVideo'
import ColorCodeInput,{defaultSettings} from './colorCodeInput'


const ClockBody: React.VFC = () => {
  const [now, setNow] = useState(new Date())
  const [appearances, setAppearances] = useState(defaultSettings)

  useEffect(() => {
    setInterval(() => {
      setNow(new Date())
    },300)
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