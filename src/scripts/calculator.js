const display = document.querySelector('div[name="display"] span')
const MAX_DIGITS_IN_DISPLAY = 10
const MAX_NUMBER = 9999999999
const MIN_NUMBER = -9999999999

let isPoint = false
let operator = null
let lastNumberWrited = null
let storedNumber = null
let addDecimal = false
let doOperation = false
let isEqualsPressed = false
let doMultipleOperations = false
let negateNumberWhenEquals = false
let pendingZeros = 0

const setDisplay = (value) => {
  display.innerHTML = value
}

const getDisplay = () => {
  return display.innerHTML.replace(',', '.')
}

const reset = () => {
  setDisplay(0)
  isPoint = false
  operator = null
  lastNumberWrited = null
  storedNumber = null
  addDecimal = false
  doOperation = false
  isEqualsPressed = false
  doMultipleOperations = false
  negateNumberWhenEquals = false
  pendingZeros = 0

  enableAllButtons()
  enableDissableButton('negate', true)
  enableDissableButton('point', false)
}

const addNumber = (num) => {
  enableAllButtons()
  let toDisplay

  if (!doOperation && isEqualsPressed) {
    reset()
  }

  if (doOperation) {
    lastNumberWrited = null

    doOperation = false
    doMultipleOperations = true
  }

  if ((lastNumberWrited === null || lastNumberWrited === 0 || isEqualsPressed) && !addDecimal) {
    toDisplay = num.toString()
    lastNumberWrited = num

    isEqualsPressed = false
  } else if (maxLenght(lastNumberWrited)) {
    toDisplay = '' + lastNumberWrited
  } else {
    if (lastNumberWrited === null) {
      lastNumberWrited = 0
    }

    if (num === 0) {
      pendingZeros++

      toDisplay = showPendingZeros()
    } else {
      lastNumberWrited = addPendingZeros(num)

      toDisplay = '' + lastNumberWrited

      addDecimal = false
    }
  }
  toDisplay = toDisplay.replace('.', ',')

  return toDisplay
}

const showPendingZeros = () => {
  let text

  if (addDecimal) {
    text = lastNumberWrited + '.'
  } else {
    text = lastNumberWrited
  }

  for (let index = 0; index < pendingZeros; index++) {
    text += '0'
  }

  return text
}

const addPendingZeros = (num) => {
  pendingZeros = 0

  if (num !== null) {
    return Number(getDisplay() + num)
  }
  else {
    return Number(getDisplay())
  }
}

const addNumberAndDisplay = (num) => {
  const text = addNumber(num)

  if (maxLenght(lastNumberWrited)) {
    disableNumberButtons()
    enableDissableButton('point', true)
  }

  setDisplay(text)
}

const maxLenght = (num) => {
  let string

  if (num != null) {
    string = num.toString()
  } else {
    string = '0'
  }
  string = string.replace('-', '')
  string = string.replace('.', '')

  if ((string.length + pendingZeros) >= MAX_DIGITS_IN_DISPLAY) {
    return true
  } else {
    return false
  }
}

const addPoint = () => {
  lastNumberWrited = addPendingZeros(null)

  if (!isPoint && !maxLenght(lastNumberWrited)) {
    isPoint = true
    addDecimal = true

    if (lastNumberWrited !== null) {
      return lastNumberWrited + ','
    } else {
      return 0 + ','
    }
  } else {
    return lastNumberWrited.toString().replace('.', ',')
  }
}

const negateActualNumber = (num) => {
  let toDisplay = num

  if (!num.includes('-')) {
    if (num !== '0') {
      toDisplay = '-' + num

      lastNumberWrited = num * -1
    }
  } else {
    toDisplay = num.replace('-', '')

    lastNumberWrited = num * -1
  }

  if (addDecimal) {
    toDisplay += '.'
  }

  return toDisplay.replace('.', ',')
}

const prepareForOperation = () => {
  doOperation = true
  isPoint = false
  storedNumber = lastNumberWrited
  lastNumberWrited = null
}

const operate = (num1, operation, num2) => {
  const numberToOperate1 = Number(num1)
  const numberToOperate2 = Number(num2)

  let toDisplay

  isEqualsPressed = true

  if (!negateNumberWhenEquals) {
    if (num1 !== null || num2 !== null) {
      switch (operation) {
        case '+':
          lastNumberWrited = numberToOperate1 + numberToOperate2
          break
        case '-':
          lastNumberWrited = numberToOperate1 - numberToOperate2
          break
        case '*':
          lastNumberWrited = numberToOperate1 * numberToOperate2
          break
        case '/':
          if (numberToOperate1 === 0 || numberToOperate2 === 0) {
            return 'ERROR'
          } else {
            lastNumberWrited = numberToOperate1 / numberToOperate2
          }
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

const opertionWithoutTwoNumbers = () => {
  return 'ERROR'
}

const prepareAndOperateIfSecondOperation = (op) => {
  lastNumberWrited = addPendingZeros(null)

  if (doMultipleOperations && !isEqualsPressed) {
    lastNumberWrited = operate(storedNumber, operator, lastNumberWrited)

    doMultipleOperations = false
  }

  if (!doOperation) {
    prepareForOperation()
  }

  operator = op

  enableAllButtons()
  enableDissableButton('negate', true)
  enableDissableButton('point', false)
}

const operateAndDisplay = () => {
  let text

  if (negateNumberWhenEquals) {
    text = negateActualNumber(lastNumberWrited.toString())
  } else if (operator === null) {
    if (lastNumberWrited === null) {
      lastNumberWrited = 0
    }

    enableAllButtons()

    text = lastNumberWrited.toString().replace('.', ',')
    enableDissableButton('point', false)
  } else if (lastNumberWrited === null) {
    text = opertionWithoutTwoNumbers()
  } else {
    text = operate(storedNumber, operator, lastNumberWrited).replace('.', ',')

    if (text === 'ERROR') {
      disableAllButtons()
    }
  }
  setDisplay(text)
}

const enableDissableButton = (name, value) => {
  const element = document.getElementsByName(name)[0]
  element.disabled = value
}

const enableAllButtons = () => {
  const array = document.querySelector('div[name="keypad"]').getElementsByTagName('button')

  for (let index = 0; index < array.length; index++) {
    const element = array[index]

    if (element.name !== 'point') {
      element.disabled = false
    }
  }
}

const disableAllButtons = () => {
  const array = document.querySelector('div[name="keypad"]').getElementsByTagName('button')

  for (let index = 0; index < array.length; index++) {
    const element = array[index]

    if (element.name !== 'clean') {
      element.disabled = true
    }
  }
}

const disableNumberButtons = () => {
  enableDissableButton('one', true)
  enableDissableButton('two', true)
  enableDissableButton('three', true)
  enableDissableButton('four', true)
  enableDissableButton('five', true)
  enableDissableButton('six', true)
  enableDissableButton('seven', true)
  enableDissableButton('eight', true)
  enableDissableButton('nine', true)
  enableDissableButton('zero', true)
}

const addButtons = () => {
  document.getElementsByName('one')[0].addEventListener('click', () => {
    addNumberAndDisplay(1)
  })

  document.getElementsByName('two')[0].addEventListener('click', () => {
    addNumberAndDisplay(2)
  })

  document.getElementsByName('three')[0].addEventListener('click', () => {
    addNumberAndDisplay(3)
  })

  document.getElementsByName('four')[0].addEventListener('click', () => {
    addNumberAndDisplay(4)
  })

  document.getElementsByName('five')[0].addEventListener('click', () => {
    addNumberAndDisplay(5)
  })

  document.getElementsByName('six')[0].addEventListener('click', () => {
    addNumberAndDisplay(6)
  })

  document.getElementsByName('seven')[0].addEventListener('click', () => {
    addNumberAndDisplay(7)
  })

  document.getElementsByName('eight')[0].addEventListener('click', () => {
    addNumberAndDisplay(8)
  })

  document.getElementsByName('nine')[0].addEventListener('click', () => {
    addNumberAndDisplay(9)
  })

  document.getElementsByName('zero')[0].addEventListener('click', () => {
    addNumberAndDisplay(0)
  })

  document.getElementsByName('clean')[0].addEventListener('click', () => {
    reset()
    enableDissableButton('zero', true)
  })

  document.getElementsByName('point')[0].addEventListener('click', () => {
    const text = addPoint()

    enableDissableButton('point', true)

    setDisplay(text)
  })

  document.getElementsByName('negate')[0].addEventListener('click', () => {
    lastNumberWrited = addPendingZeros(null)

    const text = negateActualNumber(lastNumberWrited.toString())

    setDisplay(text)
  })

  document.getElementsByName('sum')[0].addEventListener('click', () => {
    prepareAndOperateIfSecondOperation('+')
  })

  document.getElementsByName('subtract')[0].addEventListener('click', () => {
    prepareAndOperateIfSecondOperation('-')
  })

  document.getElementsByName('multiply')[0].addEventListener('click', () => {
    prepareAndOperateIfSecondOperation('*')
  })

  document.getElementsByName('divide')[0].addEventListener('click', () => {
    prepareAndOperateIfSecondOperation('/')
  })

  document.getElementsByName('equal')[0].addEventListener('click', () => {
    if (lastNumberWrited !== null) {
      lastNumberWrited = addPendingZeros(null)
    }
    operateAndDisplay()
  })
}

document.addEventListener('keydown', (event) => {
  if (event.key >= 0 && event.key <= 9) {
    addNumberAndDisplay(event.key)
  } else if (event.key === ',') {
    const text = addPoint()

    setDisplay(text)
  } else if (event.key === 'Control') {
    const text = negateActualNumber(lastNumberWrited.toString())

    setDisplay(text)
  } else if (event.key === 'Escape') {
    reset()
  }
})

reset()
addButtons()
