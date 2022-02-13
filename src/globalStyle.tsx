import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    overflow: hidden;
  }
  @media (prefers-color-scheme: dark) {
    body {
      background-color: #000;
      color: #fff;
    }
  }
  @media (prefers-color-scheme: light) {
    body {
      background: #fff;
      color: #000;
    }
  }
`
export default GlobalStyle