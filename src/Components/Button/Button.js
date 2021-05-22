import React, {useContext} from 'react';
import './Button.css';
import {CalculatorContext} from '../../Context/CalculatorContext';

const Button = ({id, value, side}) => {
  const {display, changeDisplay, calculate} = useContext(CalculatorContext);

  return (
    <>
      {side === "left"
        ?
        <div
          id={`${id}`}
          className="numpad-left-button"
          onClick={() => {
            if (value !== '=') {
              changeDisplay(display + value);
            }
            else if (display.length > 1)
              calculate();
          }}
        >
          {value}
        </div >
        :
        <div
          id={`${id}`}
          className="numpad-right-button"
          onClick={() => changeDisplay(display + value)}
        >
          {value}
        </div>
      }
    </>
  );
}

export default Button;
