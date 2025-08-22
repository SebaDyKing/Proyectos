import { useState } from 'react'
import './App.css'

const Square = ({color,hasQueen,onClick}) => {
  const className = `square ${color} ${hasQueen ? 'has-queen' : ''}`.trim()
  return (
    <div className={className} onClick={onClick} >
      {hasQueen && '♛'}
    </div>
  )
}

const Board = ({board, updateBoard}) => {
  const size = 8
  const squares = []
  for (let row = 0; row < size; row++) {
    for (let colum = 0; colum < size; colum++) {
      const index = `${row}-${colum}`
      const numericIndex = row * size + colum
      const color = (row + colum) % 2 === 0 ? 'white' : 'black'
      squares.push(
        <Square 
          key={index} 
          hasQueen={board[numericIndex]} 
          onClick={() => updateBoard(numericIndex)} 
          color={color}
        />
      )
    }
  }
  return <div className="board">{squares}</div>
}


const checkPosition = (index, board) => {
  const size = 8
  const row = Math.floor(index / size)
  const col = index % size


  for (let c = 0; c < size; c++) {
    const numericIndex = row * size + c
    if(board[numericIndex]) return false
  }

  for (let r = 0; r < size; r++) {
    const numericIndex = r * size + col
    if(board[numericIndex]) return false
  }

// Se mueve primero a la esquina superior izquierda
  let r = row, c = col
  while (r > 0 && c > 0) {
    r--
    c--
  }
//Recorre la diagonal hacia abajo a la izquierda
  while (r < size && c < size) {
    if(board[r * size + c]) 
      if (r !== row || c !== col) {
      return false
    }
    r++
    c++
  }

// Se mueve primero a la esquina superior derecha
  r = row , c = col
  while (r > 0 && c < size-1) {
    r--
    c++
  }
//Recorre la diagonal hacia abajo a la derecha
  while (r < size && c > 0) {
    if(board[r * size + c]) 
      if (r !== row || c !== col) {
      return false
      }
    r++
    c--
  }
  return true
}
function App() {

const [board, setBoard] = useState(Array(64).fill(false))
const [contador, setContador] = useState(8)
const [winner, setWinner] = useState(null)



const checkWinner = (board) => {
  if (board.filter(Boolean).length === 8) return true
  return false
}

const checkEndGame = (board) => {
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      if( checkPosition(i, board)) {
        return false
      }
    }
  }
  return true
}


const updateBoard = (index) => {

  if (board[index]) return
  if (!checkPosition(index, board)) return

  
  const newBoard = [...board]

  newBoard[index] = true
  setBoard(newBoard)
  setContador(contador - 1)
  if (checkWinner(newBoard)) {
    setWinner(true)
  } else if (checkEndGame(newBoard)) {
    setWinner(false)
  }

}
  return (
    <>
    <h1>Juego De las 8 Reynas</h1>
    <h2>Reinas colocadas: {contador}</h2>
    <Board board={board} updateBoard={updateBoard} />

    {winner !== null && (
      <section className='winner'>
        <div className = 'winner-message'>
          
         {winner ? <h2>¡Ganaste!</h2> : <h2>¡Lastima Intentelo denuevo!</h2>}
           
        <footer>
          <button onClick = {() => {
            setBoard(Array(64).fill(false))
            setContador(8)
            setWinner(null)
          }}>Reiniciar Juego</button>
          </footer>
        </div>
          </section>
  
    )}
          <footer>
          <button onClick = {() => {
            setBoard(Array(64).fill(false))
            setContador(8)
            setWinner(null)
          }}>Reiniciar Juego</button>
          </footer>
        
    </>
    
  )
}

export default App
