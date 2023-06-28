const MAX_DIGITS_IN_DISPLAY = 10
const display = document.querySelector('div[name="display"] span')

let currentValue = '0'
let previousValue = null
let result = null
let isResultUsed = false
let isOperatorClicked = false
let isOperandEntered = false

const setDisplay = (value) => {
  const displayValue = value.replace('.', ',')
  display.innerHTML = displayValue
}

const reset = () => {
  currentValue = '0'
  setDisplay(currentValue)
}

const totalReset = () => {
  currentValue = '0'
  previousValue = null
  result = null
  setDisplay(currentValue)
}

// NUMBER BUTTONS
for (let i = 0; i <= 9; i++) {
  document.getElementsByName(i.toString())[0].addEventListener('click', () => {
    appendNumber(i)
    setDisplay(currentValue)
  })
}

// OTHER BUTTONS
document.getElementsByName('point')[0].addEventListener('click', () => {
  appendPoint()
  setDisplay(currentValue)
})

document.getElementsByName('negate')[0].addEventListener('click', () => {
  setNegation()
  setDisplay(currentValue)
})

document.getElementsByName('clean')[0].addEventListener('click', totalReset)

// BUTTONS IN KEYS
document.addEventListener('keydown', (event) => {
  const key = event.key

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

let firstOperand = null
let secondOperand = null
let operator = null

// OPERATIONS
const operations = {
  sum: '+',
  subtract: '-',
  multiply: '*',
  divide: '/'
}

for (const operation in operations) {
  document.getElementsByName(operation)[0].addEventListener('click', () => {
    handleOperation()
    operator = operations[operation]
  })
}

document.getElementsByName('equal')[0].addEventListener('click', () => {
  secondOperand = currentValue
  if (result !== null) {
    firstOperand = result
    isResultUsed = true
  }
  isOperatorClicked = false
  result = calculate(firstOperand, secondOperand, operator)
  reset()
  setDisplay(result)

  isOperandEntered = false
})

const handleOperand = () => {
  if (firstOperand === null || firstOperand === '0' || isResultUsed) {
    firstOperand = currentValue
    isResultUsed = false
  }
  isOperandEntered = true
}

const handleOperation = () => {
  if (isOperatorClicked && isOperandEntered) {
    result = calculate(firstOperand, currentValue, operator)
    reset()
    setDisplay(result)
    firstOperand = result
    isOperandEntered = false
  } else {
    handleOperand()
    isOperatorClicked = true
  }
  reset()
}

const calculate = (firstOperand, secondOperand, operator) => {
  let resultLength
  firstOperand = parseFloat(firstOperand)
  secondOperand = parseFloat(secondOperand)

  switch (operator) {
    case '+':
      result = firstOperand + secondOperand
      break
    case '-':
      result = firstOperand - secondOperand
      break
    case '*':
      result = firstOperand * secondOperand
      break
    case '/':
      if (secondOperand === 0) {
        return 'ERROR'
      }
      result = firstOperand / secondOperand
      break
    default:
      return 'ERROR'
  }

  resultLength = result.toString().replace('.', '').length

  if (resultLength > MAX_DIGITS_IN_DISPLAY) {
    result = result.toPrecision(MAX_DIGITS_IN_DISPLAY)
  }

  result = parseFloat(result.toString())

  if (!result.toString().includes('.') && resultLength > MAX_DIGITS_IN_DISPLAY) {
    result = 'ERROR'
  }

  return result.toString()
}
