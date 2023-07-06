const MAX_DIGITS_IN_DISPLAY = 10
let currentValue = 0
let lastValue = 0
let operationResult = 0
let countDigit = 0
let isDecimal = false
let pendingComma = false
let operator

const setDisplay = (value) => {
  let currentValueToString = replaceComma(value)
  if(pendingComma == true) {
    currentValueToString = currentValueToString + ','
  }
  display.innerHTML = currentValueToString
}

const display = document.querySelector('div[name="display"] span')

document.getElementsByName('zero')[0].addEventListener('click', () => {
  addNumberButtons(0)
})
document.getElementsByName('one')[0].addEventListener('click', () => {
  addNumberButtons(1)
})
document.getElementsByName('two')[0].addEventListener('click', () => {
  addNumberButtons(2)
})
document.getElementsByName('three')[0].addEventListener('click', () => {
  addNumberButtons(3)
})
document.getElementsByName('four')[0].addEventListener('click', () => {
  addNumberButtons(4)
})
document.getElementsByName('five')[0].addEventListener('click', () => {
  addNumberButtons(5)
})
document.getElementsByName('six')[0].addEventListener('click', () => {
  addNumberButtons(6)
})
document.getElementsByName('seven')[0].addEventListener('click', () => { 
  addNumberButtons(7)
})
document.getElementsByName('eight')[0].addEventListener('click', () => {
  addNumberButtons(8)
})
document.getElementsByName('nine')[0].addEventListener('click', () => {
  addNumberButtons(9)
})
document.getElementsByName('clean')[0].addEventListener('click', () => {
  reset()
})
document.getElementsByName('negate')[0].addEventListener('click', () => {
  negateButton(currentValue)
})
document.getElementsByName('divide')[0].addEventListener('click', () => {
  operandButtons("/")
})
document.getElementsByName('multiply')[0].addEventListener('click', () => {
  operandButtons("*")
})
document.getElementsByName('sum')[0].addEventListener('click', () => {
  operandButtons("+")
})
document.getElementsByName('subtract')[0].addEventListener('click', () => { 
  operandButtons("-")
})
const buttonPointName = document.getElementsByName('point')[0].addEventListener('click', () => {
  showPointButton(',')
})

document.getElementsByName('equal')[0].addEventListener('click', () => {
  equalButton("=")
})

const reset = () => {
  currentValue = 0
  lastValue = 0
  operationResult = 0
  isDecimal = false
  pendingComma = false
  countDigit = 0
  operator = null
  setDisplay(0)
}

const resetCurrentValue = () =>{
  currentValue = 0
  isDecimal = false
  pendingComma = false
}

const addNumberButtons = (number) => {
  if (!isDecimal) {
    currentValue = appendIntegerNumbers(number)
  } else {
    currentValue = appendDecimalNumbers(number)
    pendingComma = false
  }
  setDisplay(currentValue)
}

const appendIntegerNumbers = (value) => {
  if (countDigit < MAX_DIGITS_IN_DISPLAY) {
    if (currentValue != 0) {
      currentValue = currentValue * 10 + value
    }
    else {
      currentValue = value
    }
    countDigit++
  }
  return currentValue
}

const appendDecimalNumbers = (value) => {
  let valuetoString = currentValue.toString()
  if (!valuetoString.includes('.')){
   valuetoString += '.'
  }
  if (countDigit < MAX_DIGITS_IN_DISPLAY) {
    if (isDecimal) {
      valuetoString += value
    }
    countDigit++
  }
  return Number(valuetoString)
}

const replaceComma = (value) => {
  return value.toString().replace('.',',')
}

const negateButton = (displayValue) => {
  displayValue = displayValue * -1
  currentValue = displayValue
  setDisplay(currentValue)
}

const showPointButton = (buttonPointSymbol) => {
  if (buttonPointSymbol === ',') {
    if (!isDecimal && countDigit < MAX_DIGITS_IN_DISPLAY) {
      pendingComma = true
      setDisplay(currentValue)
      isDecimal = true
    }
  }
}

const saveCurrentValue = () => {
  if(currentValue != 0) {
    lastValue = currentValue
    resetCurrentValue()
  }
}

const operandButtons = (operatorButtons) => {
  saveCurrentValue()
  operator = operatorButtons
}

const performOperation = () => {
  switch(operator) {
    case "+":
      operationResult = lastValue + currentValue
      break
    case "-":
      operationResult = lastValue - currentValue
      break
    case "*":
      operationResult = lastValue * currentValue
      break
    case "/":
      operationResult = lastValue / currentValue
      break
    default:
      setDisplay('ERROR')
    break
  }
  return operationResult
}

const equalButton = () => {
  let result = performOperation()
  setDisplay(result)
}

const getButtonsKeypad = () => {
  document.addEventListener("keydown", (event) => {
  const pressedKey = event.key
  if(pressedKey >= '0' && pressedKey <= '9'){
    addNumberButtons(Number(pressedKey))
  } else {
    switch (pressedKey) {
      case "Escape":
        reset()
        break
      case "Control":
        negateButton(currentValue)
        break
      case "+":
        operandButtons("+")
        break
      case "-":
        operandButtons("-")
        break
      case "*":
        operandButtons("*")
        break
      case "divide":
        operandButtons("/")
        break
       case ",":
        showPointButton(",")
        break
      case "=":
        equalButton("=")
        break
    }
  }
})
}

getButtonsKeypad()