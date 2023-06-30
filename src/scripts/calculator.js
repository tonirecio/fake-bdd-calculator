let currentNumber = 0
let operator = ''
let lastOperator = ''
let hasComma = false
let previousNumber = 0

const display = document.querySelector('[data-testid="display"]')

const MAX_DIGITS_IN_DISPLAY = 10

const addNumber = (number) => {
  if (hasComma) {
    currentNumber = parseFloat(`${currentNumber}.${number}`)
    hasComma = false
  } else {
    currentNumber = parseFloat(`${currentNumber}${number}`)
  }
  setDisplay()
}

const getNumberLength = (number) => {
  return number.toString().replace(/[^0-9]/g, '').length
}

const setDisplay = () => {
  const integerDigits = Math.floor(Math.abs(currentNumber))
  const decimalDigits = Math.max(MAX_DIGITS_IN_DISPLAY - integerDigits.toString().length, 0)

  const formattedNumber = currentNumber.toLocaleString(undefined, {
    maximumFractionDigits: decimalDigits
  })

  display.textContent = hasComma ? `${formattedNumber},` : formattedNumber
}

const clean = () => {
  currentNumber = 0
  operator = ''
  lastOperator = ''
  hasComma = false
  previousNumber = 0
  setDisplay()
}

const negate = () => {
  currentNumber = -currentNumber
  setDisplay()
}

const handleComma = () => {
  if (Number.isInteger(currentNumber)) {
    hasComma = true
  }
  setDisplay()
}

const performOperation = () => {
  if (lastOperator && currentNumber !== null) {
    let result
    switch (lastOperator) {
      case '+':
        result = previousNumber + currentNumber
        break
      case '-':
        result = previousNumber - currentNumber
        break
      case '*':
        result = previousNumber * currentNumber
        break
      case '/':
        result = previousNumber / currentNumber
        break
    }
    const resultDigits = getNumberLength(result)
    if (resultDigits > MAX_DIGITS_IN_DISPLAY) {
      currentNumber = null
      display.textContent = 'ERROR'
      return 'ERROR'
    }

    currentNumber = result
    lastOperator = operator
    previousNumber = 0
    setDisplay()
    return result
  }
}

const handleButtonPress = (button) => {
  switch (button) {
    case 'C':
      clean()
      break
    case ',':
      if (getNumberLength(currentNumber) < MAX_DIGITS_IN_DISPLAY) {
        handleComma()
      }
      break
    case '+-':
      negate()
      break
    case '+':
    case '-':
    case '*':
    case '/':
      if (currentNumber !== null) {
        if (lastOperator !== '') {
          operator = button
          lastOperator = operator
          return
        }
        operator = button
        lastOperator = operator
        previousNumber = currentNumber
        currentNumber = 0
      }
      break
    case '=':
      performOperation()
      break
    default:
      if (getNumberLength(currentNumber) < MAX_DIGITS_IN_DISPLAY) {
        addNumber(Number(button))
      }
      break
  }
}

const handleKeyPress = (event) => {
  const key = event.key
  switch (key) {
    case 'Control':
      negate()
      break
    case ',':
      if (getNumberLength(currentNumber) < MAX_DIGITS_IN_DISPLAY) {
        handleComma()
      }
      break
    case '+':
    case '-':
    case '*':
    case '/':
      if (currentNumber !== null) {
        if (lastOperator !== '') {
          operator = key
          lastOperator = operator
          return
        }
        operator = key
        lastOperator = operator
        previousNumber = currentNumber
        currentNumber = 0
      }
      break
    case 'Enter':
      performOperation()
      break
    case 'Escape':
      clean()
      break
    case '0-9':
      if (getNumberLength(currentNumber) < MAX_DIGITS_IN_DISPLAY) {
        addNumber(Number(key))
      }
      break
  }
}

document.getElementsByName('clean')[0].addEventListener('click', clean)
document.getElementsByName('negate')[0].addEventListener('click', negate)
document.getElementsByName('zero')[0].addEventListener('click', () => handleButtonPress('0'))
document.getElementsByName('one')[0].addEventListener('click', () => handleButtonPress('1'))
document.getElementsByName('two')[0].addEventListener('click', () => handleButtonPress('2'))
document.getElementsByName('three')[0].addEventListener('click', () => handleButtonPress('3'))
document.getElementsByName('four')[0].addEventListener('click', () => handleButtonPress('4'))
document.getElementsByName('five')[0].addEventListener('click', () => handleButtonPress('5'))
document.getElementsByName('six')[0].addEventListener('click', () => handleButtonPress('6'))
document.getElementsByName('seven')[0].addEventListener('click', () => handleButtonPress('7'))
document.getElementsByName('eight')[0].addEventListener('click', () => handleButtonPress('8'))
document.getElementsByName('nine')[0].addEventListener('click', () => handleButtonPress('9'))
document.getElementsByName('divide')[0].addEventListener('click', () => handleButtonPress('/'))
document.getElementsByName('multiply')[0].addEventListener('click', () => handleButtonPress('*'))
document.getElementsByName('subtract')[0].addEventListener('click', () => handleButtonPress('-'))
document.getElementsByName('sum')[0].addEventListener('click', () => handleButtonPress('+'))
document.getElementsByName('point')[0].addEventListener('click', () => handleButtonPress(','))
document.getElementsByName('equal')[0].addEventListener('click', () => handleButtonPress('='))

document.addEventListener('keydown', handleKeyPress)
