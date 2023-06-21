const MAX_DIGITS_IN_DISPLAY = 10
let currentOperation = null
let previousOperand = 0
let currentOperand = null
let overrideDisplay = false

const displayedNumber = () => {
  const formattedDisplay = display.innerHTML.replace(',', '.')
  return Number(formattedDisplay)
}

const setDisplay = (value) => {
  value = value.toString().replace('.', ',')
  display.innerHTML = value
}

const reset = () => {
  previousOperand = 0
  currentOperand = null
  currentOperation = null
  setDisplay(0)
}

const negate = () => {
  if (display.innerHTML !== '0' && display.innerHTML !== '0,') {
    if (display.innerHTML[0] === '-') {
      display.innerHTML = display.innerHTML.substring(1)
    } else {
      display.innerHTML = '-' + display.innerHTML
    }
  }
}

const append = (content) => {
  if (getDigitNumber(displayedNumber()) < MAX_DIGITS_IN_DISPLAY) {
    setDisplay(display.innerHTML + content.toString())
  }
}

const getDigitNumber = (number) => {
  return number.toString().replace('.', '').length
}

const writeNumber = (button) => {
  if (display.innerHTML === '0' || overrideDisplay) {
    overrideDisplay = false
    setDisplay(button.innerHTML)
  } else {
    append(button.innerHTML)
  }
}

const performOperation = () => {
  if (currentOperation !== null && !overrideDisplay) {
    currentOperand = displayedNumber()
  }
  let result = 'ERROR'
  if (currentOperand === null) {
    result = 'ERROR'
  }
  if (currentOperation === 'sum') {
    result = previousOperand + currentOperand
  } else if (currentOperation === 'subtract') {
    result = previousOperand - currentOperand
  } else if (currentOperation === 'multiply') {
    result = previousOperand * currentOperand
  } else if (currentOperation === 'divide') {
    result = previousOperand / currentOperand
  } else {
    result = displayedNumber()
  }
  result = formatResult(result)
  setDisplay(result)
  overrideDisplay = true
}

const formatResult = (result) => {
  if (Math.abs(result) >= Math.pow(10, MAX_DIGITS_IN_DISPLAY)) result = 'ERROR'
  if (result !== 'ERROR') {
    if (getDigitNumber(result) > MAX_DIGITS_IN_DISPLAY) {
      const integerPartDigits = parseInt(result.toString()).toString().length
      result = 1 * result.toFixed(MAX_DIGITS_IN_DISPLAY - integerPartDigits)
    }
  }
  return result
}

const display = document.querySelector('div[name="display"] span')
reset()

// Button handling
const buttons = document.querySelectorAll('div[name="keypad"] button')

buttons.forEach(button => {
  if (!isNaN(button.innerHTML)) {
    button.addEventListener('click', () => {
      writeNumber(button)
    })
  } else {
    switch (button.getAttribute('name')) {
      case 'point':
        button.addEventListener('click', () => {
          if (!display.innerHTML.includes(button.innerHTML)) {
            append(button.innerHTML)
          }
        })
        break

      case 'clean':
        button.addEventListener('click', reset)
        break

      case 'negate':
        button.addEventListener('click', negate)
        break

      case 'equal':
        button.addEventListener('click', performOperation)
        break

      default:
        button.addEventListener('click', () => {
          currentOperation = button.getAttribute('name')
          previousOperand = displayedNumber()
          overrideDisplay = true
        })
    }
  }
})

// Keyboard handling
document.addEventListener('keydown', (event) => {
  const name = event.key
  if (!isNaN(name)) {
    if (display.innerHTML === '0') {
      setDisplay(name)
    } else {
      append(name)
    }
  } else {
    if (name === ',') {
      if (!display.innerHTML.includes(',')) { append(',') }
    } else if (name === 'Escape') {
      reset()
    } else if (name === 'Control') {
      negate()
    }
  }
})
