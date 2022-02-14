import React,{useState,useEffect} from 'react'
import Clockbody from './clockbody'
import GlobalStyle from './globalStyle'
import Githublogo from './images/GitHub_Logo.png'

function App() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    setInterval(() => {
      setNow(new Date())
    },100)
  }, [])
  return (
    <div className="App">
      <GlobalStyle/>
      <h1>pipclock</h1>
      <Clockbody time={now} />
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
