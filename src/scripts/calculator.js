const MAX_DIGITS_IN_DISPLAY = 10
const display = document.querySelector('div[name="display"] span')

let currentValue = '0'
let previousValue
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
  firstOperand = undefined
  result = undefined
  setDisplay(currentValue)
  changeButtonState(true, 'zero')
  changeButtonState(true, 'negate')
}

const appendNumber = (value) => {
  let onlyDigits = currentValue.replace('.', '')
  onlyDigits = onlyDigits.replace('-', '')

  const digitCount = onlyDigits.length

  if (currentValue == '0') {
    currentValue = ''
  }
  if (digitCount < MAX_DIGITS_IN_DISPLAY) {
    currentValue += value.toString()
  }

  if (digitCount == MAX_DIGITS_IN_DISPLAY -1) {
    disableNumbersAndPointButton()
  } else {
  changeButtonState(false, 'zero')
  }
  changeButtonState(false, 'negate')

  return currentValue
}

const appendPoint = () => {
  if (!currentValue.includes('.') && (currentValue.length < MAX_DIGITS_IN_DISPLAY)) {
    currentValue += '.'
    return currentValue
  }
}

const setNegation = () => {
  let hasPoint = false
  const value = parseFloat(currentValue)

  if (currentValue.endsWith('.')) {
    hasPoint = true
  }

  if ((currentValue != 0)) {
    currentValue = (value * -1).toString()
    if (hasPoint) {
      currentValue += '.'
    }
  }

  return currentValue
}

const changeButtonState = (state, name) => {
  document.getElementsByName(name)[0].disabled = state;
  return
}

const changeStateAllButtons = (state) => {
  const arrButtons = ['clean', 'negate', 'divide', 'seven', 'eight', 'nine', 'multiply', 'four', 'five', 'six', 'subtract', 'one', 'two', 'three', 'sum', 'zero', 'point', 'equal']
  arrButtons.forEach(button => {
    document.getElementsByName(button)[0].disabled = state;
  });
}

const disableNumbersAndPointButton = () => {
  const arrButtons = ['seven', 'eight', 'nine', 'four', 'five', 'six', 'one', 'two', 'three', 'zero', 'point']
  arrButtons.forEach(button => {
    document.getElementsByName(button)[0].disabled = true;
  });
}

// NUMBER BUTTONS
document.getElementsByName('zero')[0].addEventListener('click', () => {
  appendNumber(0)
  setDisplay(currentValue)
})

document.getElementsByName('one')[0].addEventListener('click', () => {
  appendNumber(1)
  setDisplay(currentValue)
})

document.getElementsByName('two')[0].addEventListener('click', () => {
  appendNumber(2)
  setDisplay(currentValue)
})

document.getElementsByName('three')[0].addEventListener('click', () => {
  appendNumber(3)
  setDisplay(currentValue)
})

document.getElementsByName('four')[0].addEventListener('click', () => {
  appendNumber(4)
  setDisplay(currentValue)
})

document.getElementsByName('five')[0].addEventListener('click', () => {
  appendNumber(5)
  setDisplay(currentValue)
})

document.getElementsByName('six')[0].addEventListener('click', () => {
  appendNumber(6)
  setDisplay(currentValue)
})

document.getElementsByName('seven')[0].addEventListener('click', () => {
  appendNumber(7)
  setDisplay(currentValue)
})

document.getElementsByName('eight')[0].addEventListener('click', () => {
  appendNumber(8)
  setDisplay(currentValue)
})

document.getElementsByName('nine')[0].addEventListener('click', () => {
  appendNumber(9)
  setDisplay(currentValue)
})

// OTHER BUTTONS
document.getElementsByName('point')[0].addEventListener('click', () => {
  appendPoint()
  setDisplay(currentValue)
})

document.getElementsByName('negate')[0].addEventListener('click', () => {
  setNegation()
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
    appendNumber(Number(key))
    setDisplay(currentValue)
  }
  if (key === ',') {
    appendPoint()
    setDisplay(currentValue)
  }
  if (key === 'Escape') {
    totalReset()
  }
  if (key === 'Control') {
    setNegation()
    setDisplay(currentValue)
  }
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

  if (operator == undefined) {
    currentValue = currentValue.replace('.', '')
    setDisplay(currentValue)
    return
  }
  if (secondOperand === '0' || secondOperand === undefined) {
    setDisplay('ERROR')
    return
  }
  if (result != undefined) {
    firstOperand = result
    isResultUsed = true
  }
  isOperatorClicked = false
  result = calculate(firstOperand, secondOperand, operator)
  reset()
  setDisplay(result)
  isOperandEntered = false

  changeStateAllButtons(false)
})


const handleOperand = () => {
  if (firstOperand == undefined || firstOperand == 0 || isResultUsed) {
    firstOperand = currentValue
    isResultUsed = false
  }
  isOperandEntered = true
}

const handleOperation = () => {
  if (isOperatorClicked && isOperandEntered && currentValue !== '0') {
    result = calculate(firstOperand, currentValue, operator)
    reset()
    setDisplay(result)
    firstOperand = result
    isOperandEntered = false
  } else {
    handleOperand()
    isOperatorClicked = true
  }
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
