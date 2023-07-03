const getNameOperator = (operatorSymbol) => {
  let operatorName = null
  switch (operatorSymbol) {
    case '+':
      operatorName = 'sum'
      break
    case '-':
      operatorName = 'subtract'
      break
    case '*':
      operatorName = 'multiply'
      break
    case '/':
      operatorName = 'divide'
      break
  }
  return (operatorName)
}

const exponentialToString = (exponentialString) => {
  let stringResultant = ''
  const positionOfE = exponentialString.indexOf('e')
  let significand = exponentialString.substring(0, positionOfE)
  const orderOfMagnitude = exponentialString.substring(positionOfE + 1)
  console.log('N: ' + exponentialString + 'pE: ' + positionOfE + ' S: ' + significand + '   OM: ' + orderOfMagnitude)
  if (significand < 0) {
    stringResultant = stringResultant.concat('-')
    significand *= -1
  }
  if (orderOfMagnitude < 0) {
    stringResultant = stringResultant.concat('0,')
    for (let i = -1; i > orderOfMagnitude; i--) {
      stringResultant = stringResultant.concat('0')
    }
    stringResultant = stringResultant.concat(significand)
  } else {
    stringResultant = stringResultant.concat(significand)
    for (let i = 0; i < orderOfMagnitude; i++) {
      stringResultant = stringResultant.concat('0')
    }
  }
  return (stringResultant)
}

const lenNumber = (number, pendingZeroDecimals) => {
  let stringNumber = String(number)
  if (stringNumber.includes('e')) {
    stringNumber = exponentialToString(stringNumber)
  }
  stringNumber = stringNumber.replace('-', '')
  stringNumber = stringNumber.replace('.', '')
  return (stringNumber.length + pendingZeroDecimals)
}

const roundNumber = (number) => {
  const maxDecimals = MAX_DIGITS_IN_DISPLAY - lenNumber(Math.round(number), 0)
  let roundedNumber = number.toFixed(maxDecimals)
  roundedNumber = parseFloat(roundedNumber)
  if (roundedNumber === 0 && number !== roundedNumber) {
    roundedNumber = 'ERROR'
  }
  return (roundedNumber)
}

const resetCurrentNumber = () => {
  currentNumberisNull = true
  currentNumber = 0
  pendingZeros = 0
  currentNumberHasPoint = false
}

const reset = () => {
  operator = null
  accumulatedNumber = null
  resetCurrentNumber()
  setDisplay(0)
  changeDisableAllButtons(buttons, false)
  changeDisableOneButton(document.getElementsByName('zero')[0], true)
  changeDisableOneButton(document.getElementsByName('negate')[0], true)
  unhighlightAllButtons(buttons)
}

const setDisplay = (value) => {
  let displayValue
  if (value === 'ERROR') {
    displayValue = value
  } else {
    displayValue = String(value).replace('.', ',')
    if (displayValue.includes('e')) {
      displayValue = exponentialToString(displayValue)
    } else if (currentNumberHasPoint) {
      if (!displayValue.includes(',')) {
        displayValue = displayValue.concat(',')
      }
      for (let i = 0; i < pendingZeros; i++) {
        displayValue = displayValue.concat('0')
      }
    }
  }
  display.innerHTML = displayValue
}

const negateNum = (number) => {
  number *= -1
  return (number)
}

const appendNumber = (number, numberToAppend, hasPoint, pendingZeroDecimals) => {
  let result
  if (lenNumber(number, pendingZeros) < MAX_DIGITS_IN_DISPLAY) {
    if (hasPoint) {
      console.log('lenFloat: ' + lenNumber(number, 0) + ' lenInt: ' + lenNumber(Math.round(number)))
      const numDecimals = lenNumber(number, 0) - lenNumber(Math.round(number), 0) + 1 + pendingZeroDecimals
      result = number + ((numberToAppend * Math.pow(0.1, numDecimals)))
      console.log('NumDec: ' + numDecimals + ' append: ' + result)
    } else {
      result = number * 10 + numberToAppend
    }
  } else {
    result = currentNumber
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
  if (result === 'ERROR' || lenNumber(Math.round(result), 0) > maxDigits) {
    result = 'ERROR'
  } else {
    result = roundNumber(result)
  }
  return (result)
}

const pressingNumber = (newNumber) => {
  if ((currentNumber === 0 && !currentNumberHasPoint) || currentNumberisNull) {
    currentNumber = newNumber
  } else if (newNumber === 0 && currentNumberHasPoint) {
    pendingZeros++
  } else {
    currentNumber = appendNumber(currentNumber, newNumber, currentNumberHasPoint, pendingZeros)
    pendingZeros = 0
  }
  currentNumberisNull = false
  setDisplay(currentNumber)
  if (currentNumber === 'ERROR') {
    changeDisableWhenError()
  } else {
    changeDisableAllButtons(buttons, false)
    if (currentNumberHasPoint) {
      changeDisableOneButton(document.getElementsByName('point')[0], true)
    }
    if (lenNumber(currentNumber, pendingZeros) >= MAX_DIGITS_IN_DISPLAY) {
      changeDisableNumberButtons(true)
      changeDisableOneButton(document.getElementsByName('point')[0], true)
    }
  }
}

const pressingNegate = () => {
  currentNumber = negateNum(currentNumber)
  setDisplay(currentNumber)
}

const pressingPoint = () => {
  if (!currentNumberHasPoint && lenNumber(currentNumber, pendingZeros) < MAX_DIGITS_IN_DISPLAY) {
    currentNumberHasPoint = true
  }
  setDisplay(currentNumber)
  currentNumberisNull = false
  changeDisableAllButtons(buttons, false)
  changeDisableOneButton(document.getElementsByName('point')[0], true)
}

const pressingOperator = (newOperator) => {
  if (operator !== null && !currentNumberisNull) {
    accumulatedNumber = operate(accumulatedNumber, currentNumber, operator, MAX_DIGITS_IN_DISPLAY)
    currentNumberHasPoint = false
    setDisplay(accumulatedNumber)
    if (accumulatedNumber === 'ERROR') {
      changeDisableWhenError()
    } else {
      changeDisableAllButtons(buttons, false)
    }
  } else if (operator === null && accumulatedNumber === null) {
    accumulatedNumber = currentNumber
    changeDisableAllButtons(buttons, false)
    changeDisableOneButton(document.getElementsByName('negate')[0], true)
  }
  operator = newOperator
  unhighlightAllButtons(buttons)
  const nameOperator = getNameOperator(operator)
  if (nameOperator !== null) {
    highlightOneButton(document.getElementsByName(nameOperator)[0])
  }
  resetCurrentNumber()
}

const pressingEqual = () => {
  let displayValue
  if (currentNumberisNull && operator !== null) {
    displayValue = 'ERROR'
    changeDisableWhenError()
  } else {
    if (operator === null) {
      accumulatedNumber = currentNumber
    } else {
      accumulatedNumber = operate(accumulatedNumber, currentNumber, operator, MAX_DIGITS_IN_DISPLAY)
      operator = null
    }
    resetCurrentNumber()
    displayValue = accumulatedNumber
    if (displayValue === 'ERROR') {
      changeDisableWhenError()
    } else {
      changeDisableAllButtons(buttons, false)
    }
  }
  unhighlightAllButtons(buttons)
  setDisplay(displayValue)
}

const highlightOneButton = (button) => {
  button.classList.add('highlighted')
}

const unhighlightOneButton = (button) => {
  button.classList.remove('highlighted')
}

const unhighlightAllButtons = (buttonsList) => {
  for (const button of buttonsList) {
    unhighlightOneButton(button)
  }
}

const changeDisableOneButton = (button, disabled) => {
  button.disabled = disabled
}

const changeDisableAllButtons = (buttonsList, disabled) => {
  for (const button of buttonsList) {
    changeDisableOneButton(button, disabled)
  }
}

const changeDisableNumberButtons = (disabled) => {
  document.getElementsByName('zero')[0].disabled = disabled
  document.getElementsByName('one')[0].disabled = disabled
  document.getElementsByName('two')[0].disabled = disabled
  document.getElementsByName('three')[0].disabled = disabled
  document.getElementsByName('four')[0].disabled = disabled
  document.getElementsByName('five')[0].disabled = disabled
  document.getElementsByName('six')[0].disabled = disabled
  document.getElementsByName('seven')[0].disabled = disabled
  document.getElementsByName('eight')[0].disabled = disabled
  document.getElementsByName('nine')[0].disabled = disabled
}

const changeDisableWhenError = () => {
  changeDisableAllButtons(buttons, true)
  changeDisableOneButton(document.getElementsByName('clean')[0], false)
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
    if ((key.key <= 9 && key.key > 0) || key.key === '0') {
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
const buttons = document.getElementsByName('keypad')[0].getElementsByTagName('button')
let operator
let accumulatedNumber
let currentNumberisNull
let currentNumber
let currentNumberHasPoint
let pendingZeros

reset()
getEventsListenersButtons()
getEventsListenersKeyboard()