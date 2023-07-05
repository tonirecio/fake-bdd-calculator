const MAX_DIGITS_IN_DISPLAY = 10

const display = document.querySelector('div[name="display"] span')

let firstOperand = 0
let secondOperand = 0
let currentOperation = ''
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
  if (countDigits(value) > MAX_DIGITS_IN_DISPLAY) {
    disableAllButtons()
    enableButton('clean')

    newValue = 'ERROR'
  }
  display.innerHTML = newValue
}

const countDigits = number => {
  const absoluteNumber = Math.abs(number)
  const digitCount = String(absoluteNumber).replace('.', '').length
  return digitCount
}

const canAddMoreDigits = (number, numberDigitLimit) => {
  return countDigits(number) < numberDigitLimit
}

const appendDigit = (number, numberToAppend) => {
  let updatedNumber = number
  if (isDecimal) {
    updatedNumber += numberToAppend * decimalMultiplier
    updatedNumber = Number(updatedNumber.toFixed(MAX_DIGITS_IN_DISPLAY))
    decimalMultiplier *= 0.1
  } else {
    updatedNumber = number * 10 + numberToAppend
  }
  return updatedNumber
}

const resetCalculatorState = () => {
  firstOperand = 0
  secondOperand = 0
  currentOperation = ''
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
  setDisplay(firstOperand)
}

const negateNumber = number => {
  return -number
}

const getCurrentOperand = currentOperation => {
  let currentOperand = 0
  if (currentOperation === '') {
    currentOperand = firstOperand
  } else {
    currentOperand = secondOperand
  }
  return currentOperand
}

const resetOperands = () => {
  firstOperand = 0
  secondOperand = 0
}

const updateOperands = (currentOperand, currentOperation) => {
  if (currentOperation === '') {
    firstOperand = currentOperand
  } else {
    secondOperand = currentOperand
  }
}
const updateButtonStates = currentOperand => {
  if (currentOperand > 0) {
    enableButton('negate')
    enableButton('zero')
  }

  if (countDigits(currentOperand) >= MAX_DIGITS_IN_DISPLAY) {
    disableNumberButtons()
    disableButton('point')
  }
}

const handleNumberClick = number => {
  if (isNewOperation) {
    resetOperands()
    isNewOperation = false
  }

  let currentOperand = getCurrentOperand(currentOperation)

  if (canAddMoreDigits(currentOperand, MAX_DIGITS_IN_DISPLAY)) {
    currentOperand = appendDigit(currentOperand, number)
  }

  updateOperands(currentOperand, currentOperation)
  updateButtonStates(currentOperand)
  setDisplay(currentOperand)
}

const handlePointClick = () => {
  const currentOperand = getCurrentOperand(currentOperation)
  isDecimal = true
  disableButton('point')
  setDisplay(currentOperand)
}

const handleNegateClick = () => {
  let currentOperand = getCurrentOperand(currentOperation)
  currentOperand = negateNumber(currentOperand)
  updateOperands(currentOperand, currentOperation)
  setDisplay(currentOperand)
}

const handleOperationClick = newOperation => {
  if (currentOperation !== '') {
    if (
      (currentOperation === 'multiply' || currentOperation === 'divide') &&
      secondOperand === 0
    ) {
      secondOperand = 1
    }
    firstOperand = performOperation(
      firstOperand,
      secondOperand,
      currentOperation
    )
    firstOperand = parseFloat(firstOperand.toPrecision(MAX_DIGITS_IN_DISPLAY))

    secondOperand = 0
    currentOperation = ''
    isNewOperation = true
  }

  enableButton('point')
  enableButton('clean')
  disableButton('negate')
  enableNumberButtons()

  unlighlightOperationButtons()
  highlightButton(newOperation)

  currentOperation = newOperation
  isDecimal = false
  decimalMultiplier = 0.1
  isNewOperation = false
}

const performOperation = (operand1, operand2, currentOperation) => {
  let result
  switch (currentOperation) {
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
  if (currentOperation !== '' && secondOperand === 0) {
    setDisplay('ERROR')
    resetCalculatorState()

    disableAllButtons()
    enableButton('clean')
    unlighlightOperationButtons()
    return
  }

  if (currentOperation !== '') {
    const result = performOperation(
      firstOperand,
      secondOperand,
      currentOperation
    )
    firstOperand = parseFloat(result.toPrecision(MAX_DIGITS_IN_DISPLAY))

    secondOperand = 0
    currentOperation = ''
    isNewOperation = true

    setDisplay(firstOperand)
  } else {
    isDecimal = false
    setDisplay(firstOperand)
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
