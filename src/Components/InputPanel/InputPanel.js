import React from 'react';
import './InputPanel.css';
import Button from '../Button/Button';

const numpad = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
  'decimal': '.',
  'zero': '0',
  'equals': '='
}

const operations = {
  'clear': 'C',
  'add': '+',
  'subtract': '-',
  'multiply': 'x',
  'divide': '/'
}

const leftButtons = Object.keys(numpad).map((id, index) => {

  return (
    <Button
      key={index}
      id={id}
      value={numpad[id]}
      side="left"
    />
  )
});

const rightButtons = Object.keys(operations).map((id, index) => {
  return <Button key={index} id={id} value={operations[id]} side="right" />
});


//Numbers, decimal dot, equal sign
const NumPad = () => {
  return (
    <div id="numpad">
      {leftButtons}
    </div>
  )
}

//aritmethic operations and clear button
const Operations = () => {
  return (
    <div id="operations">
      {rightButtons}
    </div>
  );
}

const InputPanel = () => {
  return (
    <div id="input-panel">
      <NumPad />
      <Operations />
    </div>
  )
}

export default InputPanel;
