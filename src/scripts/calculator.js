const MAX_DIGITS_IN_DISPLAY = 10
const display = document.querySelector('div[name="display"] span')

let currentValue = '0'
let previousValue
let isResult
let result

const setDisplay = (currentValue) => {
  displayValue = currentValue.replace('.', ',')
  display.innerHTML = displayValue
}

const reset = () => {
  previousValue = currentValue
  currentValue = '0'
  setDisplay(currentValue)
}

const appendNumber = (value) => {
  let onlyDigits = currentValue.replace('.', '')
  onlyDigits = onlyDigits.replace('-', '')

  console.log(onlyDigits)
  const digitCount = onlyDigits.length
  console.log(digitCount)

  if (digitCount >= MAX_DIGITS_IN_DISPLAY) {
    return
  }

  if (currentValue == '0') {
    currentValue = value.toString()
  } else {
    currentValue += value.toString()
  }

  return currentValue
}

const appendPoint = () => {
  if (!currentValue.includes('.') && (currentValue.length < MAX_DIGITS_IN_DISPLAY)) {
    currentValue += '.'
    console.log(currentValue)
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
  reset()
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
    reset()
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
  operator = '+'
  handleOperand()
  reset()
})
// Subtract
document.getElementsByName('subtract')[0].addEventListener('click', () => {
  operator = '-'
  handleOperand()
  reset()
})
// Multiply
document.getElementsByName('multiply')[0].addEventListener('click', () => {
  operator = '*'
  handleOperand()
  reset()
})
// Divide
document.getElementsByName('divide')[0].addEventListener('click', () => {
  operator = '/'
  handleOperand()
  reset()
})

// Modify the event listener for the equal button
document.getElementsByName('equal')[0].addEventListener('click', () => {
  const secondOperand = currentValue
  result = calculate(firstOperand, secondOperand, operator)

  isResult = true
  reset()
  setDisplay(result)
})

const handleOperand = () => {
  if (firstOperand == undefined) {
    firstOperand = currentValue
  }
  if (isResult == true) {
    firstOperand = result
    isResult = false
  }
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

  result = result.toString()

  return result
}

// // Modify the event listener for the click event after a result
// if (isResult) {
//   document.addEventListener('click', () => {
//     reset();
//     isResult = false;
//   })
// }

// // Equal
// document.getElementsByName('equal')[0].addEventListener('click', () => {
//   const secondOperand = parseFloat(currentValue.replace(',', '.'));
//   calculate();
//   isResult = true;
// })
