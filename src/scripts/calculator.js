const MAX_DIGITS_IN_DISPLAY = 10
const COMMA_SYMBOL = ','
const display = document.querySelector('div[name="display"] span')
let currentOperation = null
let previousOperand = 0
let currentNumber = null
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
  currentNumber = null
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
  document.querySelector('button[name="point"]').addEventListener('click', handleCommaClick)
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
        handleCommaClick()
      } else if (keyName === 'Escape') {
        reset()
      } else if (keyName === 'Control') {
        handleNegateClick()
      }
    }
  })
}

const handleNegateClick = () => {
  currentNumber = negateNumber(currentNumber)
  if (parseInt(currentNumber) === currentNumber && numberHasComma) {
    writeComma()
  }
  setDisplay(formatNumberToDisplay(currentNumber))
}

const handleCommaClick = () => {
  handleButtonEnablingWhenClickingComma()
  writeComma()
}

const handleOperationClick = (operation) => {
  if (!overrideDisplay && currentOperation !== null) {
    previousOperand = performOperation()
  } else if (previousOperand === 0 && currentNumber !== null) {
    previousOperand = currentNumber
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
  currentNumber = null
  setAllButtonDisabledStatus(false)
  console.log(previousOperand)
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
  } else {
    handleButtonEnablingWhenError()
  }
  display.innerHTML = displayValue
}

const negateNumber = (number) => {
  return -1 * number
}

const getDigitNumber = (number) => {
  return Math.abs(number).toString().replace('.', '').length + pendingZeros
}

const writeNewNumber = (newNumber) => {
  if (overrideDisplay || currentNumber === null) {
    overrideDisplay = false
    numberHasComma = false
    currentNumber = newNumber
    setAllButtonDisabledStatus(false)
  } else if (getDigitNumber(currentNumber) < MAX_DIGITS_IN_DISPLAY) {
    if (Number.isInteger(currentNumber) && !numberHasComma) {
      currentNumber = parseFloat(currentNumber + newNumber.toString())
    } else {
      if (newNumber === 0) {
        pendingZeros++
      } else if (Number.isInteger(currentNumber)) {
        currentNumber += newNumber / (Math.pow(10, pendingZeros + 1))
        pendingZeros = 0
      } else {
        let zeroString = ''
        for (let putZeros = 0; putZeros < pendingZeros; putZeros++) {
          zeroString += '0'
        }
        currentNumber = parseFloat(currentNumber + zeroString + newNumber.toString())
        pendingZeros = 0
      }
    }
  }
  setDisplay(formatNumberToDisplay(currentNumber))
}

const writeComma = () => {
  if (currentNumber === null) {
    currentNumber = 0
  }
  if (!numberHasComma && getDigitNumber(currentNumber) < MAX_DIGITS_IN_DISPLAY) {
    numberHasComma = true
    overrideDisplay = false
    setDisplay(currentNumber)
  }
}

const performOperation = () => {
  let result = currentNumber === null ? 0 : currentNumber
  if (overrideDisplay && previousOperand !== 0) {
    result = NaN
  } else {
    if (currentOperation === 'sum') {
      result = previousOperand + currentNumber
    } else if (currentOperation === 'subtract') {
      result = previousOperand - currentNumber
    } else if (currentOperation === 'multiply') {
      result = previousOperand * currentNumber
    } else if (currentOperation === 'divide') {
      result = previousOperand / currentNumber
    } else if (currentOperation === null && Number.isInteger(currentNumber)) {
      numberHasComma = false
    }
  }
  return result
}

const formatNumberToDisplay = (number) => {
  if (Math.abs(number) >= Math.pow(10, MAX_DIGITS_IN_DISPLAY) || !isFinite(number)) {
    number = 'ERROR'
  }
  if (number !== 'ERROR') {
    if (Math.abs(number) > 0 && Math.abs(number) < 1 / Math.pow(10, MAX_DIGITS_IN_DISPLAY - 1)) {
      number = 'ERROR'
    } else {
      const integerPartDigits = parseInt(Math.abs(number)).toString().length
      // Round by using toFixed() and remove trailing zeros by using parseFloat()
      number = number.toFixed(MAX_DIGITS_IN_DISPLAY - integerPartDigits)
      if (parseFloat(number).toString().includes('e')) {
        const numberArray = number.toString().split('')
        while (numberArray[numberArray.length - 1] === '0') {
          numberArray.pop()
        }
        return numberArray.join('')
      } else {
        number = parseFloat(number)
      }
    }
  }
  return number
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

const handleButtonEnablingWhenClickingComma = () => {
  setAllButtonDisabledStatus(false)
  document.querySelector('button[name="point"]').disabled = true
}

const handleButtonEnablingWhenError = () => {
  setAllButtonDisabledStatus(true)
  document.querySelector('button[name="clean"]').disabled = false
}

init()
