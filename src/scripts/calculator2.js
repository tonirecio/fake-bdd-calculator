const MAX_DIGITS_IN_DISPLAY = 10

const display = document.querySelector('div[name="display"] span')

let countDigits = 0
let currentValue = 0
let pastValue = 0
let decimalPlacement = 1
let isPointUsedWithoutDecimal = false
let decimalSymbolUsage = false
let operandSymbolInUse = ''
let operationResult = 0


document.getElementsByName('zero')[0].addEventListener('click', () => {appendNumber(0)})
document.getElementsByName('one')[0].addEventListener('click', () => {appendNumber(1)})
document.getElementsByName('two')[0].addEventListener('click', () => {appendNumber(2)})
document.getElementsByName('three')[0].addEventListener('click', () => {appendNumber(3)})
document.getElementsByName('four')[0].addEventListener('click', () => {appendNumber(4)})
document.getElementsByName('five')[0].addEventListener('click', () => {appendNumber(5)})
document.getElementsByName('six')[0].addEventListener('click', () => {appendNumber(6)})
document.getElementsByName('seven')[0].addEventListener('click', () => {appendNumber(7)})
document.getElementsByName('eight')[0].addEventListener('click', () => {appendNumber(8)})
document.getElementsByName('nine')[0].addEventListener('click', () => {appendNumber(9)})



v


const appendNumber  = (numberValue) => {
    if (decimalSymbolUsage) {
        currentValue = appendDecimalNumbers(currentValue, numberValue)
    } else {
        currentValue = appendIntegerNumbers(currentValue, numberValue)
    }
}





const updateDisplay = (value) => {
  value = value.toString().replace('.', ',')
  display.innerHTML = value
}

const negate = (operand) => {
  //operand = operand * -1
  return -operand
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

const unhighlightOperatorButtons = () => {
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
      currentValue = 0
      unhighlightOperatorButtons()
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
        //disableButton('point')
        disablingOrEnablingAllButtonsWithExeceptions(false, 'point')
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

const disablingOrEnablingAllButtonsWithExeceptions = (areAllButtonsDisabled, exceptions) => {
  keypadButtons.forEach(keypadButton => {
    let buttonName = keypadButton.getAttribute('name')
    if (areAllButtonsDisabled) {
      if (exceptions.includes(buttonName)) {
        keypadButton.disabled = false
      } else {
        keypadButton.disabled = true
      }
    } else {
      if (exceptions.includes(buttonName)) {
        keypadButton.disabled = true
      } else {
        keypadButton.disabled = false
      }
    } 
  })
}

keypadButtons.forEach(keypadButton => {
  keypadButton.addEventListener('click', () => {
    let buttonName = keypadButton.getAttribute('name')
    if (countDigits < MAX_DIGITS_IN_DISPLAY) {
      if (numberButtons.includes(buttonName)) {
        // Focalizar la logica de enable & disable
        disablingOrEnablingAllButtonsWithExeceptions(false, '') 
        numberValue = getNumberValue(buttonName)
        if (!decimalSymbolUsage) {
          currentValue = appendIntegerNumbers(currentValue, numberValue)
        } else {
          isPointUsedWithoutDecimal = false
          currentValue = appendDecimalNumbers(currentValue, numberValue)
          disablingOrEnablingAllButtonsWithExeceptions(false, 'point')
        }
        countDigits++
        updateDisplay(currentValue)
        if (countDigits === MAX_DIGITS_IN_DISPLAY) {
          enablingAllButtonsExcept(numberButtons + ['point'])
        }
      }
    } else {
      window.alert('Maximum digit capacity reached')
    }

    if (nonOperatorNonNumberButtons.includes(buttonName)) {
      currentValue = nonOperatorNonNumberActions(currentValue, buttonName)
    } else if (operatorButtons.includes(buttonName)) {
      disablingOrEnablingAllButtonsWithExeceptions(false, 'negate')      
      if (operandSymbolInUse === '') {   
        pastValue = saveAndResetcurrentValue(currentValue)
        updateDisplay(pastValue)
      } else {       
        if (currentValue !== 0) {
          operationResult = performOperation(pastValue, currentValue, operandSymbolInUse)
          pastValue = operationResult
        }
      }
      operandSymbolInUse = operatorButtonPressed(buttonName)
    } else if (buttonName === 'equal') {
      if (operandSymbolInUse !== '') {
        operationResult = performOperation(pastValue, currentValue, operandSymbolInUse)
        if (isOperationResultOverLength(operationResult) || resultErrors.includes(operationResult.toString()) || operationResult === pastValue) {
          enablingAllButtonsExcept(operatorButtons + numberButtons + ['negate', 'point', 'equal'])
          updateDisplay('ERROR')
        } else {
          updateDisplay(operationResult)
          pastValue = operationResult
        }
      } else {
        updateDisplay(currentValue)
        disablingOrEnablingAllButtonsWithExeceptions(false, '')  
      }
      unhighlightOperatorButtons()
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
      unhighlightOperatorButtons()
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
  }
  reset()
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

const countIntegersFromNumber = (operationResult) => {
  operationResult = operationResult.toString()
  operationResult = operationResult.substring(0, operationResult.indexOf('.'))
  const integerCount = operationResult.length
  return integerCount
}

const roundNumber = (operationResult) => {
  const integerCount = countIntegersFromNumber(operationResult)
  operationResult = Math.round(operationResult * Math.pow(10, 10 - integerCount)) / Math.pow(10, 10 - integerCount)
  console.log(typeof operationResult)
  return operationResult
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
  //integerCount = countIntegersFromNumber(operationResult, integerCount)
  operationResult = roundNumber(operationResult)
  reset()
  return operationResult
}

// [Scenario] Performing two number operations with a result number with more than 10 nondecimal digits

const isOperationResultOverLength = (operationResult) => {
  let resultString = operationResult.toString().replace('.', '')
  return (!resultString.includes('.') && resultString.length > MAX_DIGITS_IN_DISPLAY)
}

// [Scenario] Doing a new operation (line 279)

// [Scenario] Using the previous result in a new operation (line 172)

// [Scenario] Using previous result in new operation easier (line 166-176)

// [Scenario] Division with 0 (line 139, 178)

// [Scenario] Doing an operation without a second number (line 14, 28, 169, 184, 241)

// [Scenario] Doing an operation without a first number (the 271 line const alreasy does the job of changing the sign of the value)

// [Scenario] Showing the first number after pressing operation (line 167)

// [Scenario] Using the Equals button without operation (line 183-184)
