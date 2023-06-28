let currentNumber = 0;
let operator = '';
let operand1 = null;
let operand2 = null;
let addingComma = false;
const display = document.querySelector('[data-testid="display"]');
const MAX_DIGITS_IN_DISPLAY = 10;



const addNumber = (number) => {
  if (addingComma) {
    currentNumber = parseFloat(currentNumber.toString() + "." + number.toString());
    addingComma = false
    setDisplay();

  } else {
    currentNumber  = parseFloat(currentNumber.toString() + number.toString());
    setDisplay();
  }
};

const setDisplay = () => {
  let displayValue;
  if (addingComma) {
    displayValue = currentNumber.toString() + ','
  } else {
    displayValue = currentNumber.toString().replace('.',',')
  }
  display.textContent = displayValue;
};

const clean = () => {
  currentNumber = 0;
  operator = '';
  operand1 = null;
  operand2 = null;
addingComma = false
  setDisplay();
};

const negate = () => {
  currentNumber = currentNumber * -1

  setDisplay();
};

const performOperation = () => {
  if (operator && operand1 !== null && operand2 !== null) {
    const num1 = operand1;
    const num2 = operand2;

    let result;
    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;
    }

    
    if ((num1 < 0 && num2 >= 0) || (num1 >= 0 && num2 < 0)) {
      result = -Math.abs(result);
    }

    currentNumber = result;
    operator = '';
    operand1 = null;
    operand2 = null;
    setDisplay();
  }
};

const handleButtonPress = (button) => {
  switch (button) {
    case 'C':
      clean();
      break;
    case ',':
      if(Number.isInteger(currentNumber))
        addingComma = true;
        setDisplay();
      
      break;
    case '+-':
      negate();
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      if (operator && operand1 !== null && currentNumber !== 0) {
        performOperation();
      }
      operator = button;
      operand1 = currentNumber;
      currentNumber = 0;
      addingComma = false; 
      break;
    case '=':
      if (operator && operand1 !== null) {
        operand2 = currentNumber;
        performOperation();
      }
      addingComma = false; 
      break;
    default:
      if (/^[0-9]$/.test(button)) {
        addNumber(Number(button));
      }
      break;
  }
};

const handleKeyPress = (event) => {
  const key = event.key;

  switch (key) {
    case 'Escape':
      clean();
      break;
    case 'Control':
      negate();
      break;
    case ',':
      if (!currentNumber.toString().includes(',')) {
        currentNumber = currentNumber.toString().replace('.', ',');
        setDisplay();
      }
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      operator = key;
      operand1 = currentNumber;
      currentNumber = 0;
      addingComma = false; 
      break;
    case '=':
      if (operator && operand1 !== null) {
        operand2 = currentNumber;
        performOperation();
      }
      addingComma = false; 
      break;
    default:
      if (/^[0-9]$/.test(key)) {
        addNumber(Number(key));
      }
      break;
  }
};

setDisplay();

document.querySelectorAll('[name]').forEach((button) => {
  button.addEventListener('click', () => {
    const buttonName = button.getAttribute('name');
    handleButtonPress(buttonName);
  });
});

document.getElementsByName('clean')[0].addEventListener('click', clean);

document.getElementsByName('negate')[0].addEventListener('click', negate);

document.getElementsByName('zero')[0].addEventListener('click', () => {
  addNumber(0);
});

document.getElementsByName('one')[0].addEventListener('click', () => {
  addNumber(1);
});

document.getElementsByName('two')[0].addEventListener('click', () => {
  addNumber(2);
});

document.getElementsByName('three')[0].addEventListener('click', () => {
  addNumber(3);
});

document.getElementsByName('four')[0].addEventListener('click', () => {
  addNumber(4);
});

document.getElementsByName('five')[0].addEventListener('click', () => {
  addNumber(5);
});

document.getElementsByName('six')[0].addEventListener('click', () => {
  addNumber(6);
});

document.getElementsByName('seven')[0].addEventListener('click', () => {
  addNumber(7);
});

document.getElementsByName('eight')[0].addEventListener('click', () => {
  addNumber(8);
});

document.getElementsByName('nine')[0].addEventListener('click', () => {
  addNumber(9);
});

document.getElementsByName('divide')[0].addEventListener('click', () => {
  handleButtonPress('/');
});

document.getElementsByName('multiply')[0].addEventListener('click', () => {
  handleButtonPress('*');
});

document.getElementsByName('subtract')[0].addEventListener('click', () => {
  handleButtonPress('-');
});

document.getElementsByName('sum')[0].addEventListener('click', () => {
  handleButtonPress('+');
});

document.getElementsByName('point')[0].addEventListener('click', () => {
  handleButtonPress(',');
});

document.getElementsByName('equal')[0].addEventListener('click', () => {
  handleButtonPress('=');
});

document.addEventListener('keydown', handleKeyPress);
