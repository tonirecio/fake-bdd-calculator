const MAX_DIGITS_IN_DISPLAY = 10
const MAX_NUMBER = 9999999999
const MIN_NUMBER = -9999999999

let isPoint = false
let operator = ''
let lastNumberWrited = 0
let storedNumber = ''
let addDecimal = false
let doOperation = false
let isEqualsPressed = false
let doMultipleOperations = false
let negateNumberWhenEquals = false

const setDisplay = (value) => {
  display.innerHTML = value
}

const getDisplay = () => {
  const num = display.innerHTML.replace(',', '.')

  return num
}

const reset = () => {
  setDisplay(0)
  isPoint = false
  operator = ''
  lastNumberWrited = 0
  storedNumber = ''
  addDecimal = false
  doOperation = false
  isEqualsPressed = false
}

const addNumber = (num) => {
  let toDisplay

  if (doOperation) {
    lastNumberWrited = 0

    doOperation = false
    doMultipleOperations = true
  }

  if ((lastNumberWrited === 0 || isEqualsPressed) && !addDecimal) {
    toDisplay = num.toString()
    lastNumberWrited = num

    isEqualsPressed = false
  } else if (maxLenght(lastNumberWrited)) {
    toDisplay = '' + lastNumberWrited
  } else {
    toDisplay = '' + lastNumberWrited + num

    if (addDecimal) {
      lastNumberWrited = lastNumberWrited + '.' + num

      toDisplay = '' + lastNumberWrited

      addDecimal = false
    } else {
      lastNumberWrited = '' + lastNumberWrited + num
    }
  }
  toDisplay = toDisplay.replace('.', ',')

  return toDisplay
}

const maxLenght = (num) => {
  let string = num.toString()
  string = string.replace('-', '')
  string = string.replace('.', '')

  if (string.length >= MAX_DIGITS_IN_DISPLAY) {
    return true
  } else {
    return false
  }
}

const addPoint = () => {
  if (!isPoint && !maxLenght(lastNumberWrited)) {
    isPoint = true
    addDecimal = true

    return lastNumberWrited + ','
  } else {
    return lastNumberWrited.toString().replace('.', ',')
  }
}

const negateNumber = (screen) => {
  let toDisplay = screen

  if (!screen.includes('-')) {
    if (screen !== '0' && screen !== '0.') {
      toDisplay = '-' + screen

      lastNumberWrited = lastNumberWrited * -1
    }
  } else {
    toDisplay = screen.replace('-', '')

    lastNumberWrited = lastNumberWrited * -1
  }

  return toDisplay.replace('.', ',')
}

const prepareForOperation = () => {
  doOperation = true
  isPoint = false
  storedNumber = '' + lastNumberWrited
  lastNumberWrited = 0
}

const operate = (num1, operation, num2) => {
  let toDisplay

  isEqualsPressed = true

  if (!negateNumberWhenEquals) {
    if (num1 !== 0 && num2 !== 0) {
      switch (operation) {
        case '+':
          lastNumberWrited = num1 + num2
          break
        case '-':
          lastNumberWrited = num1 - num2
          break
        case '*':
          lastNumberWrited = num1 * num2
          break
        case '/':
          lastNumberWrited = num1 / num2
          break
      }

      if (maxLenght(lastNumberWrited)) {
        if (checkLimits(lastNumberWrited)) {
          return 'ERROR'
        } else {
          const decimals = MAX_DIGITS_IN_DISPLAY - getEnterNum(lastNumberWrited)
          toDisplay = '' + (lastNumberWrited.toFixed(decimals) * 1)

          lastNumberWrited = Number(toDisplay)
        }
      } else {
        toDisplay = '' + lastNumberWrited
      }
    } else {
      toDisplay = 'ERROR'
    }
  }

  return toDisplay
}

const getEnterNum = (num) => {
  let string = num.toString()
  string = string.split('.')

  return string[0].length
}

const checkLimits = (num) => {
  if (num > MAX_NUMBER) {
    return true
  } else if (num < MIN_NUMBER) {
    return true
  } else {
    return false
  }
}

const display = document.querySelector('div[name="display"] span')

const addButtons = () => {
  document.getElementsByName('one')[0].addEventListener('click', () => {
    const text = addNumber(1)

    setDisplay(text)
  })

  document.getElementsByName('two')[0].addEventListener('click', () => {
    const text = addNumber(2)

    setDisplay(text)
  })

  document.getElementsByName('three')[0].addEventListener('click', () => {
    const text = addNumber(3)

    setDisplay(text)
  })

  document.getElementsByName('four')[0].addEventListener('click', () => {
    const text = addNumber(4)

    setDisplay(text)
  })

  document.getElementsByName('five')[0].addEventListener('click', () => {
    const text = addNumber(5)

    setDisplay(text)
  })

  document.getElementsByName('six')[0].addEventListener('click', () => {
    const text = addNumber(6)

    setDisplay(text)
  })

  document.getElementsByName('seven')[0].addEventListener('click', () => {
    const text = addNumber(7)

    setDisplay(text)
  })

  document.getElementsByName('eight')[0].addEventListener('click', () => {
    const text = addNumber(8)

    setDisplay(text)
  })

  document.getElementsByName('nine')[0].addEventListener('click', () => {
    const text = addNumber(9)

    setDisplay(text)
  })

  document.getElementsByName('zero')[0].addEventListener('click', () => {
    const text = addNumber(0)

    setDisplay(text)
  })

  document.getElementsByName('clean')[0].addEventListener('click', () => {
    reset()
  })

  document.getElementsByName('point')[0].addEventListener('click', () => {
    const text = addPoint()

    setDisplay(text)
  })

  document.getElementsByName('negate')[0].addEventListener('click', () => {
    const text = negateNumber(getDisplay())

    setDisplay(text)
  })

  document.getElementsByName('sum')[0].addEventListener('click', () => {
    if (doMultipleOperations && !isEqualsPressed) {
      lastNumberWrited = operate(Number(storedNumber), operator, Number(lastNumberWrited))

      doMultipleOperations = false
    }

    if (!doOperation) {
      prepareForOperation()
    }

    operator = '+'
  })

  document.getElementsByName('subtract')[0].addEventListener('click', () => {
    if (lastNumberWrited === 0 && !doOperation) {
      negateNumberWhenEquals = true
    } else if (doMultipleOperations && !isEqualsPressed) {
      lastNumberWrited = operate(Number(storedNumber), operator, Number(lastNumberWrited))

      doMultipleOperations = false
    }

    if (!doOperation) {
      prepareForOperation()
    }

    operator = '-'
  })

  document.getElementsByName('multiply')[0].addEventListener('click', () => {
    if (doMultipleOperations && !isEqualsPressed) {
      lastNumberWrited = operate(Number(storedNumber), operator, Number(lastNumberWrited))

      doMultipleOperations = false
    }

    if (!doOperation) {
      prepareForOperation()
    }

    operator = '*'
  })

  document.getElementsByName('divide')[0].addEventListener('click', () => {
    if (doMultipleOperations && !isEqualsPressed) {
      lastNumberWrited = operate(Number(storedNumber), operator, Number(lastNumberWrited))

      doMultipleOperations = false
    }

    if (!doOperation) {
      prepareForOperation()
    }

    operator = '/'
  })

  document.getElementsByName('equal')[0].addEventListener('click', () => {
    let text

    if (negateNumberWhenEquals) {
      text = negateNumber(lastNumberWrited.toString())
    } else if (operator === '') {
      text = lastNumberWrited.toString().replace('.', ',')
    } else if (lastNumberWrited === '') {
      text = opertionWithoutTwoNumbers(Number(storedNumber), operator).replace('.', ',')
    } else {
      text = operate(Number(storedNumber), operator, Number(lastNumberWrited)).replace('.', ',')
    }
    setDisplay(text)
  })
}

const opertionWithoutTwoNumbers = (num, operator) => {
  if (operator === '+') {
    return 'ERROR'
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key >= 0 && event.key <= 9) {
    const text = addNumber(event.key)

    setDisplay(text)
  } else if (event.key === ',') {
    const text = addPoint()

    setDisplay(text)
  } else if (event.key === 'Control') {
    const text = negateNumber(getDisplay())

    setDisplay(text)
  } else if (event.key === 'Escape') {
    reset()
  }
})

reset()
addButtons()
