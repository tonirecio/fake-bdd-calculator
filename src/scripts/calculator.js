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
  value = round(value)
  let displayValue = String(value).replace('.', ',')
  if (point && !displayValue.includes(',')) {
    displayValue = displayValue.concat(',')
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
      let newNumber
      if (point) {
        const numDecimals = lenNumber(number) - lenNumber(Math.round(number)) + 1
        newNumber = number + (value * (Math.pow(0.1,numDecimals)))
      } else {
        newNumber = number * 10 + value
      }
      setDisplay(Number(newNumber))
    }
  }
  newNumber = false
}

const negateNum = () => {
  let number = getDisplay()
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
  operator = operation
  newNumber = true
  point = false
  accumulated = getDisplay()
}

const operate = () => {
  let number = getDisplay()
  let result
  console.log(accumulated)
  console.log(operator)
  console.log(number)
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
      result = accumulated / number
      break
  }
  console.log(result)
  setDisplay(result)
  operator = false
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
    }
  }
})

const display = document.querySelector('div[name="display"] span')
var operator = false
var accumulated = false
var newNumber = true
var point = false

reset()
listeners(buttons)
