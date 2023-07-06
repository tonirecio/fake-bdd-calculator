const display = document.querySelector('div[name="display"] span')
const buttons = document.querySelector('div[name="keypad"]').getElementsByTagName('button')
const MAX_DIGITS_IN_DISPLAY = 10
const MAX_NUMBER = 9999999999
const MIN_NUMBER = -9999999999

let operation = ''
let storedNumber = 0
let pendingZeros = 0
let lastNumberWrited = 0
let equalsPressed = false
let isPendingPoint = false
let operationPressed = false
let changeOperator = false

const setDisplay = (value) => {
  if (typeof (value) === 'string') {
    value.replace('.', ',')
  } else {
    value = value.toString().replace('.', ',')
  }

  display.innerHTML = value
}

const reset = () => {
  setDisplay(0)

  operation = ''
  lastNumberWrited = 0
  storedNumber = 0
  pendingZeros = 0
  isPendingPoint = false
  equalsPressed = false

  enableAllButtons()
  enableDissableButton('negate', true)
  enableDissableButton('point', false)
  enableDissableButton('zero', true)
}

const addNumber = (pressedNumber) => {
  if (equalsPressed) {
    equalsPressed = false

    lastNumberWrited = pressedNumber
  } else if (checkMaxLenght(lastNumberWrited)) {
    if (operationPressed) {
      operationPressed = false
    }

    if (isPendingPoint && pressedNumber !== 0 && pendingZeros === 0) {
      isPendingPoint = false

      lastNumberWrited = lastNumberWrited + (pressedNumber / 10)
    } else if (isPendingPoint && pressedNumber === 0) {
      pendingZeros++
      lastNumberWrited += ',0'
      isPendingPoint = false
    } else if (pressedNumber === 0 && lastNumberWrited % 1 !== 0) {
      pendingZeros++

      lastNumberWrited += '0'
    } else if (!numberWithDecimals(lastNumberWrited)) {
      lastNumberWrited = (lastNumberWrited * 10) + pressedNumber
    } else {
      isPendingPoint = false

      lastNumberWrited = '' + lastNumberWrited + pressedNumber
      lastNumberWrited = lastNumberWrited.replace(',', '.')
      lastNumberWrited = Number(lastNumberWrited)
    }
  } else {
    disableAllButtons()
    enableDissableButton('clean', false)
  }

  if (lastNumberWrited.toString().includes('e')) {
    lastNumberWrited = getNumberFromENumberInString(lastNumberWrited.toString())
  }

  if (!checkMaxLenght(lastNumberWrited)) {
    disableAllButtons()
    enableDissableButton('clean', false)
    enableDissableButton('sum', false)
    enableDissableButton('subtract', false)
    enableDissableButton('multiply', false)
    enableDissableButton('divide', false)
    enableDissableButton('equal', false)
  } else {
    enableDissableButton('zero', false)
  }

  return lastNumberWrited
}

const addNumberAndSetDisplay = (pressedNumber) => {
  const newNumber = addNumber(pressedNumber).toString().replace('.', ',')

  setDisplay(newNumber)
}

const checkMaxLenght = (numberToCheck) => {
  let actualNumberInString = numberToCheck.toString()

  actualNumberInString = actualNumberInString.replace(',', '')
  actualNumberInString = actualNumberInString.replace('.', '')
  actualNumberInString = actualNumberInString.replace('-', '')

  return ((actualNumberInString.length) < MAX_DIGITS_IN_DISPLAY)
}

const addPoint = () => {
  if (lastNumberWrited % 1 === 0) {
    isPendingPoint = true

    setDisplay(lastNumberWrited + ',')
  } else {
    setDisplay(lastNumberWrited)
  }
}

const getNumberFromENumberInString = (numberWithE) => {
  const numberAndPowerOf10 = numberWithE.split('e')
  const numberBeforeE = numberAndPowerOf10[0]
  const powerOf10 = numberAndPowerOf10[1]

  let numberZeroWithDecimals = '0,'

  for (let x = 0; x < (powerOf10 * -1) - 1; x++) {
    numberZeroWithDecimals += '0'
  }

  if (numberWithDecimals(numberBeforeE)) {
    const enterAndDecimalNumber = numberBeforeE.split('.')
    const enterNumber = enterAndDecimalNumber[0]
    const decimalNumber = enterAndDecimalNumber[1]

    return '' + numberZeroWithDecimals + enterNumber + decimalNumber
  } else {
    return '' + numberZeroWithDecimals + numberBeforeE
  }
}

const numberWithDecimals = (numberToCheck) => {
  return (numberToCheck % 1 !== 0)
}

const negateNumber = (actualNumber) => {
  return actualNumber * -1
}

const negateActualNumberAndDisplay = (actualNumber) => {
  lastNumberWrited = negateNumber(actualNumber)

  if (isPendingPoint) {
    setDisplay(lastNumberWrited + ',')
  } else {
    setDisplay(lastNumberWrited)
  }
}

const prepareForOperation = (operator) => {
  if (!changeOperator) {
    storedNumber = Number(lastNumberWrited.toString().replace(',', '.'))
    lastNumberWrited = 0
    isPendingPoint = false
    pendingZeros = 0
  }

  operation = operator
}

const operate = (firstNumber, operator, secondNumber) => {
  let result

  switch (operator) {
    case '+':
      result = firstNumber + secondNumber
      break
    case '-':
      result = firstNumber - secondNumber
      break
    case '*':
      result = firstNumber * secondNumber
      break
    case '/':
      if (firstNumber === 0 || secondNumber === 0) {
        result = 'ERROR'
      } else {
        result = firstNumber / secondNumber
      }
      break
  }

  return result
}

const operateIfDoConsecutiveOperations = (firstNumber, operator, secondNumber) => {
  let result

  if (operator !== '' && !changeOperator) {
    result = operate(firstNumber, operator, secondNumber)
  } else {
    result = secondNumber
  }

  return result
}

const operateAndDisplay = () => {
  if (storedNumber === 0 && lastNumberWrited.toString().lastIndexOf(1) === '.') {
    lastNumberWrited = lastNumberWrited.toString().replace('.', '')
  }

  if (operationPressed) {
    setDisplay('ERROR')
  } else {
    lastNumberWrited = Number(lastNumberWrited.toString().replace(',', '.'))

    if (operation !== '') {
      lastNumberWrited = operate(storedNumber, operation, lastNumberWrited)
    }

    if (lastNumberWrited === 'ERROR') {
      setDisplay('ERROR')
    } else {
      operation = ''
      equalsPressed = true

      if (lastNumberWrited > MAX_NUMBER || lastNumberWrited < MIN_NUMBER) {
        setDisplay('ERROR')
      } else {
        lastNumberWrited = castTo10Digits(lastNumberWrited)
        lastNumberWrited = Number(lastNumberWrited) * 1
        setDisplay(lastNumberWrited.toString().replace('.', ','))
      }
    }
  }
}

const castTo10Digits = (numberToCast) => {
  const enterNumbers = getEntersFrom(numberToCast).toString().length

  if (!checkMaxLenght(numberToCast)) {
    return numberToCast.toFixed(MAX_DIGITS_IN_DISPLAY - enterNumbers)
  } else {
    return numberToCast
  }
}

const getEntersFrom = (numberToCast) => {
  return Math.trunc(numberToCast)
}

const enableButtonsAndPrepareOperation = (operator) => {
  if (operationPressed) {
    changeOperator = true
  }

  lastNumberWrited = operateIfDoConsecutiveOperations(storedNumber, operation, lastNumberWrited)

  if (lastNumberWrited === 'ERROR') {
    setDisplay('ERROR')
  } else {
    operationPressed = true
    prepareForOperation(operator)
    enableAllButtons()
    enableDissableButton('negate', true)
  }
}

const enableDissableButton = (name, value) => {
  const element = document.getElementsByName(name)[0]
  element.disabled = value
}

const enableAllButtons = () => {
  for (let x = 0; x < buttons.length; x++) {
    const element = buttons[x]
    element.disabled = false
  }
}

const disableAllButtons = () => {
  for (let x = 0; x < buttons.length; x++) {
    const element = buttons[x]
    element.disabled = true
  }
}

const addButtons = () => {
  document.getElementsByName('one')[0].addEventListener('click', () => {
    addNumberAndSetDisplay(1)
    enableDissableButton('negate', false)
  })

  document.getElementsByName('two')[0].addEventListener('click', () => {
    addNumberAndSetDisplay(2)
    enableDissableButton('negate', false)
  })

  document.getElementsByName('three')[0].addEventListener('click', () => {
    addNumberAndSetDisplay(3)
    enableDissableButton('negate', false)
  })

  document.getElementsByName('four')[0].addEventListener('click', () => {
    addNumberAndSetDisplay(4)
    enableDissableButton('negate', false)
  })

  document.getElementsByName('five')[0].addEventListener('click', () => {
    addNumberAndSetDisplay(5)
    enableDissableButton('negate', false)
  })

  document.getElementsByName('six')[0].addEventListener('click', () => {
    addNumberAndSetDisplay(6)
    enableDissableButton('negate', false)
  })

  document.getElementsByName('seven')[0].addEventListener('click', () => {
    addNumberAndSetDisplay(7)
    enableDissableButton('negate', false)
  })

  document.getElementsByName('eight')[0].addEventListener('click', () => {
    addNumberAndSetDisplay(8)
    enableDissableButton('negate', false)
  })

  document.getElementsByName('nine')[0].addEventListener('click', () => {
    addNumberAndSetDisplay(9)
    enableDissableButton('negate', false)
  })

  document.getElementsByName('zero')[0].addEventListener('click', () => {
    addNumberAndSetDisplay(0)
    enableDissableButton('negate', false)
  })

  document.getElementsByName('clean')[0].addEventListener('click', () => {
    reset()
    enableDissableButton('zero', true)
  })

  document.getElementsByName('point')[0].addEventListener('click', () => {
    addPoint()
    enableDissableButton('point', true)
    enableDissableButton('zero', false)
  })

  document.getElementsByName('negate')[0].addEventListener('click', () => {
    negateActualNumberAndDisplay(lastNumberWrited)
  })

  document.getElementsByName('sum')[0].addEventListener('click', () => {
    enableButtonsAndPrepareOperation('+')
  })

  document.getElementsByName('subtract')[0].addEventListener('click', () => {
    enableButtonsAndPrepareOperation('-')
  })

  document.getElementsByName('multiply')[0].addEventListener('click', () => {
    enableButtonsAndPrepareOperation('*')
  })

  document.getElementsByName('divide')[0].addEventListener('click', () => {
    enableButtonsAndPrepareOperation('/')
  })

  document.getElementsByName('equal')[0].addEventListener('click', () => {
    operateAndDisplay()

    if (lastNumberWrited === 'ERROR') {
      disableAllButtons()
      enableDissableButton('clean', false)
    } else {
      enableAllButtons()
    }
  })
}

const addKeys = () => {
  document.addEventListener('keydown', (event) => {
    event.preventDefault()

    if (event.key >= 0 && event.key <= 9 && event.key !== ' ') {
      addNumberAndSetDisplay(Number(event.key))
      enableDissableButton('negate', false)
    } else if (event.key === ',') {
      addPoint()
      enableDissableButton('point', true)
      enableDissableButton('zero', false)
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
      enableButtonsAndPrepareOperation(event.key)
    } else if (event.key === 'Control') {
      negateActualNumberAndDisplay(lastNumberWrited)
    } else if (event.key === 'Escape') {
      reset()
      enableDissableButton('zero', true)
    } else if (event.key === 'Enter') {
      operateAndDisplay()

      if (lastNumberWrited === 'ERROR') {
        disableAllButtons()
        enableDissableButton('clean', false)
      } else {
        enableAllButtons()
      }
    }
  })
}

reset()
addButtons()
addKeys()
