import {useState} from 'react'


export function ButtonColor(){

const [color, setColor] = useState('#ffffff');
const handleClick = () => {
// Generar un color aleatorio en formato hexadecimal
const colorAleatorio = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0').toUpperCase();
// Actualizar el estado con el nuevo color
setColor(colorAleatorio);
// Cambiar el color de fondo del body
document.body.style.backgroundColor = colorAleatorio;
}
  return (
    <div className = 'Container'>
    <p className = 'Container-Color'>
      {color}
    </p>
      <button onClick = {handleClick} className = 'Container-button-ChangeColor'>
      Cambiar Color
    </button>
    </div>
  )
}
