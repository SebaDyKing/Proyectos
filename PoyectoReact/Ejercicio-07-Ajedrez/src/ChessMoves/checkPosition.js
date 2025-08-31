  export const checkPosition = (index,board,targetIndex) =>{
  const size = 8

  const row = Math.floor(index / size)
  const col = index % size
  const targetRow = Math.floor(targetIndex / size)
  const targetCol = targetIndex % size

  const piece = board[row][col]
  if(!piece) return false

  let validMove = false

  switch(piece.tipo){
    case 'P':
      validMove = checkPawnMove(piece.color,row,col,targetRow,targetCol,board) 
      break
    case 'R':
      validMove = checkRookMove(row,col,targetRow,targetCol,board)
      break
    case 'N':
      validMove = checkHorseMove(piece.color,row,col,targetRow,targetCol,board)
      break
    case 'B':
      validMove = checkBishopMove(row,col,targetRow,targetCol,board)
      break
    case 'Q':
      validMove = checkQueenMove(row,col,targetRow,targetCol,board)
      break
    case 'K':
      validMove = checkKingMove(piece.color,row,col,targetRow,targetCol,board)
      break
    default:
      return false
  }

  if(!validMove) return false

  const newBoard = simulateMove(targetCol,targetRow,row,col,board)
  if(isKingInCheck(piece.color,newBoard)) return false
  return true
}
export default checkPosition

  const checkPawnMove = (color, row, col, targetRow, targetCol, board) => {
    const direction = color === 'white' ? -1 : 1

    // Avanza una casilla hacia adelante dependiendo si es blanca o negra
    if(targetCol === col && targetRow === row + direction && !board[targetRow][targetCol]){
      return true
    }
    // Avanza dos casillas si está en su posición inicial
    if(
      (row === 6 && color === 'white') || 
      (row === 1 && color === 'black')
    ){
      if(targetCol === col && targetRow === row + 2 * direction && !board[targetRow][targetCol] && !board[row + direction][col]){
        return true
      }
    }
    // Mata en diagonal
    if(Math.abs(targetCol - col) === 1 && targetRow === row + direction && board[targetRow][targetCol] && board[targetRow][targetCol].color !== color){
      return true
    } 
  }
  const checkRookMove = (row,col,targetRow,targetCol,board) => {  
    // Verifica que solo se muevan en la misma linea
    if(row!= targetRow && col != targetCol) return false

    const rowStep = targetRow > row? 1 : targetRow < row ? -1 : 0;
    const colStep = targetCol > col? 1 : targetCol < col ? -1 : 0; 
    
    
    let nextRow = row + rowStep;
    let nextCol = col + colStep;

    while(nextRow !== targetRow || nextCol !== targetCol){
      if (nextRow < 0 || nextRow >= 8 || nextCol < 0 || nextCol >= 8) return false
      if(board[nextRow][nextCol]){ // Si hay una pieza  retornamos falso
        return false 
      }
       nextRow += rowStep;
       nextCol += colStep;
    }

    const lastPiece = board[nextRow][nextCol]
    if(!lastPiece) return true 
    if(board[nextRow][nextCol].color !== board[row][col].color) return true // Distinto Color mata


    return false
}
  const checkHorseMove = (color,row,col,targetRow,targetCol,board) => {
    const diffRow = Math.abs(targetRow - row)
    const diffCol = Math.abs(targetCol - col)

    if(diffCol === 1 && diffRow === 2){
      if(!board[targetRow][targetCol] || board[targetRow][targetCol].color !== color) 
        return true
    }


    if(diffCol === 2 && diffRow === 1){
      if(!board[targetRow][targetCol] || board[targetRow][targetCol].color !== color) 
        return true
    }

  return false
  }

  const checkBishopMove = (row,col,targetRow,targetCol,board) => {
    if(Math.abs(targetRow - row) !== Math.abs(targetCol - col)) return false

    const rowStep = targetRow > row ? 1 : -1
    const colStep = targetCol > col ? 1 : -1

    let nextRow = row + rowStep
    let nextCol = col + colStep


    while(targetRow !== nextRow || targetCol !== nextCol){
      if (nextRow < 0 || nextRow >= 8 || nextCol < 0 || nextCol >= 8) return false
      if(board[nextRow][nextCol]){
        return false
      }
      nextCol += colStep;
      nextRow += rowStep
    }

    const lastPiece = board[nextRow][nextCol]
    if(!lastPiece) return true
    if(board[nextRow][nextCol].color !== board[row][col].color) return true

    return false
  }

  const checkQueenMove = (row,col,targetRow,targetCol,board) => {
    if(row!= targetRow && col != targetCol && Math.abs(targetRow - row) !== Math.abs(targetCol - col)) return false

    const rowStep = targetRow === row ? 0 : (targetRow > row ? 1 : -1)
    const colStep = targetCol === col ? 0 : (targetCol > col ? 1 : -1)


    let nextRow = row + rowStep
    let nextCol = col + colStep

     while(targetRow !== nextRow || targetCol !== nextCol){
      if (nextRow < 0 || nextRow >= 8 || nextCol < 0 || nextCol >= 8) return false
      if(board[nextRow][nextCol]){
        return false
      }
      nextCol += colStep;
      nextRow += rowStep
    }

    const lastPiece = board[nextRow][nextCol]
    if(!lastPiece) return true 
    if(board[nextRow][nextCol].color !== board[row][col].color) return true


    return false
  } 

  const checkKingMove = (color,row,col,targetRow,targetCol,board) => {
    if (Math.abs(targetRow - row) > 1 || Math.abs(targetCol - col) > 1) return false
    
    const targetPiece = board[targetRow][targetCol]
    if(targetPiece && targetPiece.color === board[row][col].color) return false

    const enemyColor = color === 'white'? 'black' : 'white'
    if(isDangerZone(targetRow,targetCol,board,enemyColor)) return false
    return true

  }
  const isDangerZone = (row, col, board, attackerColor) => {
    for(let r = 0 ; r < 8 ; r++){
      for(let c = 0 ; c < 8 ; c++){
        const piece = board[r][c]
        if(piece && piece.color === attackerColor){
          if(canAttack(piece,r,c,row,col,board)) return true
        }
      }
    }
    return false
  }
  const canAttack = (attacker,row,col,targetRow,targetCol,board)=>{
    switch(attacker.tipo){
      case 'P' :
        const direction = attacker.color === 'white' ? -1 : 1
        return Math.abs(targetCol-col) === 1 &&  targetRow ===  row + direction 
      case 'R':
        return checkRookMove(row,col,targetRow,targetCol,board)
      case 'N':
        return checkHorseMove(attacker.color,row,col,targetRow,targetCol,board)
      case 'B':
        return checkBishopMove(row,col,targetRow,targetCol,board)
      case 'Q':
        return checkQueenMove(row,col,targetRow,targetCol,board)
      case 'K':
        const rowAbsolute =  Math.abs(targetRow - row) 
        const colAbsolute =  Math.abs(targetCol - col)
      return (rowAbsolute <=1 && colAbsolute <=1)
    
      default: return false
      }


  }

  const cloneBoard = (board) => board.map(row => row.map(piece => piece ? { ...piece } : null));
  const simulateMove = (targetCol,targetRow,row,col,board) => {
    const newBoard = cloneBoard(board)
    newBoard[targetRow][targetCol] = newBoard[row][col]
    newBoard[row][col] = null
    return newBoard
  }
  export const isKingInCheck = (color,board) => {
    for(let r = 0 ; r < 8 ; r++){
      for(let c = 0 ; c < 8 ; c++){
        const piece = board[r][c]
        if(piece && piece.color === color && piece.tipo === 'K'){
          return isDangerZone(r,c,board,color === 'white' ? 'black' : 'white')
        }
      }
  }
  return false
}
