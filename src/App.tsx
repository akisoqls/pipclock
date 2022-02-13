import React,{useState,useEffect} from 'react'
import Clockbody from './clockbody'
import GlobalStyle from './globalStyle'

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
      <p><button onClick={()=>location.reload()} >close / reopen clock window</button></p>
    </div>
  )
}

export default App
