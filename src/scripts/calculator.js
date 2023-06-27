const MAX_DIGITS_IN_DISPLAY = 10
const COMMA_SYMBOL = ','
const display = document.querySelector('div[name="display"] span')
let currentOperation = null
let previousOperand = 0
let number = null
let numberHasComma = false
let overrideDisplay = true
let pendingZeros = 0

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
  pendingZeros = 0
  handleButtonEnablingWhenReset()
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
  document.querySelector('button[name="negate"]').addEventListener('click', handleNegateClick)
  // Operator buttons
  document.querySelector('button[name="equal"]').addEventListener('click', handleEqualsClick)

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
        handleNegateClick()
      }
    }
  })
}

const handleNegateClick = () => {
  number = negateNumber(number)
  if (parseInt(number) === number && numberHasComma) {
    writeComma()
  }
  setDisplay(formatNumberToDisplay(number))
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
  handleButtonEnablingWhenClickingOperator()
}

const handleEqualsClick = () => {
  previousOperand = performOperation()
  overrideDisplay = true
  currentOperation = null
  setAllButtonDisabledStatus(false)
  setDisplay(formatNumberToDisplay(previousOperand))
}

const setDisplay = (value) => {
  let displayValue = value.toString()
  if (displayValue !== 'ERROR') {
    displayValue = displayValue.replace('.', COMMA_SYMBOL)
    if (numberHasComma && !displayValue.includes(COMMA_SYMBOL)) {
      displayValue += COMMA_SYMBOL
    }
    for (let putZeros = 0; putZeros < pendingZeros; putZeros++) {
      displayValue += '0'
    }
    if (getDigitNumber(value) >= MAX_DIGITS_IN_DISPLAY && !overrideDisplay) {
      setAllButtonDisabledStatus(false)
      setNonOperatorButtonDisabledStatus(true)
    }
  }
  display.innerHTML = displayValue
}

const negateNumber = (number) => {
  return -1 * number
}

const getDigitNumber = (number) => {
  return Math.abs(number).toString().replace('.', '').length
}

const writeNewNumber = (newNumber) => {
  if (overrideDisplay || number === null) {
    overrideDisplay = false
    numberHasComma = false
    number = newNumber
    setAllButtonDisabledStatus(false)
  } else if (getDigitNumber(number) < MAX_DIGITS_IN_DISPLAY) {
    if (Number.isInteger(number) && numberHasComma) {
      if (newNumber === 0) {
        pendingZeros++
      } else {
        number += newNumber / (Math.pow(10, pendingZeros + 1))
        pendingZeros = 0
      }
    } else if (getDigitNumber(number) < MAX_DIGITS_IN_DISPLAY) {
      number = parseFloat(number + newNumber.toString())
    }
  }
  setDisplay(formatNumberToDisplay(number))
}

const writeComma = () => {
  if (number === null) {
    number = 0
  }
  if (!numberHasComma && getDigitNumber(number) < MAX_DIGITS_IN_DISPLAY) {
    numberHasComma = true
    overrideDisplay = false
    setDisplay(number)
  }
}

const performOperation = () => {
  let result = number === null ? 0 : number
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
    } else if (currentOperation === null && Number.isInteger(number)) {
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

// Functions for button enabling/disabling
const setAllButtonDisabledStatus = (disabled) => {
  setNonOperatorButtonDisabledStatus(disabled)
  document.querySelector('button[name="clean"]').disabled = disabled
  document.querySelector('button[name="negate"]').disabled = disabled
  document.querySelector('button[name="equal"]').disabled = disabled
  document.querySelector('button[name="sum"]').disabled = disabled
  document.querySelector('button[name="subtract"]').disabled = disabled
  document.querySelector('button[name="multiply"]').disabled = disabled
  document.querySelector('button[name="divide"]').disabled = disabled
}

const setNonOperatorButtonDisabledStatus = (disabled) => {
  document.querySelector('button[name="zero"]').disabled = disabled
  document.querySelector('button[name="one"]').disabled = disabled
  document.querySelector('button[name="two"]').disabled = disabled
  document.querySelector('button[name="three"]').disabled = disabled
  document.querySelector('button[name="four"]').disabled = disabled
  document.querySelector('button[name="five"]').disabled = disabled
  document.querySelector('button[name="six"]').disabled = disabled
  document.querySelector('button[name="seven"]').disabled = disabled
  document.querySelector('button[name="eight"]').disabled = disabled
  document.querySelector('button[name="nine"]').disabled = disabled
  document.querySelector('button[name="point"]').disabled = disabled
}

const handleButtonEnablingWhenClickingOperator = () => {
  setAllButtonDisabledStatus(false)
  document.querySelector('button[name="negate"]').disabled = true
}

const handleButtonEnablingWhenReset = () => {
  setAllButtonDisabledStatus(false)
  document.querySelector('button[name="zero"]').disabled = true
  document.querySelector('button[name="negate"]').disabled = true
}

init()
