import React, {createContext, useState} from 'react';
import calculator from '../calculator';

export const CalculatorContext = createContext();

const CalculatorContextProvider = (props) => {
  const [display, setDisplay] = useState('0');
  const [newCalculation, setNewCalculation] = useState(true);

  const sanitize = (display) => {
    let regex = /[\^x\/+-]{1,}/g;
    let matches = display.match(regex);

    if (matches) {
      matches.forEach(match => {
        if (match.length >= 2)
          display = display.replace(match, match[match.length - 1])
      });
    }

    return display;
  }

  const calculate = () => {
    let sanitized = sanitize(display);
    //console.log(sanitized, "sanitized");
    const result = calculator(sanitized);
    //console.log(result, "calculator");
    setDisplay(result);
    setNewCalculation(true);
  }

  const removeLeadingZeroes = (displayText) => {
    if (/(0{1,}\d+)/g.test(displayText)) {
      let matches = displayText.match(/(0{1,}\d+)/g);
      matches.forEach(match => {
        let matchIndex = displayText.indexOf(match);
        let withoutLeadingZeroes = '';

        for (let i = matchIndex; i < displayText.length; i++) {
          if (displayText[i] === "0")
            continue;
          else {
            withoutLeadingZeroes += displayText.slice(i,);
            break;
          }
        }

        displayText = displayText.replace(match, withoutLeadingZeroes);

        displayText = displayText !== '' ? displayText : '0';
      });
    }

    return displayText;
  }

  const changeDisplay = (displayText) => {
    displayText = removeLeadingZeroes(displayText);
    let lastInput = displayText[displayText.length - 1];

    if (newCalculation) {
      setDisplay(lastInput);
      setNewCalculation(false);
    }

    if ((lastInput !== '=' && !newCalculation) && lastInput !== 'C')
      setDisplay(displayText);
    else if (lastInput === 'C') {
      setDisplay('0');
      setNewCalculation(true);
    }
  }

  return (
    <CalculatorContext.Provider value={{display, changeDisplay, calculate}}>
      {props.children}
    </CalculatorContext.Provider>
  )

}

export default CalculatorContextProvider;
