import {colorList,appearance} from './types'
import React from 'react'
// import styled from 'styled-components'

type InputProps = {
  appearance: appearance;
  stateAction: React.Dispatch<React.SetStateAction<appearance>>;
}

export const ColorCodeInput: React.VFC<InputProps> = (props:InputProps) => {
  return (
    <section>
      <h2>Appearance Settings</h2>
      <ul>
        <li>
          <p>
            <label htmlFor={'analog_clock'}>
              analog clock:
            </label>
            <input
              type={'checkbox'}
              checked={props.appearance.analogClock}
              onChange={
                (e) => {
                  props.stateAction({
                    ...props.appearance,
                    analogClock:e.target.checked
                  })
                }
              }
              id={'analog_clock'}
            />
          </p>
        </li>
        {
          Object.keys(props.appearance.colors).map((v, i) => {
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
                      value={props.appearance.colors[key]}
                      onChange={
                        (e) => {
                          props.stateAction({
                            ...props.appearance,
                            colors: {
                              ...props.appearance.colors,
                              [key]:e.target.value
                            }
                          })
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