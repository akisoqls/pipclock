import React from 'react'
import GlobalStyle from './globalStyle'
import ClockBody from './clockBody'
import Githublogo from './images/GitHub_Logo.png'

function App() {
  return (
    <div className="App">
      <GlobalStyle/>
      <h1>pipclock</h1>
      <ClockBody />
      <p><button onClick={() => location.reload()} >close / reopen clock window</button></p>
      <p>
        <a href="https://github.com/akisoqls/pipclock">
          <img src={Githublogo} height={24}/>
        </a>
      </p>
    </div>
  )
}
export default App
