const display = document.querySelector('div[name="display"] span')
const MAX_DIGITS_IN_DISPLAY = 10
const MAX_NUMBER = 9999999999
const MIN_NUMBER = -9999999999

let isPoint = false
let operator = ''
let lastNumberWrited = ''
let storedNumber = ''
let addDecimal = false
let doOperation = false
let isEqualsPressed = false
let doMultipleOperations = false
let negateNumberWhenEquals = false

const setDisplay = (value) => {
  display.innerHTML = value
}

const reset = () => {
  setDisplay(0)
  isPoint = false
  operator = ''
  lastNumberWrited = ''
  storedNumber = ''
  addDecimal = false
  doOperation = false
  isEqualsPressed = false
  doMultipleOperations = false
  negateNumberWhenEquals = false

  enableAllButtons()
  enableDissableButton('negate', true)
  enableDissableButton('zero', true)
  enableDissableButton('point', false)
}

const addNumber = (num) => {
  enableAllButtons()
  let toDisplay

  if (doOperation) {
    lastNumberWrited = ''

    doOperation = false
    doMultipleOperations = true
  }

  if ((lastNumberWrited === '' || isEqualsPressed) && !addDecimal) {
    toDisplay = num.toString()
    lastNumberWrited = num

    isEqualsPressed = false
  } else if (maxLenght(lastNumberWrited)) {
    toDisplay = '' + lastNumberWrited
  } else {
    toDisplay = '' + lastNumberWrited + num

    if (addDecimal) {
      if (lastNumberWrited === '') {
        lastNumberWrited = 0
      }

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

const addNumberAndDisplay = (num) => {
  const text = addNumber(num)

  if (maxLenght(lastNumberWrited)) {
    disableNumberButtons()
    enableDissableButton('point', true)
  }

  setDisplay(text)
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

    if (lastNumberWrited !== '') {
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
  storedNumber = '' + lastNumberWrited
  lastNumberWrited = ''
}

const operate = (num1, operation, num2) => {
  const numberToOperate1 = Number(num1)
  const numberToOperate2 = Number(num2)

  let toDisplay

  isEqualsPressed = true

  if (!negateNumberWhenEquals) {

    if (num1 !== '' || num2 !== '') {
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
            lastNumberWrited = 'ERROR'
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

const opertionWithoutTwoNumbers = (operator) => {
  if (operator === '+') {
    return 'ERROR'
  }
}

const prepareAndOperateIfSecondOperation = (op) => {
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
  } else if (operator === '') {
    if (lastNumberWrited === '') {
      lastNumberWrited = 0
    }

    enableAllButtons()

    text = lastNumberWrited.toString().replace('.', ',')
    enableDissableButton('point', false)
  } else if (lastNumberWrited === '') {
    text = opertionWithoutTwoNumbers(operator).replace('.', ',')
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
  })

  document.getElementsByName('point')[0].addEventListener('click', () => {
    const text = addPoint()

    enableDissableButton('point', true)

    setDisplay(text)
  })

  document.getElementsByName('negate')[0].addEventListener('click', () => {
    const text = negateActualNumber(lastNumberWrited.toString())

    setDisplay(text)
  })

  document.getElementsByName('sum')[0].addEventListener('click', () => {
    prepareAndOperateIfSecondOperation('+')
  })

  document.getElementsByName('subtract')[0].addEventListener('click', () => {
    if (lastNumberWrited === '' && !doOperation) {
      negateNumberWhenEquals = true
    }

    prepareAndOperateIfSecondOperation('-')
  })

  document.getElementsByName('multiply')[0].addEventListener('click', () => {
    prepareAndOperateIfSecondOperation('*')
  })

  document.getElementsByName('divide')[0].addEventListener('click', () => {
    prepareAndOperateIfSecondOperation('/')
  })

  document.getElementsByName('equal')[0].addEventListener('click', () => {
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
