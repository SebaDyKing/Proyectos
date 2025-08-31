import { useState } from 'react'
import initialBoard from './InitialBoard'
import checkPosition from './ChessMoves/checkPosition'
import { checkWinner } from './ChessMoves/checkWinner'
import './App.css'


const Turn = {
  WHITE: 'white',
  BLACK: 'black'
}
const piecesUnicode = {
  white: { P: '♙', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔' },
  black: { P: '♟', R: '♜', N: '♞', B: '♝', Q: '♛', K: '♚' }
}



const iniBoard =  [...initialBoard]

const Square = ({ color, piece, onClick }) => {
  return (
    <div className={`square ${color}`} onClick={onClick}>
      {piece && (
        <span style={{ 
          color: piece.color === 'white' ? '#fff' : '#000' ,
        }}>
          {piecesUnicode[piece.color][piece.tipo]}
        </span>
      )}
    </div>
  )
}

const Board = ({board,updateBoard}) =>{
   const size = 8
   const squares = []
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const index = row * size + col
        const color = (row + col) % 2 === 0 ? 'white' : 'black'
        squares.push(
              <Square 
                key = {index}
                piece = {board[row][col]}
                onClick = {() => {updateBoard(index)}}                      
                color = {color}
              />
        )  
      }
    }  
    return <div className="board">{squares}</div>
}


function App() {
  const [board, setBoard] = useState(iniBoard)
  const [selectedPiece, setSelectedPiece] = useState(null)
  const [turn, setTurn] = useState(Turn.WHITE)
  const [winner, setWinner] = useState(null)
  
  
const resetGame = () => {
    setBoard(iniBoard)
    setTurn(Turn.WHITE)
    setWinner(null)
  }
  
const updateBoard = (index) => {
  const fromRow = selectedPiece !== null ? Math.floor(selectedPiece / 8) : null
  const fromCol = selectedPiece !== null ? selectedPiece % 8 : null
  const toRow = Math.floor(index / 8)
  const toCol = index % 8


  if (selectedPiece === null) {
    const piece = board[toRow][toCol]
    if (piece && piece.color === turn) {
      setSelectedPiece(index)
    }
    return
  }

  const piece = board[fromRow][fromCol]
  
  if (piece && checkPosition(selectedPiece, board, index)) {
    const newBoard = board.map(row => row.slice())
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol]
    newBoard[fromRow][fromCol] = null
  const nextTurn = turn === Turn.WHITE ? Turn.BLACK : Turn.WHITE
  const gameWinner = checkWinner(newBoard, nextTurn)
  if (gameWinner) {
    setBoard(newBoard)
    setWinner(gameWinner)
    setSelectedPiece(null)
    return
  } 
    setBoard(newBoard)
    setTurn(turn === Turn.WHITE ? Turn.BLACK : Turn.WHITE)
    setSelectedPiece(null)
  } else {
    setSelectedPiece(null)
  }

}


  return (
    <>
    <Board 
      board={board} 
      updateBoard={updateBoard}
    />
     <button onClick={resetGame}>Reiniciar el juego</button>
    {winner && (
      <section className='winner'>
        <div className='text'>
          <h2>
          {winner === 'draw' ? 'Empate!' : `¡Ha ganado las ${winner}!`}
          </h2>

          <footer>
            <button onClick={resetGame}>Empezar de nuevo</button>
          </footer>
        </div>
      </section>
    )}
  </>
  )
}
export default App
