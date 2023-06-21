const MAX_DIGITS_IN_DISPLAY = 10

const lenNumber = (number) => {
  let stringNumber = String(number)
  stringNumber = stringNumber.replace('-', '')
  stringNumber = stringNumber.replace('.', '')
  return (stringNumber.length)
}

const round = (number) => {
  const maxDecimals = MAX_DIGITS_IN_DISPLAY - lenNumber(Math.round(number))
  number = number.toFixed(maxDecimals) * 1
  return (number)
}

const getDisplay = () => {
  const num = display.innerHTML
  return (Number(num.replace(',', '.')))
}

const setDisplay = (value) => {
  let displayValue
  if (value === 'ERROR') {
    displayValue = value
  } else {
    value = round(value)
    displayValue = String(value).replace('.', ',')
    if (point && !displayValue.includes(',')) {
      displayValue = displayValue.concat(',')
    }
  }

  display.innerHTML = displayValue
}

const reset = () => {
  operator = false
  accumulated = false
  newNumber = true
  point = false
  setDisplay(0)
}

const addNum = (value) => {
  const number = getDisplay()
  value = Number(value)
  if ((number === 0 && !point) || newNumber) {
    setDisplay(value)
  } else {
    if (lenNumber(number) < MAX_DIGITS_IN_DISPLAY) {
      let result
      if (point) {
        const numDecimals = lenNumber(number) - lenNumber(Math.round(number)) + 1
        result = number + (value * (Math.pow(0.1, numDecimals)))
      } else {
        result = number * 10 + value
      }
      setDisplay(Number(result))
    }
  }
  newNumber = false
}

const negateNum = () => {
  const number = getDisplay()
  if (number !== 0) {
    setDisplay(number * -1)
  }
}

const addPoint = () => {
  const number = getDisplay()
  if (!point && lenNumber(number) < MAX_DIGITS_IN_DISPLAY) {
    point = true
    setDisplay(number)
  }
}

const addOperation = (operation) => {
  if (operator !== false && !newNumber) {
    accumulated = operate()
  } else {
    accumulated = getDisplay()
  }
  operator = operation
  newNumber = true
  point = false
}

const operate = () => {
  if (newNumber) {
    setDisplay('ERROR')
    return
  }
  const number = getDisplay()
  let result
  switch (operator) {
    case '+':
      result = accumulated + number
      break
    case '-':
      result = accumulated - number
      break
    case '*':
      result = accumulated * number
      break
    case '/':
      if (number === 0) {
        result = 'ERROR'
      } else {
        result = accumulated / number
      }
      break
  }
  point = false
  if (result === 'ERROR' || lenNumber(Math.round(result)) > MAX_DIGITS_IN_DISPLAY) {
    setDisplay('ERROR')
  } else {
    setDisplay(result)
  }
  newNumber = true
  operator = false
  return (result)
}

// Buttons events

const buttons = document.getElementsByName('keypad')[0].getElementsByTagName('button')
const listeners = (buttons) => {
  for (const button of buttons) {
    button.addEventListener('click', () => {
      if (!isNaN(button.innerHTML)) {
        addNum(button.innerHTML)
      } else {
        if (button.innerHTML === 'C') {
          reset()
        } else if (button.innerHTML === ',') {
          addPoint()
        } else if (button.name === 'negate') {
          negateNum()
        } else if (button.name === 'divide') {
          addOperation('/')
        } else if (button.name === 'multiply') {
          addOperation('*')
        } else if (button.name === 'subtract') {
          addOperation('-')
        } else if (button.name === 'sum') {
          addOperation('+')
        } else if (button.name === 'equal') {
          operate()
        }
      }
    })
  }
}

// Keys events

document.addEventListener('keyup', (key) => {
  if (!isNaN(key.key)) {
    addNum(key.key)
  } else {
    if (key.key === 'Control') {
      negateNum()
    } else if (key.key === 'Escape') {
      reset()
    } else if (key.key === ',') {
      addPoint()
    } else if (key.key === '-') {
      addOperation('-')
    } else if (key.key === '+') {
      addOperation('+')
    } else if (key.key === '*') {
      addOperation('*')
    } else if (key.key === '/') {
      addOperation('/')
    }
  }
})

const display = document.querySelector('div[name="display"] span')
let operator = false
let accumulated = false
let newNumber = true
let point = false

reset()
listeners(buttons)
