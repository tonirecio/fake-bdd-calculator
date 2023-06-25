const MAX_DIGITS_IN_DISPLAY = 10

let countDigits = 0
// [Scenario] Writing numbers
let decimalSymbolUsage = false
/* --------------------------- */
const display = document.querySelector('div[name="display"] span')

let currentOperand = 0
let pastOperand = 0
let decimalPlacement = 1
let isPointUsedWithoutDecimal = false
let operandSymbolInUse = ''

const updateDisplay = (value) => {
  const valueWithComas = ''
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
      if (decimalSymbolUsage) {
        window.alert('Cant use more than one point')
      } else {
        decimalSymbolUsage = true
        isPointUsedWithoutDecimal = true
        updateDisplay(currentOperand + ',')
      }
      break
    default:
      window.alert('Uknown Button')
      break
  }
  return currentOperand
}

let numberValue = 0
const nonOperatorNonNumberButtons = ['clean', 'negate', 'point']
const numberButtons = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const nonOperatorButtons = document.querySelectorAll('div[name="keypad"] button')

nonOperatorButtons.forEach(nonOperatorButton => {
  nonOperatorButton.addEventListener('click', () => {
    let buttonName = nonOperatorButton.getAttribute('name')
    if (countDigits < MAX_DIGITS_IN_DISPLAY || buttonName === 'clean' || buttonName === 'negate') {
      if (numberButtons.includes(buttonName) && !decimalSymbolUsage) {
        numberValue = getNumber(buttonName)
        currentOperand = appendIntegerNumbers(currentOperand, numberValue)
        countDigits++
        updateDisplay(currentOperand)
      } else if (nonOperatorNonNumberButtons.includes(buttonName)) {
        currentOperand = nonOperatorNonNumberActions(currentOperand, buttonName)
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
  })
})

// [Scenario] Pressing non-operators keys
//const nonDigitKeys = ['/', '*', '-', '+']

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