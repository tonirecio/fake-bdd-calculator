const MAX_DIGITS_IN_DISPLAY = 10

let countDigits = 0
// [Scenario] Writing numbers
let decimalSymbolUsage = false
/* --------------------------- */
const display = document.querySelector('div[name="display"] span')

let currentOperand = 0
let pastOperand = 0
let numberValue = 0
let decimalPlacement = 1
let isPointUsedWithoutDecimal = false
let operandSymbolInUse = ''
let operationResult = 0
let integerCount = 0

const updateDisplay = (value) => {
  let valueWithComas = ''
  value = value.toString()
  valueWithComas = value.replace('.', ',')
  display.innerHTML = valueWithComas
}

const reset = () => {
  updateDisplay(0)
  countDigits = 0
  currentOperand = 0
  decimalSymbolUsage = false
  decimalPlacement = 1
  isPointUsedWithoutDecimal = false
}

const negate = (operand) => {
  operand = operand * -1
  return operand
}

reset()

document.getElementsByName('clean')[0].addEventListener('click', () => {
  reset()
})

// [Scenario] Pressing non-operators screen buttons
const getNumber = (buttonName) => {
  let numberValue
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
      window.alert('Not a usable number')
      break
  }
  return numberValue
}

const appendIntegerNumbers = (currentOperand, number) => {
  currentOperand = currentOperand * 10 + number
  return currentOperand
}

const appendDecimalNumbers = (currentOperand, number) => {
  console.log(decimalPlacement)
  if (currentOperand < 0) {
    currentOperand -= number.toFixed(decimalPlacement) * (Math.pow(0.1, decimalPlacement)).toFixed(decimalPlacement)
  } else {
    currentOperand += number.toFixed(decimalPlacement) * (Math.pow(0.1, decimalPlacement)).toFixed(decimalPlacement)
  }
  currentOperand = parseFloat(currentOperand.toFixed(decimalPlacement))
  decimalPlacement++
  return currentOperand
}

const nonOperatorNonNumberActions = (currentOperand, buttonName) => {
  switch (buttonName) {
    case 'clean':
      reset()
      break
    case 'negate':
      currentOperand = negate(currentOperand)
      if (isPointUsedWithoutDecimal) {
        updateDisplay(currentOperand + ',')
      } else {
        updateDisplay(currentOperand)
      }
      break
    case 'point':
      if (countDigits < MAX_DIGITS_IN_DISPLAY) {
        if (decimalSymbolUsage) {
          window.alert('Cant use more than one point')
        } else {
          decimalSymbolUsage = true
          isPointUsedWithoutDecimal = true
          updateDisplay(currentOperand + ',')
        }
      } else {
        window.alert('Maximum digit capacity reached')
      }
      break
    default:
      window.alert('Uknown Button')
      break
  }
  return currentOperand
}

const nonOperatorNonNumberButtons = ['clean', 'negate', 'point']
const numberButtons = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const operatorButtons = ['divide', 'multiply', 'subtract', 'sum']
const nonOperatorButtons = document.querySelectorAll('div[name="keypad"] button')

nonOperatorButtons.forEach(nonOperatorButton => {
  nonOperatorButton.addEventListener('click', () => {
    let buttonName = nonOperatorButton.getAttribute('name')
    if (countDigits < MAX_DIGITS_IN_DISPLAY) {
      if (numberButtons.includes(buttonName) && !decimalSymbolUsage) {
        numberValue = getNumber(buttonName)
        currentOperand = appendIntegerNumbers(currentOperand, numberValue)
        countDigits++
        updateDisplay(currentOperand)
      } else if (numberButtons.includes(buttonName) && decimalSymbolUsage) {
        isPointUsedWithoutDecimal = false
        numberValue = getNumber(buttonName)
        currentOperand = appendDecimalNumbers(currentOperand, numberValue)
        countDigits++
        updateDisplay(currentOperand)
      }
    } else {
      window.alert('Maximum digit capacity reached')
    }

    if (nonOperatorNonNumberButtons.includes(buttonName)) {
      currentOperand = nonOperatorNonNumberActions(currentOperand, buttonName)
    } else if (operatorButtons.includes(buttonName) && operandSymbolInUse === '') {
      pastOperand = saveAndResetCurrentOperand(currentOperand)
      operandSymbolInUse = operatorButtonPressed(buttonName)
    } else if (operatorButtons.includes(buttonName) && operandSymbolInUse !== '') {
      if (currentOperand !== 0) {
        operationResult = performOperation(pastOperand, currentOperand, operandSymbolInUse)
        if (isOperationResultOverLength(operationResult)) {
          updateDisplay('ERROR')
        } else {
          updateDisplay(operationResult)
          pastOperand = operationResult
        }
      }
      operandSymbolInUse = operatorButtonPressed(buttonName)
    } else if (buttonName === 'equal' && operandSymbolInUse !== '') {
      operationResult = performOperation(pastOperand, currentOperand, operandSymbolInUse)
      if (isOperationResultOverLength(operationResult)) {
        updateDisplay('ERROR')
      } else {
        updateDisplay(operationResult)
        pastOperand = operationResult
      }
    } 
  })
})

// [Scenario] Pressing non-operators keys

document.addEventListener('keydown', (event) => {
  let keyPressed = event.key
  if (countDigits < MAX_DIGITS_IN_DISPLAY || keyPressed === 'Control' || keyPressed === 'Escape') {
    if (keyPressed >= 0 && keyPressed <= 9 && !decimalSymbolUsage) {
      keyPressed = parseFloat(keyPressed)
      currentOperand = appendIntegerNumbers(currentOperand, keyPressed)
      countDigits++
      updateDisplay(currentOperand)
    } else if (keyPressed >= 0 && keyPressed <= 9 && decimalSymbolUsage) {
      isPointUsedWithoutDecimal = false
      keyPressed = parseFloat(keyPressed)
      currentOperand = appendDecimalNumbers(currentOperand, keyPressed)
      countDigits++
      updateDisplay(currentOperand)
    } else if (keyPressed === ',') {
      if (decimalSymbolUsage) {
        window.alert('Cant use more than one point')
      } else {
        decimalSymbolUsage = true
        isPointUsedWithoutDecimal = true
        updateDisplay(currentOperand + ',')
      }
    } else if (keyPressed === 'Escape') {
      reset()
    } else if (keyPressed === 'Control') {
      currentOperand = negate(currentOperand)
      if (isPointUsedWithoutDecimal) {
        updateDisplay(currentOperand + ',')
      } else {
        updateDisplay(currentOperand)
      }
    } else {
      window.alert('Uknown Key')
    }
  } else {
    window.alert('Maximum digit capacity reached')
  }
})

// [Scenario] Writing numbers

// Modificaciones al existente codigo

// [Scenario] Writing number more than 10 digits

// yarn lint (detector de errores*)

// [Scenario] Performing two number operations
const saveAndResetCurrentOperand = (currentOperand) => {
  if (currentOperand !== 0) {
    pastOperand = currentOperand
    reset()
  } else {
    reset()
  }
  return pastOperand
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
  return operandSymbolInUse
}

const performOperation = (pastOperand, currentOperand, operandSymbolInUse) => {
  switch (operandSymbolInUse) {
    case '/':
      operationResult = pastOperand / currentOperand
      break
    case '*':
      operationResult = pastOperand * currentOperand
      break
    case '+':
      operationResult = pastOperand + currentOperand
      break
    case '-':
      operationResult = pastOperand - currentOperand
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

// [Scenario] Performing two number operations with a result number with more than 10 nondecimal digits

const isOperationResultOverLength = (operationResult) => {
  resultString = operationResult.toString()
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