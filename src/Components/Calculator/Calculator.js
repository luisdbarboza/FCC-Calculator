import React from 'react';
import Display from '../Display/Display';
import InputPanel from '../InputPanel/InputPanel';
import './Calculator.css';

const Calculator = () => {
  return (
    <div id="calculator">
      <Display />
      <InputPanel />
    </div>
  );
}

export default Calculator;
