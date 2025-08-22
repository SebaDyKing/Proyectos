import { useState } from 'react'
import Display from './Components/Display'
import Board from './Components/Board'
import './App.css'
function App() {
 //const size = difficulty === 'easy' ? 8 : difficulty === 'medium' ? 16 : 24
  const size = 8 // Default size for the board
  const [difficulty, setDifficulty] = useState('easy')
  const [board, setBoard] = useState(Array(64).fill(null).map(() => ({
    haveMine: false,
    isDiscovered: false,
    isFlagged: false,
  })))
 


 
  const adjacentMines = (index) => {
  const row = Math.floor(index / size)
  const col = index % size
  let count = 0

  for (let r = row - 1; r <= row + 1; r++) {
    for(let c = col -1; c<= col + 1; c++ ){
       const numericIndex = r * size + c
       if((r >=0 && r < size && c >= 0 && c < size && numericIndex !== index) && board[numericIndex].haveMine){
         count++
       }
    }
}
return count
}

const onRightClick = (index) => {
  const newBoard = [...board]
  newBoard[index].isFlagged = !newBoard[index].isFlagged
  updateBoard(newBoard)
} 
const handleClick = (index) => {} // TODO

const updateBoard = (index) => {} // TODO
  return (
    <>
    <div className ='container'>
    <Display />
    <Board 
      difficulty={difficulty}
      board={board} 
      adjacentMines={adjacentMines}
      onRightClick={onRightClick}
      onClick = {updateBoard}
    />
    </div>
    
    </>
  )
}

export default App
