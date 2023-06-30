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

  enableAllButtonsLessPoint()
  enableDissableButton('negate', true)
  enableDissableButton('point', false)
}

const addNumber = (num) => {
  let toDisplay
  let text = ''

  enableAllButtonsLessPoint()

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
      lastNumberWrited = addPendingZerosAndNum(num)

      toDisplay = '' + lastNumberWrited

      addDecimal = false
    }
  }

  text = '' + lastNumberWrited

  if (text.includes('e')) {
    lastNumberWrited = numberWithExponential(text)

    toDisplay = lastNumberWrited
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

  for (let x = 0; x < pendingZeros; x++) {
    text += '0'
  }

  return text
}

const addPendingZerosAndNum = (num) => {
  pendingZeros = 0

  if (num !== null) {
    return Number(getDisplay() + num)
  } else {
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

const numberWithExponential = (text) => {
  const zeros = text.split('e')
  let num = '0.'
  let numbers

  for (let x = zeros[1]; x < -1; x++) {
    num = num + '0'
  }

  if (zeros[0].includes('.')) {
    numbers = zeros[0].split('.')

    num = '' + num + numbers[0] + numbers[1]
  } else {
    num = '' + num + zeros[0]
  }

  return num
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
  lastNumberWrited = addPendingZerosAndNum(null)

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

const negateNumber = (num) => {
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

const prepareAndOperateIfSecondOperation = (op) => {
  lastNumberWrited = addPendingZerosAndNum(null)

  if (doMultipleOperations && !isEqualsPressed) {
    lastNumberWrited = operate(storedNumber, operator, lastNumberWrited)

    doMultipleOperations = false
  }

  if (!doOperation) {
    prepareForOperation()
  }
  operator = op

  enableAllButtonsLessPoint()
  enableDissableButton('negate', true)
  enableDissableButton('point', false)
}

const operateAndDisplay = () => {
  let text

  if (negateNumberWhenEquals) {
    text = negateNumber(lastNumberWrited.toString())
  } else if (operator === null) {
    if (lastNumberWrited === null) {
      lastNumberWrited = 0
    }
    text = lastNumberWrited.toString().replace('.', ',')

    enableAllButtonsLessPoint()
    enableDissableButton('point', false)
  } else if (lastNumberWrited === null) {
    text = 'ERROR'
  } else {
    text = operate(storedNumber, operator, lastNumberWrited).replace('.', ',')

    if (text === 'ERROR') {
      disableAllButtonsLessClean()
    }
  }
  setDisplay(text)
}

const enableDissableButton = (name, value) => {
  const element = document.getElementsByName(name)[0]
  element.disabled = value
}

const enableAllButtonsLessPoint = () => {
  const array = document.querySelector('div[name="keypad"]').getElementsByTagName('button')

  for (let x = 0; x < array.length; x++) {
    const element = array[x]

    if (element.name !== 'point') {
      element.disabled = false
    }
  }
}

const disableAllButtonsLessClean = () => {
  const array = document.querySelector('div[name="keypad"]').getElementsByTagName('button')

  for (let x = 0; x < array.length; x++) {
    const element = array[x]

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
    lastNumberWrited = addPendingZerosAndNum(null)

    const text = negateNumber(lastNumberWrited.toString())

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
      lastNumberWrited = addPendingZerosAndNum(null)
    }

    operateAndDisplay()
  })
}

const addKeys = () => {
  document.addEventListener('keydown', (event) => {
    event.preventDefault()

    if (event.key >= 0 && event.key <= 9 && event.key !== ' ') {
      addNumberAndDisplay(Number(event.key))
    } else if (event.key === ',') {
      const text = addPoint()

      enableDissableButton('point', true)

      setDisplay(text)
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
      prepareAndOperateIfSecondOperation(event.key)
    } else if (event.key === 'Control') {
      const text = negateNumber(lastNumberWrited.toString())

      setDisplay(text)
    } else if (event.key === 'Escape') {
      reset()
    } else if (event.key === 'Enter') {
      document.getElementsByName('equal')[0].click()
    }
  })
}

reset()
addButtons()
addKeys()
