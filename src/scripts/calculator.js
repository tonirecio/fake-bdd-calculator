const MAX_DIGITS_IN_DISPLAY = 10
const display = document.querySelector('div[name="display"] span')

let currentNumber = 0
let previousNumber = 0
let currentOperationSymbol = ''
let storedDecimalZeros = ''
let isNextNumberDecimal = false
// revisar chaining operations, es necesaria? Combinacio de override display y performOperation()
let chainingOperations = false
// override new number
let waitingForNewNumber = false
let addingZeros = false

const pressKeys = () => {
  document.addEventListener('keydown', (event) => {
    const keyPressed = event.key

    if (keyPressed >= '0' && keyPressed <= '9') {
      addNumberTocurrentNumber(keyPressed)
    } else if (keyPressed === 'Escape') {
      cleanEverything()
    } else if (keyPressed === 'Control') {
      pressedNegate()
    } else if (keyPressed === ',') {
      addPointToCurrentNumber()
    } else if (keyPressed === '+') {
      highLightButton('sum')
      pressedOperator('+')
    } else if (keyPressed === '-') {
      highLightButton('subtract')
      pressedOperator('-')
    } else if (keyPressed === '*') {
      highLightButton('multiply')
      pressedOperator('*')
    } else if (keyPressed === '/') {
      highLightButton('divide')
      pressedOperator('/')
    } else if (keyPressed === '=') {
      pressedEqual()
    }
  })
}

const pressButtons = () => {
  document.getElementsByName('zero')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(0)
  })
  document.getElementsByName('one')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(1)
  })
  document.getElementsByName('two')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(2)
  })
  document.getElementsByName('three')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(3)
  })
  document.getElementsByName('four')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(4)
  })
  document.getElementsByName('five')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(5)
  })
  document.getElementsByName('six')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(6)
  })
  document.getElementsByName('seven')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(7)
  })
  document.getElementsByName('eight')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(8)
  })
  document.getElementsByName('nine')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(9)
  })
  document.getElementsByName('point')[0].addEventListener('click', () => {
    addPointToCurrentNumber()
  })
  document.getElementsByName('negate')[0].addEventListener('click', () => {
    pressedNegate()
  })
  document.getElementsByName('clean')[0].addEventListener('click', () => {
    cleanEverything()
  })
  document.getElementsByName('sum')[0].addEventListener('click', () => {
    highLightButton('sum')
    pressedOperator('+')
  })
  document.getElementsByName('subtract')[0].addEventListener('click', () => {
    highLightButton('subtract')
    pressedOperator('-')
  })
  document.getElementsByName('multiply')[0].addEventListener('click', () => {
    highLightButton('multiply')
    pressedOperator('*')
  })
  document.getElementsByName('divide')[0].addEventListener('click', () => {
    highLightButton('divide')
    pressedOperator('/')
  })
  document.getElementsByName('equal')[0].addEventListener('click', () => {
    pressedEqual()
  })
}

const disableButton = (button) => {
  document.getElementsByName(button)[0].disabled = true
}
// mateixa solo en una, true o false por parametro
const disableNumberButtons = () => {
  document.getElementsByName('zero')[0].disabled = true
  document.getElementsByName('one')[0].disabled = true
  document.getElementsByName('two')[0].disabled = true
  document.getElementsByName('three')[0].disabled = true
  document.getElementsByName('four')[0].disabled = true
  document.getElementsByName('five')[0].disabled = true
  document.getElementsByName('six')[0].disabled = true
  document.getElementsByName('seven')[0].disabled = true
  document.getElementsByName('eight')[0].disabled = true
  document.getElementsByName('nine')[0].disabled = true
}

const enableButton = (button) => {
  document.getElementsByName(button)[0].disabled = false
}

const enableNumberButtons = () => {
  document.getElementsByName('zero')[0].disabled = false
  document.getElementsByName('one')[0].disabled = false
  document.getElementsByName('two')[0].disabled = false
  document.getElementsByName('three')[0].disabled = false
  document.getElementsByName('four')[0].disabled = false
  document.getElementsByName('five')[0].disabled = false
  document.getElementsByName('six')[0].disabled = false
  document.getElementsByName('seven')[0].disabled = false
  document.getElementsByName('eight')[0].disabled = false
  document.getElementsByName('nine')[0].disabled = false
}

const saveToPreviousNumber = (number) => {
  if (number !== 0) {
    previousNumber = number
    currentNumber = 0
  }
}

const performOperation = () => {
  if (currentOperationSymbol === '+') {
    currentNumber = previousNumber + currentNumber
  } else if (currentOperationSymbol === '-') {
    currentNumber = previousNumber - currentNumber
  } else if (currentOperationSymbol === '*') {
    currentNumber = previousNumber * currentNumber
  } else if (currentOperationSymbol === '/') {
    currentNumber = previousNumber / currentNumber
  }
// Return, no display
  displayResultNumber()
}

const pressedNegate = () => {
  currentNumber = negateNumber(currentNumber)
// No displays
  displayCurrentNumber()
}

const pressedEqual = () => {
  unHighlightAllButtons()
  if (waitingForNewNumber) {
    displayError()
  } else {
    isNextNumberDecimal = false
    performOperation()
    chainingOperations = false
    waitingForNewNumber = false
  }
}
// pasar parametros, solo una funcion
const highLightButton = (button) => {
  unHighlightAllButtons()
  const highlightedButton = document.getElementsByName(button)[0]
  highlightedButton.classList.add('highlighted')
}
const unHighlightAllButtons = () => {
  const allButtons = document.querySelectorAll('button')
  allButtons.forEach((button) => {
    button.classList.remove('highlighted')
  })
}

const pressedOperator = (operatorPressed) => {
  enableNumberButtons()
  enableButton('point')
  if (chainingOperations) {
    performOperation()
    saveToPreviousNumber(currentNumber)
  } else {
    saveToPreviousNumber(currentNumber)
    chainingOperations = true
    disableButton('negate')
  }
  waitingForNewNumber = true
  currentOperationSymbol = operatorPressed
}
// dos funciones, decimal, no decimal
// variable string que concatena, solo un parseFloat
const addNumberTocurrentNumber = (newNumber) => {
  if (getNumberLength(currentNumber) < MAX_DIGITS_IN_DISPLAY) {
    if (isNextNumberDecimal) {
      if (newNumber === 0) {
        storedDecimalZeros += '0'
        currentNumber = parseFloat(currentNumber.toString() + '.' + newNumber.toString())
        addingZeros = true
      } else if (addingZeros) {
        currentNumber = parseFloat(currentNumber.toString() + '.' + storedDecimalZeros + newNumber.toString())
        isNextNumberDecimal = false
        addingZeros = false
        storedDecimalZeros = ''
        disableButton('point')
      } else {
        currentNumber = parseFloat(currentNumber.toString() + '.' + newNumber.toString())
        isNextNumberDecimal = false
        disableButton('point')
      }
    } else {
      currentNumber = parseFloat(currentNumber.toString() + newNumber.toString())
    }
    enableNumberButtons()
    enableButton('negate')
  }

  displayCurrentNumber()
  waitingForNewNumber = false

  if (getNumberLength(currentNumber) === MAX_DIGITS_IN_DISPLAY) {
    disableNumberButtons()
    disableButton('point')
  }
}

const negateNumber = (number) => {
  return -number
}

const addPointToCurrentNumber = () => {
  if (getNumberLength(currentNumber) < MAX_DIGITS_IN_DISPLAY) {
    enableButton('zero')
    if (Number.isInteger(currentNumber)) {
      isNextNumberDecimal = true
    }
  }
  displayCurrentNumber()
}

const cleanDisplay = () => {
  currentNumber = 0
  displayCurrentNumber()
}

const cleanSavedNumbers = () => {
  currentNumber = 0
  previousNumber = 0
}

const cleanEverything = () => {
  unHighlightAllButtons()
  cleanDisplay()
  cleanSavedNumbers()
  enableAllButtons()
  disableButton('zero')
  disableButton('negate')
}

const displayError = () => {
  disableAllButtons()
  setDisplay('ERROR')
}

const enableAllButtons = () => {
  enableNumberButtons()
  enableButton('negate')
  enableButton('sum')
  enableButton('subtract')
  enableButton('divide')
  enableButton('multiply')
  enableButton('point')
  enableButton('equal')
}

const disableAllButtons = () => {
  disableButton('point')
  disableButton('sum')
  disableButton('subtract')
  disableButton('divide')
  disableButton('multiply')
  disableButton('negate')
  disableButton('equal')
  disableNumberButtons()
}

const getNumberLength = (number) => {
  const numberString = number.toString()
  let numericLength = 0

  for (let index = 0; index < numberString.length; index++) {
    const char = numberString.charAt(index)
    if (char >= '0' && char <= '9') {
      numericLength++
    }
  }
  return numericLength
}

const roundDecimals = (number) => {
  /* Rounding decimals of result, to avoid numbers like 1,0000000001 */
  number = number.toFixed(MAX_DIGITS_IN_DISPLAY)
  number = number.slice(0, MAX_DIGITS_IN_DISPLAY + 1)
  number = parseFloat(number)

  return number
}

const displayResultNumber = () => {
  if (isNaN(currentNumber) || !isFinite(currentNumber)) {
    displayError()
  } else {
    if (!Number.isInteger(currentNumber)) {
      currentNumber = roundDecimals(currentNumber)
    }

    if (getNumberLength(currentNumber) <= MAX_DIGITS_IN_DISPLAY) {
      displayCurrentNumber()
      enableNumberButtons()
      enableButton('point')
    } else {
      displayError()
    }
    saveToPreviousNumber(currentNumber)
  }
  waitingForNewNumber = false
}

const displayCurrentNumber = () => {
  if (isNextNumberDecimal) {
    setDisplay(currentNumber.toString() + ',' + storedDecimalZeros)
  } else {
    setDisplay(currentNumber.toString().replace('.', ','))
  }
}

const setDisplay = (value) => {
  display.innerHTML = value
}

pressButtons()
pressKeys()
cleanEverything()
