const highlightOneButton = (button) => {
  button.classList.add('highlighted')
}

const unhighlightAllButtons = (buttonsList) => {
  for (const button of buttonsList) {
    button.classList.remove('highlighted')
  }
}

const updateHighlightStatus = (operatorClicked) => {
  unhighlightAllButtons(buttons)
  switch (operatorClicked) {
    case '+':
      highlightOneButton(document.getElementsByName('sum')[0]) 
      break
    case '-':
      highlightOneButton(document.getElementsByName('subtract')[0]) 
      break
    case '*':
      highlightOneButton(document.getElementsByName('multiply')[0]) 
      break
    case '/':
      highlightOneButton(document.getElementsByName('divide')[0]) 
      break
  }
}

const changeDisableOneButton = (button, hasToBeDisabled) => {
  button.disabled = hasToBeDisabled
}

const changeDisableAllButtons = (buttonsList, hasToBeDisabled) => {
  for (const button of buttonsList) {
    changeDisableOneButton(button, hasToBeDisabled)
  }
}

const changeDisableNumberButtons = (hasToBeDisabled) => {
  document.getElementsByName('zero')[0].disabled = hasToBeDisabled
  document.getElementsByName('one')[0].disabled = hasToBeDisabled
  document.getElementsByName('two')[0].disabled = hasToBeDisabled
  document.getElementsByName('three')[0].disabled = hasToBeDisabled
  document.getElementsByName('four')[0].disabled = hasToBeDisabled
  document.getElementsByName('five')[0].disabled = hasToBeDisabled
  document.getElementsByName('six')[0].disabled = hasToBeDisabled
  document.getElementsByName('seven')[0].disabled = hasToBeDisabled
  document.getElementsByName('eight')[0].disabled = hasToBeDisabled
  document.getElementsByName('nine')[0].disabled = hasToBeDisabled
}

const changeDisableWhenError = () => {
  changeDisableAllButtons(buttons, true)
  changeDisableOneButton(document.getElementsByName('clean')[0], false)
}

//  TODO: millorar funció i a les que referencia
const updateEnableStatus = () => {
  if (errorType !== '') {
    changeDisableWhenError()
  } else {
    changeDisableAllButtons(buttons, false)
    if (currentNumberisNull && accumulatedNumber === null) {
      changeDisableOneButton(document.getElementsByName('zero')[0], true)
      changeDisableOneButton(document.getElementsByName('negate')[0], true)
    } else if (currentNumberisNull && currentOperator !== null) {
      changeDisableOneButton(document.getElementsByName('negate')[0], true)
    } else {
      if (currentNumberHasPoint) {
        changeDisableOneButton(document.getElementsByName('point')[0], true)
      }
      if (countDigits(currentNumber, currentNumberPendingZeros) >= MAX_DIGITS_IN_DISPLAY) {
        changeDisableNumberButtons(true)
        changeDisableOneButton(document.getElementsByName('point')[0], true)
      }
    }
  }
}

//  TODO: Arreglar funció perquè s'entengui
const formatExponentialToDecimal = (exponentialString) => {
  let decimalString = ''
  const positionOfE = exponentialString.indexOf('e')
  let significand = exponentialString.substring(0, positionOfE)
  const orderOfMagnitude = Number(exponentialString.substring(positionOfE + 1))
  console.log('N: ' + exponentialString + ' pE: ' + positionOfE + ' S: ' + significand + '   OM: ' + orderOfMagnitude)
  significand = significand.replace('.', '')
  console.log('N: ' + exponentialString + ' pE: ' + positionOfE + ' S: ' + significand + '   OM: ' + orderOfMagnitude)
  if (significand.includes('-')) {
    decimalString = decimalString.concat('-')
    significand = significand.substring(1)
  }
  if (orderOfMagnitude < 0) {
    console.log(typeof(significand))
    decimalString = decimalString.concat('0.')
    decimalString += '0'.repeat(-Number(orderOfMagnitude)-1)  
    decimalString = decimalString.concat(significand)
  } else {
    decimalString = decimalString.concat(significand)
    decimalString += '0'.repeat(orderOfMagnitude-significand.length+1) 
  }
  return (decimalString)
}

const countDigits = (number, pendingZeroDecimals) => {
  let stringNumber = String(number)
  if (stringNumber.includes('e')) {
    stringNumber = formatExponentialToDecimal(stringNumber)
  }
  stringNumber = stringNumber.replace('-', '')
  stringNumber = stringNumber.replace('.', '')
  return (stringNumber.length + pendingZeroDecimals)
}

const roundNumber = (number, maxDigits) => {
  const maxDecimals = maxDigits - countDigits(Math.round(number), 0)
  let roundedNumber = number.toFixed(maxDecimals)
  roundedNumber = parseFloat(roundedNumber)
  if (roundedNumber === 0 && number !== roundedNumber) {
    errorType = 'Number too insignificant'
  }
  return (roundedNumber)
}

const formatNumberToDisplay = (number) => {
  let displayValue = String(number)
  if (displayValue.includes('e')) {
    displayValue = formatExponentialToDecimal(displayValue)
  } else if (currentNumberHasPoint) {
    if (!displayValue.includes('.')) {
      displayValue = displayValue.concat('.')
    }
    displayValue += '0'.repeat(currentNumberPendingZeros)
  }
  displayValue = displayValue.replace('.', ',')
  return (displayValue)
}

const resetCurrentNumber = () => {
  currentNumberisNull = true
  currentNumber = 0
  currentNumberPendingZeros = 0
  currentNumberHasPoint = false
}

const setDisplay = (value) => {
  let displayValue
  if (errorType !== '') {
    displayValue = 'ERROR'
  } else {
    displayValue = formatNumberToDisplay(value)
  }
  display.innerHTML = displayValue
}

const reset = () => {
  currentOperator = null
  accumulatedNumber = null
  errorType = ''
  resetCurrentNumber()
  setDisplay(0)
  updateEnableStatus()
  unhighlightAllButtons(buttons)
}

const appendNumber = (number, numberToAppend, hasPoint, pendingZeroDecimals) => {
  let result
  if (countDigits(number, currentNumberPendingZeros) < MAX_DIGITS_IN_DISPLAY) {
    if (hasPoint) {
      const numDecimals = countDigits(number, 0) - countDigits(Math.round(number), 0) + 1 + pendingZeroDecimals
      result = number + ((numberToAppend * Math.pow(0.1, numDecimals)))
    } else {
      result = number * 10 + numberToAppend
    }
  } else {
    result = currentNumber
  }
  return (roundNumber(result, MAX_DIGITS_IN_DISPLAY))
}

const negateNumber = (number) => {
  number *= -1
  return (number)
}

const operate = (firstOperant, secondOperant, operatorType, maxDigits) => {
  let result = 0
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
        errorType = 'Division by 0'
      } else {
        result = firstOperant / secondOperant
      }
      break
  }
  if (countDigits(Math.round(result), 0) > maxDigits) {
    errorType = 'Too long number'
  } 
  if (errorType === '') {
    result = roundNumber(result, MAX_DIGITS_IN_DISPLAY)
  }
  return (result)
}

const pressingNumber = (newNumber) => {
  if ((currentNumber === 0 && !currentNumberHasPoint) || currentNumberisNull) {
    currentNumber = newNumber
  } else if (newNumber === 0 && currentNumberHasPoint) {
    currentNumberPendingZeros++
  } else {
    currentNumber = appendNumber(currentNumber, newNumber, currentNumberHasPoint, currentNumberPendingZeros)
    currentNumberPendingZeros = 0
  }
  currentNumberisNull = false
  setDisplay(currentNumber)
  updateEnableStatus()
}

const pressingNegate = () => {
  currentNumber = negateNumber(currentNumber)
  setDisplay(currentNumber)
}

const pressingPoint = () => {
  if (!currentNumberHasPoint && countDigits(currentNumber, currentNumberPendingZeros) < MAX_DIGITS_IN_DISPLAY) {
    currentNumberHasPoint = true
  } 
  currentNumberisNull = false
  setDisplay(currentNumber)
  updateEnableStatus()
}

const pressingOperator = (newOperator) => {
  if (currentOperator !== null && !currentNumberisNull) {
    accumulatedNumber = operate(accumulatedNumber, currentNumber, currentOperator, MAX_DIGITS_IN_DISPLAY)
    currentNumberHasPoint = false
    setDisplay(accumulatedNumber)
  } else if (currentOperator === null && accumulatedNumber === null) {
    accumulatedNumber = currentNumber
  }
  currentOperator = newOperator
  resetCurrentNumber()
  updateEnableStatus()
  updateHighlightStatus(currentOperator)
}

const pressingEqual = () => {
  let displayValue = 0
  if (currentNumberisNull && currentOperator !== null) {
    errorType = 'Not numbers to operate'
  } else {
    if (currentOperator === null) {
      accumulatedNumber = currentNumber
    } else {
      accumulatedNumber = operate(accumulatedNumber, currentNumber, currentOperator, MAX_DIGITS_IN_DISPLAY)
      currentOperator = null
    }
    resetCurrentNumber()
    displayValue = accumulatedNumber
  }
  updateEnableStatus()
  unhighlightAllButtons(buttons)
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
  document.addEventListener('keyup', (keyPressed) => {
    if ((keyPressed.key <= 9 && keyPressed.key > 0) || keyPressed.key === '0') {
      pressingNumber(Number(keyPressed.key))
    } else {
      switch (keyPressed.key) {
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
let currentOperator
let accumulatedNumber
let currentNumberisNull
let currentNumber
let currentNumberHasPoint
let currentNumberPendingZeros
let errorType

reset()
getEventsListenersButtons()
getEventsListenersKeyboard()

//  Mirar si updateButtonsStatus es pot posar al final de algo? (al set display)
//  Moure crida a la funció format number to display?