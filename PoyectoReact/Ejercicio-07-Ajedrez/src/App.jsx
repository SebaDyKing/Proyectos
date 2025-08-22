import { useState } from 'react'
import initialBoard from './InitialBoard'
import './App.css'



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

const updateBoard = (index) => {

}
  
const checkPosition = (index,board) =>{
  const size = 8
  const row = Math.floor(index / size)
  const col = index % size
  const piece = board[row][col]

  

  
}

  return (
    <>
    <Board 
      board={board} 
      setBoard={setBoard}
    />
    </>
  )
}

export default App
