const MAX_DIGITS_IN_DISPLAY = 10

const display = document.querySelector('div[name="display"] span')

let currentNumber = 0
let previousNumber = 0
let operation = ''
let decimalMultiplier = 0.1
let isDecimal = false
let isNewOperation = false

const add = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => a / b

const setDisplay = value => {
  let newValue = value.toString().replace('.', ',')
  if (isDecimal && !newValue.includes(',') && newValue.length < 10) {
    newValue += ','
  }
  if (Math.abs(value).toString().replace('.', '').length > 10) {
    disableAllButtons()
    enableButton('clean')

    newValue = 'ERROR'
  }
  display.innerHTML = newValue
}

const canAddMoreDigits = (originalNumber, maxDigits) => {
  const numberDigitCount = Math.abs(originalNumber)
    .toString()
    .replace('.', '').length
  return numberDigitCount < maxDigits
}

const appendDigit = (originalNumber, numberToAdd) => {
  let updatedNumber = originalNumber
  if (isDecimal) {
    updatedNumber += numberToAdd * decimalMultiplier
    updatedNumber = Number(updatedNumber.toFixed(MAX_DIGITS_IN_DISPLAY))
    decimalMultiplier *= 0.1
  } else {
    updatedNumber = originalNumber * 10 + numberToAdd
  }

  return updatedNumber
}

const resetCalculatorState = () => {
  currentNumber = 0
  previousNumber = 0
  operation = ''
  decimalMultiplier = 0.1
  isDecimal = false
  isNewOperation = false
  enableAllButtons()
  unlighlightOperationButtons()
}

const resetCalculatorStateAndClearDisplay = () => {
  resetCalculatorState()
  disableButton('negate')
  disableButton('zero')

  setDisplay(currentNumber)
}

const negateNumber = number => {
  return -number
}

const handleNumberClick = number => {
  if (isNewOperation) {
    currentNumber = previousNumber = 0
    isNewOperation = false
  }

  if (operation === '') {
    if (canAddMoreDigits(currentNumber, MAX_DIGITS_IN_DISPLAY)) {
      currentNumber = appendDigit(currentNumber, number)
      setDisplay(currentNumber)
    }
    if (currentNumber > 0) {
      enableButton('negate')
      enableButton('zero')
    }
    if (currentNumber.toString().length >= MAX_DIGITS_IN_DISPLAY) {
      disableNumberButtons()
      disableButton('point')
    }
  } else {
    if (canAddMoreDigits(previousNumber, MAX_DIGITS_IN_DISPLAY)) {
      previousNumber = appendDigit(previousNumber, number)
      setDisplay(previousNumber)
    }
    if (previousNumber > 0) {
      enableButton('negate')
      enableButton('zero')
    }
    if (previousNumber.toString().length >= MAX_DIGITS_IN_DISPLAY) {
      disableNumberButtons()
      disableButton('point')
    }
  }
}

const handlePointClick = () => {
  isDecimal = true
  disableButton('point')
  if (operation === '') {
    setDisplay(currentNumber)
  } else {
    setDisplay(previousNumber)
  }
}

const handleNegateClick = () => {
  if (operation === '') {
    currentNumber = negateNumber(currentNumber)
    setDisplay(currentNumber)
  } else {
    previousNumber = negateNumber(previousNumber)
    setDisplay(previousNumber)
  }
}

const handleOperationClick = newOperation => {
  if (operation !== '') {
    if (
      (operation === 'multiply' || operation === 'divide') &&
      previousNumber === 0
    ) {
      previousNumber = 1
    }
    currentNumber = performOperation(currentNumber, previousNumber, operation)
    currentNumber = parseFloat(currentNumber.toPrecision(MAX_DIGITS_IN_DISPLAY))

    previousNumber = 0
    operation = ''
    isNewOperation = true
  }

  enableButton('point')
  enableButton('clean')
  disableButton('negate')
  enableNumberButtons()

  unlighlightOperationButtons()
  highlightButton(newOperation)

  operation = newOperation
  isDecimal = false
  decimalMultiplier = 0.1
  isNewOperation = false
}

const performOperation = (operand1, operand2, operation) => {
  let result
  switch (operation) {
    case 'sum':
      result = add(operand1, operand2)
      break
    case 'subtract':
      result = subtract(operand1, operand2)
      break
    case 'multiply':
      result = multiply(operand1, operand2)
      break
    case 'divide':
      result = divide(operand1, operand2)
      break
    default:
      break
  }
  return result
}

const handleEqualClick = () => {
  if (operation !== '' && previousNumber === 0) {
    setDisplay('ERROR')
    resetCalculatorState()
    disableAllButtons()
    enableButton('clean')

    unlighlightOperationButtons()
    return
  }

  if (operation !== '') {
    const result = performOperation(currentNumber, previousNumber, operation)
    currentNumber = parseFloat(result.toPrecision(MAX_DIGITS_IN_DISPLAY))

    previousNumber = 0
    operation = ''
    isNewOperation = true

    setDisplay(currentNumber)
  } else {
    isDecimal = false
    setDisplay(currentNumber)
  }

  enableAllButtons()
  unlighlightOperationButtons()
}

const numberButtons = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'zero'
]

const operationButtons = ['sum', 'subtract', 'multiply', 'divide']

const utilityButtons = ['negate', 'point', 'equal', 'clean']

const enableNumberButtons = () => {
  numberButtons.forEach(button => enableButton(button))
}

const disableNumberButtons = () => {
  numberButtons.forEach(button => disableButton(button))
}

const enableOperationButtons = () => {
  operationButtons.forEach(button => enableButton(button))
}

const disableOperationButtons = () => {
  operationButtons.forEach(button => disableButton(button))
}

const enableUtilityButtons = () => {
  utilityButtons.forEach(button => enableButton(button))
}

const disableUtilityButtons = () => {
  utilityButtons.forEach(button => disableButton(button))
}

const enableAllButtons = () => {
  enableNumberButtons()
  enableOperationButtons()
  enableUtilityButtons()
}

const disableAllButtons = () => {
  disableNumberButtons()
  disableOperationButtons()
  disableUtilityButtons()
}

const disableButton = buttonName => {
  document.getElementsByName(buttonName)[0].disabled = true
}

const enableButton = buttonName => {
  document.getElementsByName(buttonName)[0].disabled = false
}

const highlightButton = buttonName => {
  document.getElementsByName(buttonName)[0].classList.add('highlighted')
}

const unhighlightButton = buttonName => {
  document.getElementsByName(buttonName)[0].classList.remove('highlighted')
}

const unlighlightOperationButtons = () => {
  operationButtons.forEach(button => unhighlightButton(button))
}

document
  .getElementsByName('zero')[0]
  .addEventListener('click', () => handleNumberClick(0))
document
  .getElementsByName('one')[0]
  .addEventListener('click', () => handleNumberClick(1))
document
  .getElementsByName('two')[0]
  .addEventListener('click', () => handleNumberClick(2))
document
  .getElementsByName('three')[0]
  .addEventListener('click', () => handleNumberClick(3))
document
  .getElementsByName('four')[0]
  .addEventListener('click', () => handleNumberClick(4))
document
  .getElementsByName('five')[0]
  .addEventListener('click', () => handleNumberClick(5))
document
  .getElementsByName('six')[0]
  .addEventListener('click', () => handleNumberClick(6))
document
  .getElementsByName('seven')[0]
  .addEventListener('click', () => handleNumberClick(7))
document
  .getElementsByName('eight')[0]
  .addEventListener('click', () => handleNumberClick(8))
document
  .getElementsByName('nine')[0]
  .addEventListener('click', () => handleNumberClick(9))
document
  .getElementsByName('point')[0]
  .addEventListener('click', handlePointClick)
document
  .getElementsByName('clean')[0]
  .addEventListener('click', resetCalculatorStateAndClearDisplay)
document
  .getElementsByName('negate')[0]
  .addEventListener('click', handleNegateClick)
document
  .getElementsByName('sum')[0]
  .addEventListener('click', () => handleOperationClick('sum'))
document
  .getElementsByName('subtract')[0]
  .addEventListener('click', () => handleOperationClick('subtract'))
document
  .getElementsByName('multiply')[0]
  .addEventListener('click', () => handleOperationClick('multiply'))
document
  .getElementsByName('divide')[0]
  .addEventListener('click', () => handleOperationClick('divide'))
document
  .getElementsByName('equal')[0]
  .addEventListener('click', handleEqualClick)

document.body.addEventListener('keydown', event => {
  const key = event.key

  if (key >= 0 && key <= 9) {
    const keyNumber = parseInt(key)
    handleNumberClick(keyNumber)
  } else {
    switch (key) {
      case ',':
        handlePointClick()
        break
      case 'Escape':
        resetCalculatorStateAndClearDisplay()
        break
      case 'Control':
        handleNegateClick()
        break
      case '+':
        handleOperationClick('sum')
        break
      case '-':
        handleOperationClick('subtract')
        break
      case '*':
        handleOperationClick('multiply')
        break
      case '/':
        handleOperationClick('divide')
        break
      default:
        break
    }
  }
})

resetCalculatorStateAndClearDisplay()
