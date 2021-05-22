import React, {useContext} from 'react';
import {CalculatorContext} from '../../Context/CalculatorContext';
import './Display.css';

const Display = () => {
  const {display} = useContext(CalculatorContext);

  return (
    <div id="display">
      <h2>{display}</h2>
    </div>
  )
}

export default Display;
