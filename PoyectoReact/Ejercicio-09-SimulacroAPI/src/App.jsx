import {useCatFact} from './hooks/useCatFact'
import './App.css'



function App() {
const {fact,image,refreshFact} = useCatFact()

const handleClick = () => {
refreshFact()
}

  return (
    <>
    <h1>API Gatos</h1>
    {fact && <p>{fact}</p>}
    {image && <img src ={image} alt = "Giphy GIF"/>}
    <button onClick = {handleClick}> Change Fact</button>
    </>
  )
}

export default App
