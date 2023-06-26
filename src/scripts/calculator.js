const lenNumber = (number) => {
  let stringNumber = String(number)
  stringNumber = stringNumber.replace('-', '')
  stringNumber = stringNumber.replace('.', '')
  return (stringNumber.length)
}

/* TODO: millorar(treure el *1) */
const roundNumber = (number) => {
  const maxDecimals = MAX_DIGITS_IN_DISPLAY - lenNumber(Math.round(number))
  number = number.toFixed(maxDecimals) * 1
  return (number)
}

const reset = () => {
  operator = null
  accumulatedNumber = null
  actualNumber = null
  actualNumberHasPoint = false
  setDisplay(0)
}

const setDisplay = (value) => {
  let displayValue
  if (value === 'ERROR') {
    displayValue = value
  } else {
    displayValue = String(value).replace('.', ',')
    if (actualNumberHasPoint && !displayValue.includes(',')) {
      displayValue = displayValue.concat(',')
    }
  }
  display.innerHTML = displayValue
}

const negateNum = (number) => {
  number *= -1
  return (number)
}

const appendNumber = (number, numberToAppend, hasPoint) => {
  let result
  if (lenNumber(number) < MAX_DIGITS_IN_DISPLAY) {
    if (hasPoint) {
      const numDecimals = lenNumber(number) - lenNumber(Math.round(number)) + 1
      result = number + (numberToAppend * Math.pow(0.1, numDecimals))
    } else {
      result = number * 10 + numberToAppend
    }
  } else {
    result = actualNumber
  }
  return (roundNumber(result))
}

const operate = (firstOperant, secondOperant, operatorType, maxDigits) => {
  let result
  switch (operatorType) {
    case '+':
      result = firstOperant + secondOperant
      break
    case '-':
      result = firstOperant - secondOperant
      break
    case '*':
      result = firstOperant * secondOperant
      break
    case '/':
      if (secondOperant === 0) {
        result = 'ERROR'
      } else {
        result = firstOperant / secondOperant
      }
      break
  }
  if (result === 'ERROR' || lenNumber(Math.round(result)) > maxDigits) {
    result = 'ERROR'
  } else {
    result = roundNumber(result)
  }
  return (result)
}

const pressingNumber = (newNumber) => {
  if ((actualNumber === 0 && !actualNumberHasPoint) || actualNumber === null) {
    actualNumber = newNumber
  } else {
    actualNumber = appendNumber(actualNumber, newNumber, actualNumberHasPoint)
  }
  setDisplay(actualNumber)
}

const pressingNegate = () => {
  actualNumber = negateNum(actualNumber)
  setDisplay(actualNumber)
}

const pressingPoint = () => {
  if (!actualNumberHasPoint && lenNumber(actualNumber) < MAX_DIGITS_IN_DISPLAY) {
    actualNumberHasPoint = true
  }
  setDisplay(actualNumber)
}

const pressingOperator = (newOperator) => {
  if (operator !== null && actualNumber !== null) {
    accumulatedNumber = operate(accumulatedNumber, actualNumber, operator, MAX_DIGITS_IN_DISPLAY)
    operator = null
    actualNumber = null
    actualNumberHasPoint = false
    setDisplay(accumulatedNumber)
  } else if (operator === null && accumulatedNumber === null) {
    accumulatedNumber = actualNumber
  }
  operator = newOperator
  actualNumber = null
  actualNumberHasPoint = false
}

const pressingEqual = () => {
  let displayValue
  if (actualNumber === null) {
    displayValue = 'ERROR'
  } else {
    if (operator === null) {
      accumulatedNumber = actualNumber
    } else {
      accumulatedNumber = operate(accumulatedNumber, actualNumber, operator, MAX_DIGITS_IN_DISPLAY)
      operator = null
    }
    actualNumber = null
    actualNumberHasPoint = false
    displayValue = accumulatedNumber
  }
  setDisplay(displayValue)
}

const getEventsListenersButtons = () => {
  document.getElementsByName('zero')[0].addEventListener('click', () => pressingNumber(0))
  document.getElementsByName('one')[0].addEventListener('click', () => pressingNumber(1))
  document.getElementsByName('two')[0].addEventListener('click', () => pressingNumber(2))
  document.getElementsByName('three')[0].addEventListener('click', () => pressingNumber(3))
  document.getElementsByName('four')[0].addEventListener('click', () => pressingNumber(4))
  document.getElementsByName('five')[0].addEventListener('click', () => pressingNumber(5))
  document.getElementsByName('six')[0].addEventListener('click', () => pressingNumber(6))
  document.getElementsByName('seven')[0].addEventListener('click', () => pressingNumber(7))
  document.getElementsByName('eight')[0].addEventListener('click', () => pressingNumber(8))
  document.getElementsByName('nine')[0].addEventListener('click', () => pressingNumber(9))
  document.getElementsByName('clean')[0].addEventListener('click', () => reset())
  document.getElementsByName('negate')[0].addEventListener('click', () => pressingNegate())
  document.getElementsByName('point')[0].addEventListener('click', () => pressingPoint())
  document.getElementsByName('divide')[0].addEventListener('click', () => pressingOperator('/'))
  document.getElementsByName('multiply')[0].addEventListener('click', () => pressingOperator('*'))
  document.getElementsByName('subtract')[0].addEventListener('click', () => pressingOperator('-'))
  document.getElementsByName('sum')[0].addEventListener('click', () => pressingOperator('+'))
  document.getElementsByName('equal')[0].addEventListener('click', () => pressingEqual())
}

const getEventsListenersKeyboard = () => {
  document.addEventListener('keyup', (key) => {
    if (!isNaN(key.key)) {
      pressingNumber(Number(key.key))
    } else {
      switch (key.key) {
        case 'Control':
          pressingNegate()
          break
        case 'Escape':
          reset()
          break
        case ',':
          pressingPoint()
          break
        case '-':
          pressingOperator('-')
          break
        case '+':
          pressingOperator('+')
          break
        case '*':
          pressingOperator('*')
          break
        case '/':
          pressingOperator('/')
          break
        case '=':
          pressingEqual()
          break
      }
    }
  })
}

const MAX_DIGITS_IN_DISPLAY = 10
const display = document.querySelector('div[name="display"] span')
let operator = null
let accumulatedNumber = null
let actualNumber = null
let actualNumberHasPoint = false

reset()
getEventsListenersButtons()
getEventsListenersKeyboard()
