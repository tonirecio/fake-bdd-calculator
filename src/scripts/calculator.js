const MAX_DIGITS_IN_DISPLAY = 10

const display = document.querySelector('div[name="display"] span')

let countDigits = 0
let currentValue = 0
let pastValue = 0
let numberValue = 0
let decimalPlacement = 1
let isPointUsedWithoutDecimal = false
let decimalSymbolUsage = false
let operandSymbolInUse = ''
let operationResult = 0
let integerCount = 0

const updateDisplay = (value) => {
  value = value.toString().replace('.', ',')
  display.innerHTML = value
}

const negate = (operand) => {
  operand = operand * -1
  return operand
}

const highlightButton = (buttonName) => {
  document.getElementsByName(buttonName)[0].classList.add('highlighted')
}

const unhighlightButton = (buttonName) => {
  document.getElementsByName(buttonName)[0].classList.remove('highlighted')
}

const highlightOperatorButton = (buttonName) => {
  for (let i = 0; i < operatorButtons.length; i++) {
    if (buttonName === operatorButtons[i]) {
      highlightButton(buttonName)
    } else {
      unhighlightButton(operatorButtons[i])
    }
  }
}

const unhighlightOeratorButtons = () => {
  for (let i = 0; i < operatorButtons.length; i++) {
    unhighlightButton(operatorButtons[i])
  }
}

const assignOperatorButtonToOperatorKey = (keyPressed, buttonName) => {
  switch (keyPressed) {
    case '/':
      buttonName = 'divide'
      break
    case '*':
      buttonName = 'multiply'
      break
    case '+':
      buttonName = 'sum'
      break
    case '-':
      buttonName = 'subtract'
      break
    default:
      break
  }
  return buttonName
}

// [Scenario] Pressing non-operators screen buttons
const getNumberValue = (buttonName) => {
  let numberValue = 0
  switch (buttonName) {
    case 'zero':
      numberValue = 0
      break
    case 'one':
      numberValue = 1
      break
    case 'two':
      numberValue = 2
      break
    case 'three':
      numberValue = 3
      break
    case 'four':
      numberValue = 4
      break
    case 'five':
      numberValue = 5
      break
    case 'six':
      numberValue = 6
      break
    case 'seven':
      numberValue = 7
      break
    case 'eight':
      numberValue = 8
      break
    case 'nine':
      numberValue = 9
      break
    default:
      window.alert('ERROR')
      break
  }
  return numberValue
}

const appendIntegerNumbers = (currentValue, numberValue) => {
  if (currentValue < 0) {
    currentValue = currentValue * 10 - numberValue
  } else {
    currentValue = currentValue * 10 + numberValue
  }
  return currentValue
}

const appendDecimalNumbers = (currentValue, number) => {
  if (currentValue < 0) {
    currentValue -= number.toFixed(decimalPlacement) * (Math.pow(0.1, decimalPlacement)).toFixed(decimalPlacement)
  } else {
    currentValue += number.toFixed(decimalPlacement) * (Math.pow(0.1, decimalPlacement)).toFixed(decimalPlacement)
  }
  currentValue = parseFloat(currentValue.toFixed(decimalPlacement))
  decimalPlacement++
  return currentValue
}

const reset = () => {
  updateDisplay(0)
  countDigits = 0
  currentValue = 0
  decimalPlacement = 1
  decimalSymbolUsage = false
  isPointUsedWithoutDecimal = false
  operandSymbolInUse = ''
}

const nonOperatorNonNumberActions = (currentValue, buttonName) => {
  switch (buttonName) {
    case 'clean':
      enablingAllButtonsExcept(['zero', 'negate'])
      reset()
      unhighlightOeratorButtons()
      break
    case 'negate':
      currentValue = negate(currentValue)
      if (isPointUsedWithoutDecimal) {
        updateDisplay(currentValue + ',')
      } else {
        updateDisplay(currentValue)
      }
      break
    case 'point':
      if (countDigits < MAX_DIGITS_IN_DISPLAY) {
        decimalSymbolUsage = true
        isPointUsedWithoutDecimal = true
        updateDisplay(currentValue + ',')
        disableButton('point')
      } else {
        window.alert('Maximum digit capacity reached')
      }
      break
    default:
      window.alert('Uknown Button')
      break
  }
  return currentValue
}

const nonOperatorNonNumberButtons = ['clean', 'negate', 'point']
const numberButtons = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const operatorButtons = ['divide', 'multiply', 'subtract', 'sum']
const operatorKeys = ['/', '*', '-', '+']
const resultErrors = ['Infinity', '-Infinity', 'NaN']
const keypadButtons = document.querySelectorAll('div[name="keypad"] button')

const enablingAllButtonsExcept = (exceptions) => {
  keypadButtons.forEach(keypadButton => {
    let buttonName = keypadButton.getAttribute('name')
    if (exceptions.includes(buttonName)) {
      keypadButton.disabled = true
    } else {
      keypadButton.disabled = false
    }
  })
}

const disableButton = (buttonName) => {
  document.getElementsByName(buttonName)[0].disabled = true
}

const enableButton = (buttonName) => {
  document.getElementsByName(buttonName)[0].disabled = false
}

keypadButtons.forEach(keypadButton => {
  keypadButton.addEventListener('click', () => {
    let buttonName = keypadButton.getAttribute('name')
    if (countDigits < MAX_DIGITS_IN_DISPLAY) {
      if (numberButtons.includes(buttonName) && !decimalSymbolUsage) {
        enableButton('negate')
        enableButton('zero')
        numberValue = getNumberValue(buttonName)
        currentValue = appendIntegerNumbers(currentValue, numberValue)
        countDigits++
        updateDisplay(currentValue)
      } else if (numberButtons.includes(buttonName) && decimalSymbolUsage) {
        enableButton('negate')
        isPointUsedWithoutDecimal = false
        numberValue = getNumberValue(buttonName)
        currentValue = appendDecimalNumbers(currentValue, numberValue)
        countDigits++
        updateDisplay(currentValue)
      }
      if (countDigits === MAX_DIGITS_IN_DISPLAY) {
        enablingAllButtonsExcept(numberButtons + ['point'])
      }
    } else {
      window.alert('Maximum digit capacity reached')
    }

    if (nonOperatorNonNumberButtons.includes(buttonName)) {
      currentValue = nonOperatorNonNumberActions(currentValue, buttonName)
    } else if (operatorButtons.includes(buttonName) && operandSymbolInUse === '') {
      enablingAllButtonsExcept('negate')
      pastValue = saveAndResetcurrentValue(currentValue)
      operandSymbolInUse = operatorButtonPressed(buttonName)
      updateDisplay(pastValue)
    } else if (operatorButtons.includes(buttonName) && operandSymbolInUse !== '') {
      enablingAllButtonsExcept('negate')
      if (currentValue !== 0) {
        operationResult = performOperation(pastValue, currentValue, operandSymbolInUse)
        pastValue = operationResult
      }
      operandSymbolInUse = operatorButtonPressed(buttonName)
    } else if (buttonName === 'equal' && operandSymbolInUse !== '') {
      operationResult = performOperation(pastValue, currentValue, operandSymbolInUse)
      if (isOperationResultOverLength(operationResult) || resultErrors.includes(operationResult.toString()) || operationResult === pastValue) {
        enablingAllButtonsExcept(operatorButtons + numberButtons + ['negate', 'point', 'equal'])
        updateDisplay('ERROR')
      } else {
        updateDisplay(operationResult)
        pastValue = operationResult
        enablingAllButtonsExcept('')
      }
      unhighlightOeratorButtons()
    } else if (buttonName === 'equal' && operandSymbolInUse === '') {
      updateDisplay(currentValue)
      enablingAllButtonsExcept('')
      unhighlightOeratorButtons()
    }
  })
})

// [Scenario] Pressing non-operators keys

document.addEventListener('keydown', (event) => {
  let keyPressed = event.key
  if (countDigits < MAX_DIGITS_IN_DISPLAY || keyPressed === 'Control' || keyPressed === 'Escape') {
    if (keyPressed >= 0 && keyPressed <= 9 && !decimalSymbolUsage) {
      keyPressed = parseFloat(keyPressed)
      currentValue = appendIntegerNumbers(currentValue, keyPressed)
      countDigits++
      updateDisplay(currentValue)
    } else if (keyPressed >= 0 && keyPressed <= 9 && decimalSymbolUsage) {
      isPointUsedWithoutDecimal = false
      keyPressed = parseFloat(keyPressed)
      currentValue = appendDecimalNumbers(currentValue, keyPressed)
      countDigits++
      updateDisplay(currentValue)
    } else if (keyPressed === ',') {
      if (decimalSymbolUsage) {
        window.alert('Cant use more than one point')
      } else {
        decimalSymbolUsage = true
        isPointUsedWithoutDecimal = true
        updateDisplay(currentValue + ',')
      }
    } else if (keyPressed === 'Escape') {
      reset()
      unhighlightOeratorButtons()
    } else if (keyPressed === 'Control') {
      currentValue = negate(currentValue)
      if (isPointUsedWithoutDecimal) {
        updateDisplay(currentValue + ',')
      } else {
        updateDisplay(currentValue)
      }
    }
  } else {
    window.alert('Maximum digit capacity reached')
  }

  if (operatorKeys.includes(keyPressed)) {
    operatorKeyPressed(keyPressed)
  }
})

// [Scenario] Writing numbers

// Modificaciones al existente codigo

// [Scenario] Writing number more than 10 digits

// [Scenario] Performing two number operations
const saveAndResetcurrentValue = (currentValue) => {
  if (currentValue !== 0) {
    pastValue = currentValue
    reset()
  } else {
    reset()
  }
  return pastValue
}

const operatorKeyPressed = (keyPressed, buttonName) => {
  buttonName = assignOperatorButtonToOperatorKey(keyPressed)
  operatorButtonPressed(buttonName)
}

const operatorButtonPressed = (buttonName) => {
  switch (buttonName) {
    case 'divide':
      operandSymbolInUse = '/'
      break
    case 'multiply':
      operandSymbolInUse = '*'
      break
    case 'sum':
      operandSymbolInUse = '+'
      break
    case 'subtract':
      operandSymbolInUse = '-'
      break
    default:
      window.alert('ERROR')
      break
  }
  highlightOperatorButton(buttonName)
  return operandSymbolInUse
}

const countIntegersFromNumber = (number, integerCount) => {
  number = number.toString()
  number = number.substring(0, number.indexOf('.'))
  integerCount = number.length
  return integerCount
}

const roundNumber = (number, integerCount) => {
  number = Math.round(number * Math.pow(10, 10 - integerCount)) / Math.pow(10, 10 - integerCount)
  return number
}

const performOperation = (pastValue, currentValue, operandSymbolInUse) => {
  switch (operandSymbolInUse) {
    case '/':
      operationResult = pastValue / currentValue
      break
    case '*':
      operationResult = pastValue * currentValue
      break
    case '+':
      operationResult = pastValue + currentValue
      break
    case '-':
      operationResult = pastValue - currentValue
      break
    default:
      window.alert('ERROR')
      break
  }
  integerCount = countIntegersFromNumber(operationResult, integerCount)
  operationResult = roundNumber(operationResult, integerCount)
  reset()
  return operationResult
}

// [Scenario] Performing two number operations with a result number with more than 10 nondecimal digits

const isOperationResultOverLength = (operationResult) => {
  let resultString = operationResult.toString()
  if (resultString.includes('.') && resultString.length > MAX_DIGITS_IN_DISPLAY + 1) {
    return true
  } else if (!resultString.includes('.') && resultString.length > MAX_DIGITS_IN_DISPLAY) {
    return true
  } else {
    return false
  }
}

// [Scenario] Doing a new operation (line 279)

// [Scenario] Using the previous result in a new operation (line 172)

// [Scenario] Using previous result in new operation easier (line 166-176)

// [Scenario] Division with 0 (line 139, 178)

// [Scenario] Doing an operation without a second number (line 14, 28, 169, 184, 241)

// [Scenario] Doing an operation without a first number (the 271 line const alreasy does the job of changing the sign of the value)

// [Scenario] Showing the first number after pressing operation (line 167)

// [Scenario] Using the Equals button without operation (line 183-184)
