import './App.css'
import { useCatFact } from './hooks/useCatFact'
import { Otro } from './Componentes/Otro'

function App() {
const {fact,imageUrl, refreshFact} = useCatFact()

const handleClick = async () => {
  refreshFact()
}


  return (
    <>
    <h1>API De gatitos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt="Imagen de un gato" />}
    <button onClick = {handleClick}>Change Fact!</button>
    <Otro />
    </>
  )
}

export default App
