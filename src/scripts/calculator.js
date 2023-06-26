const MAX_DIGITS_IN_DISPLAY = 10
const COMMA_SYMBOL = ','
const display = document.querySelector('div[name="display"] span')
let currentOperation = null
let previousOperand = 0
let number = null
let numberHasComma = false
let overrideDisplay = true

const init = () => {
  addEventsToButtons()
  addEventsToKeyboard()
  reset()
}

const reset = () => {
  previousOperand = 0
  currentOperation = null
  numberHasComma = false
  number = null
  setDisplay(0)
}

const addEventsToButtons = () => {
  // Number buttons
  document.querySelector('button[name="zero"]').addEventListener('click', () => writeNewNumber(0))
  document.querySelector('button[name="one"]').addEventListener('click', () => writeNewNumber(1))
  document.querySelector('button[name="two"]').addEventListener('click', () => writeNewNumber(2))
  document.querySelector('button[name="three"]').addEventListener('click', () => writeNewNumber(3))
  document.querySelector('button[name="four"]').addEventListener('click', () => writeNewNumber(4))
  document.querySelector('button[name="five"]').addEventListener('click', () => writeNewNumber(5))
  document.querySelector('button[name="six"]').addEventListener('click', () => writeNewNumber(6))
  document.querySelector('button[name="seven"]').addEventListener('click', () => writeNewNumber(7))
  document.querySelector('button[name="eight"]').addEventListener('click', () => writeNewNumber(8))
  document.querySelector('button[name="nine"]').addEventListener('click', () => writeNewNumber(9))
  // Non operator buttons
  document.querySelector('button[name="point"]').addEventListener('click', writeComma)
  document.querySelector('button[name="clean"]').addEventListener('click', reset)
  document.querySelector('button[name="negate"]').addEventListener('click', negateNumberAndUpdateDisplay)
  // Operator buttons
  document.querySelector('button[name="equal"]').addEventListener('click', () => {
    previousOperand = performOperation()
    overrideDisplay = true
    setDisplay(formatNumberToDisplay(previousOperand))
    currentOperation = null
  })
  document.querySelector('button[name="sum"]').addEventListener('click', () => handleOperationClick('sum'))
  document.querySelector('button[name="subtract"]').addEventListener('click', () => handleOperationClick('subtract'))
  document.querySelector('button[name="multiply"]').addEventListener('click', () => handleOperationClick('multiply'))
  document.querySelector('button[name="divide"]').addEventListener('click', () => handleOperationClick('divide'))
}

const addEventsToKeyboard = () => {
  document.addEventListener('keydown', (event) => {
    const keyName = event.key
    if (!isNaN(keyName)) {
      writeNewNumber(parseInt(keyName))
    } else {
      if (keyName === ',') {
        writeComma()
      } else if (keyName === 'Escape') {
        reset()
      } else if (keyName === 'Control') {
        negateNumberAndUpdateDisplay()
      }
    }
  })
}

const setDisplay = (value) => {
  let displayValue = value.toString()
  if (displayValue !== 'ERROR') {
    displayValue = displayValue.replace('.', COMMA_SYMBOL)
    if (numberHasComma && !displayValue.includes(COMMA_SYMBOL)) {
      displayValue += COMMA_SYMBOL
    }
  }
  display.innerHTML = displayValue
}

const negateNumberAndUpdateDisplay = () => {
  number *= -1
  if (parseInt(number) === number && numberHasComma) {
    writeComma()
  }
  setDisplay(formatNumberToDisplay(number))
}

const getDigitNumber = (number) => {
  return Math.abs(number).toString().replace('.', '').length
}

const writeNewNumber = (newNumber) => {
  if (overrideDisplay || number === null) {
    overrideDisplay = false
    numberHasComma = false
    number = newNumber
  } else {
    if (number.toString().length === parseInt(number).toString().length && numberHasComma) {
      number += 0.1 * newNumber
    } else if (getDigitNumber(number) < MAX_DIGITS_IN_DISPLAY) {
      number = parseFloat(number + newNumber.toString())
    }
  }
  setDisplay(formatNumberToDisplay(number))
}

const writeComma = () => {
  if (!numberHasComma && getDigitNumber(number) < MAX_DIGITS_IN_DISPLAY) {
    numberHasComma = true
    setDisplay(number)
  }
}

const handleOperationClick = (operation) => {
  if (!overrideDisplay && currentOperation !== null) {
    previousOperand = performOperation()
  } else if (previousOperand === 0) {
    previousOperand = number
  }
  numberHasComma = false
  currentOperation = operation
  overrideDisplay = true
}

const performOperation = () => {
  let result = number
  if (overrideDisplay && previousOperand !== 0) {
    result = NaN
  } else {
    if (currentOperation === 'sum') {
      result = previousOperand + number
    } else if (currentOperation === 'subtract') {
      result = previousOperand - number
    } else if (currentOperation === 'multiply') {
      result = previousOperand * number
    } else if (currentOperation === 'divide') {
      result = previousOperand / number
    }
  }
  if (currentOperation === null) {
    if (Number.isInteger(number)) {
      numberHasComma = false
    }
  }
  return result
}

const formatNumberToDisplay = (result) => {
  if (Math.abs(result) >= Math.pow(10, MAX_DIGITS_IN_DISPLAY) || !isFinite(result)) result = 'ERROR'
  if (result !== 'ERROR') {
    if (getDigitNumber(result) > MAX_DIGITS_IN_DISPLAY) {
      const integerPartDigits = parseInt(Math.abs(result)).toString().length
      // Round by using toFixed() and remove trailing zeros by using parseFloat()
      result = parseFloat(result.toFixed(MAX_DIGITS_IN_DISPLAY - integerPartDigits))
    }
  }
  return result
}

init()
