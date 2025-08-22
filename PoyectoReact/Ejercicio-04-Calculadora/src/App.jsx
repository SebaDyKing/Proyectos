import React, { useState } from 'react'
import './App.css'
import Button from './Components/Button'
import Display from './Components/Display'

function App() {
const [displayValue, setDisplayValue] = useState("0");
const buttons = [
  { text: "7", isOperation: false },
  { text: "8", isOperation: false },
  { text: "9", isOperation: false },
  { text: "/", isOperation: true },

  { text: "4", isOperation: false },
  { text: "5", isOperation: false },
  { text: "6", isOperation: false },
  { text: "*", isOperation: true },

  { text: "1", isOperation: false },
  { text: "2", isOperation: false },
  { text: "3", isOperation: false },
  { text: "-", isOperation: true },

  { text: "0", isOperation: false },
  { text: ".", isOperation: false },
  { text: "=", isOperation: true },
  { text: "+", isOperation: true },

  { text: "C", isOperation: true },
];

const handleClick = (text) => {
  if(text === "C") {
    setDisplayValue("0");
    return;
  } 
  if (text === "=") {
    try {
      const result = eval(displayValue)
      setDisplayValue(result)
    }catch(error) {
      setDisplayValue("Syntax Error");
    }
    return;
  }
setDisplayValue(prev => (prev === "0" ||  prev === 'Syntax Error') ? text : prev + text)

}
  return (
  <>
  <h1>Calculator</h1>
  <div className="calculator">
  <Display value= {displayValue} />
    <div className = 'keypad'>
      {buttons.map((button, index) => (
        <Button 
          key={index} 
          text={button.text} 
          isOpperation={button.isOperation} 
          handleClick={handleClick} 
        />
      ))}
    </div>
  </div>
  </>
  )
}

export default App
