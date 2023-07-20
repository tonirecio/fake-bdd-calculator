const MAX_DIGITS_IN_DISPLAY = 10

const display = document.querySelector('div[name="display"] span')

let firstOperand = 0
let secondOperand = null
let currentOperation = ''
let decimalMultiplier = 0.1
let isDecimal = false
let isNewOperation = false
let isError = false

const operations = {
  sum: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
}

const setDisplay = value => {
  display.innerHTML = value
}

const formatNumberForDisplay = number => {
  let displayValue = ''
  if (countDigits(number) <= MAX_DIGITS_IN_DISPLAY && isValidNumber(number)) {
    displayValue = String(number).replace('.', ',')
    if (
      isDecimal &&
      !displayValue.includes(',') &&
      countDigits(displayValue) < MAX_DIGITS_IN_DISPLAY
    ) {
      displayValue += ','
    }
  } else {
    displayValue = 'ERROR'
  }
  return displayValue
}

const isValidNumber = number => {
  return Number.isFinite(number) && number !== null
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

const reset = () => {
  firstOperand = 0
  secondOperand = null
  currentOperation = ''
  decimalMultiplier = 0.1
  isDecimal = false
  isNewOperation = false
  isError = false

  updateButtonsDisabledState()
  updateButtonsHighlightedState()
}

const resetAndDisplay = () => {
  reset()
  setDisplay(String(firstOperand))
}

const negateNumber = number => {
  return -number
}

const getCurrentOperandValue = () => {
  let currentOperand = 0
  if (currentOperation === '') {
    currentOperand = firstOperand
  } else {
    currentOperand = secondOperand
  }
  return currentOperand
}

const setCurrentOperandValue = currentOperand => {
  if (currentOperation === '') {
    firstOperand = currentOperand
  } else {
    secondOperand = currentOperand
  }
}

const handleNumberClick = number => {
  if (isNewOperation) {
    firstOperand = 0
    secondOperand = 0
    isNewOperation = false
  }

  let currentOperand = getCurrentOperandValue()
  if (canAddMoreDigits(currentOperand, MAX_DIGITS_IN_DISPLAY)) {
    currentOperand = appendDigit(currentOperand, number)
  }

  setCurrentOperandValue(currentOperand)

  updateButtonsDisabledState()
  setDisplay(formatNumberForDisplay(currentOperand))
}

const handlePointClick = () => {
  let currentOperand = getCurrentOperandValue()

  if (!isValidNumber(currentOperand)) {
    currentOperand = 0
  }
  isDecimal = true

  updateButtonsDisabledState()
  setDisplay(formatNumberForDisplay(currentOperand))
}

const handleNegateClick = () => {
  let currentOperand = getCurrentOperandValue()
  currentOperand = negateNumber(currentOperand)
  setCurrentOperandValue(currentOperand)
  setDisplay(formatNumberForDisplay(currentOperand))
}

const handleOperationClick = newOperation => {
  if (currentOperation !== '' && isValidNumber(secondOperand)) {
    let operationResult = performOperation(
      firstOperand,
      secondOperand,
      currentOperation
    )
    operationResult = parseFloat(
      operationResult.toPrecision(MAX_DIGITS_IN_DISPLAY)
    )

    firstOperand = operationResult
    secondOperand = 0
    currentOperation = ''
    isNewOperation = true
  }

  currentOperation = newOperation
  isDecimal = false
  decimalMultiplier = 0.1
  isNewOperation = false

  updateButtonsDisabledState()
  updateButtonsHighlightedState()
}

const performOperation = (operand1, operand2, operation) => {
  return operations[operation](operand1, operand2)
}

const handleEqualClick = () => {
  let numberToBeDisplayed = 0

  isDecimal = false

  if (currentOperation === '' && isValidNumber(firstOperand)) {
    numberToBeDisplayed = firstOperand
  } else {
    if (
      isValidNumber(secondOperand) &&
      !(currentOperation === 'divide' && secondOperand === 0)
    ) {
      let operationResult = performOperation(
        firstOperand,
        secondOperand,
        currentOperation
      )
      operationResult = parseFloat(
        operationResult.toPrecision(MAX_DIGITS_IN_DISPLAY)
      )

      firstOperand = operationResult
      secondOperand = 0
      currentOperation = ''
      isNewOperation = true

      numberToBeDisplayed = firstOperand
      if (countDigits(operationResult) >= MAX_DIGITS_IN_DISPLAY) {
        console.log('op')
        isError = true
      }
    } else {
      isError = true
    }
  }

  if (!isError) {
    setDisplay(formatNumberForDisplay(numberToBeDisplayed))
  } else {
    setDisplay('ERROR')
  }
  updateButtonsDisabledState()
}

const updateButtonsDisabledState = () => {
  const currentOperand = getCurrentOperandValue()
  const currentOperandDigitCount = countDigits(currentOperand)

  if (currentOperandDigitCount >= MAX_DIGITS_IN_DISPLAY) {
    setNumberButtonsDisabledState(true)
    setButtonDisabledState('point', true)
  }
  if (currentOperation !== '' && !isError) {
    setAllButtonsDisabledState(false)
    setButtonDisabledState('negate', true)
  }

  setButtonDisabledState(
    'zero',
    (currentOperand === 0 && currentOperation === '') ||
      currentOperandDigitCount >= MAX_DIGITS_IN_DISPLAY
  )
  setButtonDisabledState(
    'negate',
    currentOperand === 0 || currentOperand === null
  )

  if (isDecimal) {
    setButtonDisabledState('point', true)
  }

  if (isError) {
    setAllButtonsDisabledState(true)
  }

  setButtonDisabledState('clean', false)

  document.getElementsByName('clean')[0].addEventListener('click', () => {
    setAllButtonsDisabledState(false)
    setButtonDisabledState('negate', true)
    setButtonDisabledState('zero', true)
  })
  document.getElementsByName('equal')[0].addEventListener('click', () => {
    if (countDigits(currentOperand) >= MAX_DIGITS_IN_DISPLAY) {
      setAllButtonsDisabledState(false)
    }
  })
}

const updateButtonsHighlightedState = () => {
  if (currentOperation !== '') {
    setOperationButtonsHighlightedState(false)
    setButtonHighlightedState(currentOperation, true)
  }
  document.getElementsByName('clean')[0].addEventListener('click', () => {
    setOperationButtonsHighlightedState(false)
  })
  document.getElementsByName('equal')[0].addEventListener('click', () => {
    setOperationButtonsHighlightedState(false)
  })
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

const setButtonDisabledState = (buttonName, isDisabled) => {
  document.getElementsByName(buttonName)[0].disabled = isDisabled
}

const setNumberButtonsDisabledState = isDisabled => {
  numberButtons.forEach(button => setButtonDisabledState(button, isDisabled))
}

const setOperationButtonsDisabledState = isDisabled => {
  operationButtons.forEach(button => setButtonDisabledState(button, isDisabled))
}

const setUtilityButtonsDisabledState = isDisabled => {
  utilityButtons.forEach(button => setButtonDisabledState(button, isDisabled))
}

const setAllButtonsDisabledState = isDisabled => {
  setNumberButtonsDisabledState(isDisabled)
  setOperationButtonsDisabledState(isDisabled)
  setUtilityButtonsDisabledState(isDisabled)
}

const setButtonHighlightedState = (buttonName, isHighlighted) => {
  const button = document.getElementsByName(buttonName)[0]
  button.classList.toggle('highlighted', isHighlighted)
}

const setOperationButtonsHighlightedState = isHighlighted => {
  operationButtons.forEach(button =>
    setButtonHighlightedState(button, isHighlighted)
  )
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
  .addEventListener('click', () => handlePointClick())
document
  .getElementsByName('clean')[0]
  .addEventListener('click', () => resetAndDisplay())
document
  .getElementsByName('negate')[0]
  .addEventListener('click', () => handleNegateClick())
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
  .addEventListener('click', () => handleEqualClick())

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
        resetAndDisplay()
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
      case '=':
        handleEqualClick()
        break
      default:
        break
    }
  }
})

resetAndDisplay()
