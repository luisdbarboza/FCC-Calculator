const checkPrecedence = (symbol) => {

  const precedence = {'^': 3, '/': 2, 'x': 2, '+': 1, '-': 1};
  for (let key in precedence) {
    if (key === symbol)
      return precedence[key];
  }
  return 0;
}


const infixToPostfix = (expression) => {
  //Separa los numeros de los simbolos
  let expressionArr = expression.match(/((\d+)?[.](\d+))|(\d+)|(^[-]?(\d+)?[.](\d+))|(^[-]?(\d+))|([\\(]|[\\)]|[\^]|[x]|[\/]|[+]|[-])/g);
  expression = [...expressionArr];
  const symbols = '^()/x+-';
  const stackOfSymbols = [];
  const postFixQueue = [];

  for (let i = 0; i < expression.length; i++) {
    let isANumber = /(\d+)/.test(expression[i]);

    //checks if expression[i] is an number
    if (isANumber) {
      postFixQueue.push(expressionArr.shift());
    } else if (symbols.includes(expression[i])) {
      let symbol = expressionArr.shift();
      switch (symbol) {
        case '(': {
          stackOfSymbols.push(symbol);
        } break;
        case ')': {
          let currentPop = stackOfSymbols.length - 1;
          let endIndex = stackOfSymbols.indexOf('(');

          for (currentPop; currentPop > endIndex; currentPop--) {
            postFixQueue.push(stackOfSymbols.pop());
          }

          stackOfSymbols.pop();
        } break;
        default: {
          let currentSymbolPrecedence = checkPrecedence(symbol);
          let headOfStackPrecedence = checkPrecedence(stackOfSymbols[stackOfSymbols.length - 1]);

          if (currentSymbolPrecedence > headOfStackPrecedence) {
            stackOfSymbols.push(symbol);
          } else if (currentSymbolPrecedence < headOfStackPrecedence) {
            while (currentSymbolPrecedence < headOfStackPrecedence) {
              postFixQueue.push(stackOfSymbols.pop());
              currentSymbolPrecedence = checkPrecedence(symbol);
              headOfStackPrecedence = checkPrecedence(stackOfSymbols[stackOfSymbols.length - 1]);
            }

            stackOfSymbols.push(symbol);
          } else {
            postFixQueue.push(stackOfSymbols.pop());
            stackOfSymbols.push(symbol);
          }
        }
      }
    }

  }

  while (stackOfSymbols.length > 0) {
    postFixQueue.push(stackOfSymbols.pop());
  }


  return postFixQueue;
}

const evaluate = (postfixExpression) => {
  let stack = [];
  let postFixExpressionQueue = [...postfixExpression];

  for (let i = 0; i < postfixExpression.length; i++) {
    if (/([-]\d+)|(\d+)/.test(postfixExpression[i])) {
      stack.push(Number(postFixExpressionQueue.shift()));
    } else {
      let operation = postFixExpressionQueue.shift();
      let rightOperand = Number(stack.pop());
      let leftOperand = Number(stack.pop());
      let result;

      switch (operation) {
        case 'x': {
          result = leftOperand * rightOperand;
          stack.push(result);
        } break;
        case '/': {
          result = leftOperand / rightOperand;
          stack.push(result);
        } break;
        case '+': {
          result = leftOperand + rightOperand;
          stack.push(result);
        } break;
        case '-': {
          result = leftOperand - rightOperand;
          stack.push(result);
        } break;
      }
    }
  }

  return stack[0];
}

const calculator = (expression) => {
  const postfixVersion = infixToPostfix(expression);
  return evaluate(postfixVersion);
}

export default calculator;
