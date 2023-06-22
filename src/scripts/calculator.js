const MAX_DIGITS_IN_DISPLAY = 10
const COMMA_SYMBOL = ','
const display = document.querySelector('div[name="display"] span')
let currentOperation = null
let previousOperand = 0
let currentOperand = null
let overrideDisplay = false

const init = () => {
  addEventsToButtons()
  addEventsToKeyboard()
  reset()
}

const reset = () => {
  previousOperand = 0
  currentOperand = null
  currentOperation = null
  setDisplay(0)
}

const addEventsToButtons = () => {
  // Number buttons
  document.querySelector('button[name="zero"]').addEventListener('click', () => writeNumber(0))
  document.querySelector('button[name="one"]').addEventListener('click', () => writeNumber(1))
  document.querySelector('button[name="two"]').addEventListener('click', () => writeNumber(2))
  document.querySelector('button[name="three"]').addEventListener('click', () => writeNumber(3))
  document.querySelector('button[name="four"]').addEventListener('click', () => writeNumber(4))
  document.querySelector('button[name="five"]').addEventListener('click', () => writeNumber(5))
  document.querySelector('button[name="six"]').addEventListener('click', () => writeNumber(6))
  document.querySelector('button[name="seven"]').addEventListener('click', () => writeNumber(7))
  document.querySelector('button[name="eight"]').addEventListener('click', () => writeNumber(8))
  document.querySelector('button[name="nine"]').addEventListener('click', () => writeNumber(9))
  // Non operator buttons
  document.querySelector('button[name="point"]').addEventListener('click', writeComma)
  document.querySelector('button[name="clean"]').addEventListener('click', reset)
  document.querySelector('button[name="negate"]').addEventListener('click', negateDisplay)
  // Operator buttons
  document.querySelector('button[name="equal"]').addEventListener('click', performOperation)
  document.querySelector('button[name="sum"').addEventListener('click', () => setOperation('sum'))
  document.querySelector('button[name="subtract"').addEventListener('click', () => setOperation('subtract'))
  document.querySelector('button[name="multiply"').addEventListener('click', () => setOperation('multiply'))
  document.querySelector('button[name="divide"').addEventListener('click', () => setOperation('divide'))
}

const addEventsToKeyboard = () => {
  document.addEventListener('keydown', (event) => {
    const keyName = event.key
    if (!isNaN(keyName)) {
      writeNumber(parseInt(keyName))
    } else {
      if (keyName === ',') {
        writeComma()
      } else if (keyName === 'Escape') {
        reset()
      } else if (keyName === 'Control') {
        negateDisplay()
      }
    }
  })
}

const displayedNumber = () => {
  const formattedDisplay = display.innerHTML.replace(',', '.')
  return Number(formattedDisplay)
}

const displayedText = () => {
  return display.innerHTML
}

const setDisplay = (value) => {
  value = value.toString().replace('.', ',')
  display.innerHTML = value
}

const negateDisplay = () => {
  if (displayedNumber() !== 0) {
    if (displayedNumber() < 0) {
      setDisplay(displayedText().substring(1))
    } else {
      setDisplay('-' + displayedText())
    }
  }
}

const appendDisplay = (content) => {
  if (getDigitNumber(displayedNumber()) < MAX_DIGITS_IN_DISPLAY) {
    setDisplay(displayedText() + content.toString())
  }
}

const getDigitNumber = (number) => {
  return number.toString().replace('.', '').length
}

const writeNumber = (number) => {
  if (displayedText() === '0' || overrideDisplay) {
    overrideDisplay = false
    setDisplay(number)
  } else {
    appendDisplay(number)
  }
}

const writeComma = () => {
  if (!displayedText().includes(COMMA_SYMBOL)) { appendDisplay(COMMA_SYMBOL) }
}

const setOperation = (operation) => {
  if (currentOperation === null) {
    previousOperand = displayedNumber()
  } else if (!overrideDisplay) {
    currentOperand = displayedNumber()
    performOperation()
    previousOperand = displayedNumber()
  }
  currentOperation = operation
  overrideDisplay = true
}

const performOperation = () => {
  if (currentOperation !== null && !overrideDisplay) {
    currentOperand = displayedNumber()
  }
  let result = 'ERROR'
  if (currentOperand === null) {
    result = 'ERROR'
  }
  if (currentOperation === 'sum') {
    result = previousOperand + currentOperand
  } else if (currentOperation === 'subtract') {
    result = previousOperand - currentOperand
  } else if (currentOperation === 'multiply') {
    result = previousOperand * currentOperand
  } else if (currentOperation === 'divide') {
    result = previousOperand / currentOperand
  } else {
    result = displayedNumber()
  }
  result = formatResult(result)
  setDisplay(result)
  overrideDisplay = true
  currentOperation = null
}

const formatResult = (result) => {
  if (Math.abs(result) >= Math.pow(10, MAX_DIGITS_IN_DISPLAY)) result = 'ERROR'
  if (result !== 'ERROR') {
    if (getDigitNumber(result) > MAX_DIGITS_IN_DISPLAY) {
      const integerPartDigits = parseInt(result.toString()).toString().length
      result = 1 * result.toFixed(MAX_DIGITS_IN_DISPLAY - integerPartDigits)
    }
  }
  return result
}
// TODO: organitzar codi

init()