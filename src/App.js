import React from 'react';
import './App.css';
import Calculator from './Components/Calculator/Calculator';
import CalculatorContextProvider from './Context/CalculatorContext';

const App = () => {
  return (
    <div id="wrapper">
      <CalculatorContextProvider >
        <Calculator />
      </CalculatorContextProvider>
    </div>
  )
}

export default App;
