import {colorList,appearance} from './types'
import React, { useEffect } from 'react'
import {useCookies} from 'react-cookie'
// import styled from 'styled-components'

type InputProps = {
  appearance: appearance;
  stateAction: React.Dispatch<React.SetStateAction<appearance>>;
}

// background: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#000000' :'#eeeeee'
export const defaultSettings: appearance = {
  width: 400,
  height: 4000,
  colors:{
    hour: '#e76a2b',
    minute: '#75d87d',
    second: '#529ef5',
    background: '#eeeeee' ,
    circleBackground: '#eeeeee',
  },
  analogClock: true
} 

export const ColorCodeInput: React.VFC<InputProps> = (props: InputProps) => {
  const [appearanceFromCookie, setAppearanceCookie, removeAppearanceCookie] = useCookies(['settings'])
  const settings: appearance = appearanceFromCookie.settings || defaultSettings
  useEffect(() => {
    props.stateAction(settings)
  },[settings])
  return (
    <section>
      <h2>Appearance Settings</h2>
      <button
        onClick={() => {
          removeAppearanceCookie('settings')
          props.stateAction(defaultSettings)
        }}
      >
        clear
      </button>
      <ul>
        <li>
          <p>
            <label htmlFor={'analog_clock'}>
              analog clock:
            </label>
            <input
              type={'checkbox'}
              checked={settings.analogClock}
              onChange={
                (e) => {
                  const newValues :appearance = {
                    ...settings,
                    analogClock:e.target.checked
                  }
                  props.stateAction(newValues)
                  setAppearanceCookie('settings', newValues)
                }
              }
              id={'analog_clock'}
            />
          </p>
        </li>
        {
          Object.keys(settings.colors).map((v, i) => {
            const key = v as keyof colorList
            return (
              key != 'circleBackground'
                ? <li key={i}>
                  <p>
                    <label htmlFor={key}>
                      {key}:
                    </label>
                    <input
                      type={'color'}
                      value={settings.colors[key]}
                      onChange={
                        (e) => {
                          const newValues: appearance = {
                            ...settings,
                            colors: {
                              ...settings.colors,
                              [key]:e.target.value
                            }
                          }
                          props.stateAction(newValues)
                          setAppearanceCookie('settings', newValues)
                        }
                      }
                      id={key}
                    />
                  </p>
                </li>
                : null
            )
          })
        }
      </ul>
    </section>
  )
}

export default ColorCodeInput