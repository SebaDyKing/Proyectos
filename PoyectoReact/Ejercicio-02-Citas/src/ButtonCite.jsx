import { citas } from './data/citas';
import {useState} from 'react'

export function ButtonCite() {
    const [cite,setCiteActual] =  useState(citas[0])
    
    const handleClick = () =>{
        const indexAleatorio = Math.floor(Math.random() * citas.length)
        const citaNueva  = citas[indexAleatorio]
        setCiteActual(citaNueva)
    }

    return(
        <div className = 'Container'>
            <strong>
                Citas Motivacionales
            </strong>
                <p>{cite.texto}</p>
                <p>{cite.autor}</p>
            <button onClick = {handleClick} className = 'Container-button-ChangeCite'>
                Siguiente Cita
            </button>
        </div>
    )
}
