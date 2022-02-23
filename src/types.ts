import { Brand } from 'utility-types'

export type colorCode = Brand<string, 'colorCode'>
export const isColorCode = (value: string): value is colorCode => /^#{1}[0-9a-f]{3,6}$/.test(value)

export type appearance = {
  width: number;
  height: number;
  colors: colorList;
  analogClock: boolean;
}

export type colorList = {
  hour: string;
  minute: string;
  second: string;
  background: string;
  circleBackground: string;
}


export type ClockSettings =  {
  time: Date;
  appearance: appearance;
}

export default null