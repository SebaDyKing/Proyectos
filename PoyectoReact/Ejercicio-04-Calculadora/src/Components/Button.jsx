export function Button({text,isOpperation,handleClick}) {
  return (
    <button className={isOpperation ? 'opperation' : ''} onClick={() => handleClick(text)}>
        {text}
    </button>
  )
}
export default Button