import Square from './Square'





export function Board({difficulty,board,handleClick,adjacentMines,onRightClick}) {
const size = difficulty === 'easy' ? 8 : difficulty === 'medium' ? 16 : 24
const mines = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 40 : 99
const squares = []



for (let row = 0; row < size; row++) {
    for (let colum = 0; colum < size; colum++) {
      const index = `${row}-${colum}`
      const numericIndex = row * size + colum
      squares.push(
        <Square 
          key = {index}
          haveMine = {board[numericIndex].haveMine}
          isDiscovered = {board[numericIndex].isDiscovered}
          isFlagged = {board[numericIndex].isFlagged}
          index = {numericIndex}
          onClick={() => handleClick(numericIndex)}
          numberOfMines={adjacentMines(numericIndex)}
          onRightClick={() => onRightClick(numericIndex)}
        />
      )
    }  
  }
  return <div className="board">{squares}</div>
 }


export default Board