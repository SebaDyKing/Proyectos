export function Square({haveMine,isDiscovered,isFlagged,index,onClick,onRightClick,numberOfMines}){


return(
    <div 
        className={
            `square ${isDiscovered ? 'discovered' : ''} 
        ${isFlagged ? 'flagged' : ''}`
    
    }
        onClick={onClick}
        onContextMenu={(event) => {
            event.preventDefault()
            onRightClick(index)
        }}
    >
        {isDiscovered ? (haveMine ? '💣' : numberOfMines) : ''}
        {isFlagged && '🚩'}
    </div>
)
}
export default Square