import { checkPosition,isKingInCheck } from "./checkPosition"

export const checkWinner   = (board,turn)=> {
const possibleMoves = getAllPossibleMoves(board,turn)
if(possibleMoves.length === 0){
  const isInCheck = isKingInCheck(turn,board)
  if(isInCheck){
    return turn === 'white' ? 'black' : 'white' 
  }
  return 'draw' 
}
return null
}
export default checkWinner


const getAllPossibleMoves = (board,turn) => {
  const moves = []
  for(let r = 0 ; r < 8 ; r++){
    for(let c = 0 ; c < 8 ; c++){
      const piece = board[r][c]
      if(!piece || piece.color !== turn) continue

      const index = r * 8 + c


      for(let tr = 0 ; tr < 8 ; tr++){
        for(let tc = 0 ; tc < 8 ; tc++){

          const targetIndex = tr * 8 + tc
          
          if(checkPosition(index,board,targetIndex)){
            moves.push({from: {row: r, col: c}, to: {row: tr, col: tc}})
          }
        }
      }
    }
}
return moves
}
