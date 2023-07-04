const MAX_DIGITS_IN_DISPLAY = 10
const display = document.querySelector('div[name="display"] span')

let currentValue = '0'
let result
let isResultUsed = false
let isOperatorClicked = false
let isOperandEntered = false

const setDisplay = (currentValue) => {
  displayValue = currentValue.replace('.', ',')
  display.innerHTML = displayValue
}

const reset = () => {
  currentValue = '0'
  operator = null
  setDisplay(currentValue)
}

const totalReset = () => {
  currentValue = '0'
  previousValue = '0'
  firstOperand = null
  result = null
  setDisplay(currentValue)
  changeStateAllButtons(false)
  changeButtonState(true, 'zero')
  changeButtonState(true, 'negate')
}

const addNumberToCurrentValue = (value) => {
  let onlyDigits = currentValue.replace('.', '')
  onlyDigits = onlyDigits.replace('-', '')

  const digitCount = onlyDigits.length

  if (currentValue == '0') {
    currentValue = ''
  }
  if (digitCount < MAX_DIGITS_IN_DISPLAY) {
    currentValue += value.toString()
  }

  if (digitCount == MAX_DIGITS_IN_DISPLAY - 1) {
    disableNumbersAndPointButton()
  } else {
    changeButtonState(false, 'zero')
  }
  changeButtonState(false, 'negate')

  return currentValue
}

const addPointToCurrentValue = () => {
  if (!currentValue.includes('.') && (currentValue.length < MAX_DIGITS_IN_DISPLAY)) {
    currentValue += '.'
    changeButtonState(true, 'point')
    changeButtonState(false, 'zero')
    return currentValue
  }
}

const negateCurrentValue = () => {
  const hasPoint = currentValue.endsWith('.')
  const valueToNumber = parseFloat(currentValue)

  if ((currentValue != 0)) {
    currentValue = (valueToNumber * -1).toString()
    if (hasPoint) {
      currentValue += '.'
    }
  }

  return currentValue
}

const changeButtonState = (state, name) => {
  document.getElementsByName(name)[0].disabled = state
}

const changeStateAllButtons = (state) => {
  const arrButtons = ['clean', 'negate', 'divide', 'seven', 'eight', 'nine', 'multiply', 'four', 'five', 'six', 'subtract', 'one', 'two', 'three', 'sum', 'zero', 'point', 'equal']
  arrButtons.forEach(button => {
    document.getElementsByName(button)[0].disabled = state
  })
}

const disableNumbersAndPointButton = () => {
  const arrButtons = ['seven', 'eight', 'nine', 'four', 'five', 'six', 'one', 'two', 'three', 'zero', 'point']
  arrButtons.forEach(button => {
    document.getElementsByName(button)[0].disabled = true
  })
}

// NUMBER BUTTONS
document.getElementsByName('zero')[0].addEventListener('click', () => {
  addNumberToCurrentValue(0)
  setDisplay(currentValue)
})

document.getElementsByName('one')[0].addEventListener('click', () => {
  addNumberToCurrentValue(1)
  setDisplay(currentValue)
})

document.getElementsByName('two')[0].addEventListener('click', () => {
  addNumberToCurrentValue(2)
  setDisplay(currentValue)
})

document.getElementsByName('three')[0].addEventListener('click', () => {
  addNumberToCurrentValue(3)
  setDisplay(currentValue)
})

document.getElementsByName('four')[0].addEventListener('click', () => {
  addNumberToCurrentValue(4)
  setDisplay(currentValue)
})

document.getElementsByName('five')[0].addEventListener('click', () => {
  addNumberToCurrentValue(5)
  setDisplay(currentValue)
})

document.getElementsByName('six')[0].addEventListener('click', () => {
  addNumberToCurrentValue(6)
  setDisplay(currentValue)
})

document.getElementsByName('seven')[0].addEventListener('click', () => {
  addNumberToCurrentValue(7)
  setDisplay(currentValue)
})

document.getElementsByName('eight')[0].addEventListener('click', () => {
  addNumberToCurrentValue(8)
  setDisplay(currentValue)
})

document.getElementsByName('nine')[0].addEventListener('click', () => {
  addNumberToCurrentValue(9)
  setDisplay(currentValue)
})

// OTHER BUTTONS
document.getElementsByName('point')[0].addEventListener('click', () => {
  addPointToCurrentValue()
  setDisplay(currentValue)
})

document.getElementsByName('negate')[0].addEventListener('click', () => {
  negateCurrentValue()
  setDisplay(currentValue)
})

document.getElementsByName('clean')[0].addEventListener('click', () => {
  totalReset()
})

// BUTTONS IN KEYS
document.addEventListener('keydown', (event) => {
  const key = event.key

  console.log(key)
  if (/[0-9]/.test(key)) {
    addNumberToCurrentValue(Number(key))
    setDisplay(currentValue)
  }
  if (key === ',') {
    addPointToCurrentValue()
    setDisplay(currentValue)
  }
  if (key === 'Escape') {
    totalReset()
  }
  if (key === 'Control') {
    negateCurrentValue()
    setDisplay(currentValue)
  }
})

const highlightOperationButtons = (value) => {
  const currentButton = document.getElementsByName(value)[0]
  const arrButtons = ['sum', 'multiply', 'divide', 'subtract']

  // Remove highlighted class from all buttons
  arrButtons.forEach(buttonName => {
    const button = document.getElementsByName(buttonName)[0]
    button.classList.remove('highlighted')
  })

  // Add highlighted class to clicked button
  currentButton.classList.add('highlighted')
}

// Highlighting buttons
document.getElementsByName('sum')[0].addEventListener('click', () => {
  const value = 'sum'
  highlightOperationButtons(value)
})

document.getElementsByName('subtract')[0].addEventListener('click', () => {
  const value = 'subtract'
  highlightOperationButtons(value)
})

document.getElementsByName('multiply')[0].addEventListener('click', () => {
  const value = 'multiply'
  highlightOperationButtons(value)
})

document.getElementsByName('divide')[0].addEventListener('click', () => {
  const value = 'divide'
  highlightOperationButtons(value)
})

let firstOperand, secondOperand, operator
// OPERATIONS
// Sum
document.getElementsByName('sum')[0].addEventListener('click', () => {
  handleOperation()
  operator = '+'
  changeButtonState(true, 'negate')
})
// Subtract
document.getElementsByName('subtract')[0].addEventListener('click', () => {
  handleOperation()
  operator = '-'
  changeButtonState(true, 'negate')
})
// Multiply
document.getElementsByName('multiply')[0].addEventListener('click', () => {
  handleOperation()
  operator = '*'
  changeButtonState(true, 'negate')
})
// Divide
document.getElementsByName('divide')[0].addEventListener('click', () => {
  handleOperation()
  operator = '/'
  changeButtonState(true, 'negate')
})

document.getElementsByName('equal')[0].addEventListener('click', () => {
  const secondOperand = currentValue

  changeStateAllButtons(false)

  if (operator == null) {
    currentValue = currentValue.replace('.', '')
    setDisplay(currentValue)
    return
  }
  if (secondOperand === '0' || secondOperand === null) {
    setDisplay('ERROR')
    changeStateAllButtons(true)
    changeButtonState(false, 'clean')
    return
  }
  if (result != null) {
    firstOperand = result
    isResultUsed = true
  }
  isOperatorClicked = false
  result = calculate(firstOperand, secondOperand, operator)
  reset()
  setDisplay(result)
  isOperandEntered = false
})

const handleOperation = () => {
  if (firstOperand == null || firstOperand == 0 || isResultUsed) {
    firstOperand = currentValue
    isResultUsed = false
  }

  if (isOperatorClicked && isOperandEntered && currentValue !== '0') {
    result = calculate(firstOperand, currentValue, operator)
    firstOperand = result
    reset()
    setDisplay(result)
    isOperandEntered = false
  } else {
    isOperandEntered = true
  }

  isOperatorClicked = true
  changeStateAllButtons(false)
  currentValue = '0'
}

const calculate = (firstOperand, secondOperand, operator) => {
  let resultLength
  firstOperand = parseFloat(firstOperand)
  secondOperand = parseFloat(secondOperand)

  if (operator == '+') {
    result = firstOperand + secondOperand
  } else if (operator == '-') {
    result = firstOperand - secondOperand
  } else if (operator == '*') {
    result = firstOperand * secondOperand
  } else {
    result = firstOperand / secondOperand
  }

  resultLength = result.toString().replace('.', '').length

  if ((resultLength > MAX_DIGITS_IN_DISPLAY)) {
    result = result.toPrecision(MAX_DIGITS_IN_DISPLAY)
  }

  result = parseFloat(result.toString())

  if (!result.toString().includes('.') && resultLength > MAX_DIGITS_IN_DISPLAY) {
    result = 'ERROR'
  }

  if (operator == '/' && secondOperand == '0') {
    result = 'ERROR'
  }

  result = result.toString()

  return result
}
