/*
TO-DO
(Por prioridad)
1. ButtonHandling, arreglado
2.Separar addNumber segun decimal o integro en dos funciones
3.Arreglar displayCurrentNumber, quitar cosas innecesarias. Fusionar con displayResultNumber
*/
const MAX_DIGITS_IN_DISPLAY = 10

const display = document.querySelector('div[name="display"] span')

let currentNumber = 0
let previousNumber = 0
let currentOperationSymbol = ''
let storedZeros = ''
let isNextNumberDecimal = false
let chainingOperations = false
let waitingForNewNumber = false
let addingZeros = false
let errorCode = false

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
      addPointTocurrentNumber()
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
    addPointTocurrentNumber()
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

const handleButtonDisabling = () => {
  disableAllButtons(false)

  if (errorCode) {
    disableAllButtons(true)
  }
  if (currentOperationSymbol !== '' && waitingForNewNumber) {
    disableButton('negate', true)
  }
  if (currentNumber === 0 && !waitingForNewNumber) {
    disableButton('negate', true)
    disableButton('zero', true)
  }
  if (currentNumber !== 0 && waitingForNewNumber) {
    disableNumberButtons(false)
    disableButton('negate', false)
  }
  if (isNextNumberDecimal) {
    disableNumberButtons(false)
  }
  if (getNumberLength(currentNumber) === MAX_DIGITS_IN_DISPLAY) {
    disableNumberButtons(true)
    disableButton('point', true)
  }
  if (!Number.isInteger(currentNumber) || isNextNumberDecimal) {
    disableButton('point', true)
  }
}

const disableButton = (button, state) => {
  document.getElementsByName(button)[0].disabled = state
}

const disableNumberButtons = (state) => {
  document.getElementsByName('zero')[0].disabled = state
  document.getElementsByName('one')[0].disabled = state
  document.getElementsByName('two')[0].disabled = state
  document.getElementsByName('three')[0].disabled = state
  document.getElementsByName('four')[0].disabled = state
  document.getElementsByName('five')[0].disabled = state
  document.getElementsByName('six')[0].disabled = state
  document.getElementsByName('seven')[0].disabled = state
  document.getElementsByName('eight')[0].disabled = state
  document.getElementsByName('nine')[0].disabled = state
}

const disableAllButtons = (state) => {
  disableButton('point', state)
  disableButton('sum', state)
  disableButton('subtract', state)
  disableButton('divide', state)
  disableButton('multiply', state)
  disableButton('negate', state)
  disableButton('equal', state)
  disableNumberButtons(state)
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
  currentOperationSymbol = ''
  displayResultNumber()
  handleButtonDisabling()
}

const pressedNegate = () => {
  currentNumber = negateNumber(currentNumber)
  displaycurrentNumber()
  handleButtonDisabling()
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
  handleButtonDisabling()
}

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
  if (chainingOperations) {
    performOperation()
    saveToPreviousNumber(currentNumber)
  } else {
    saveToPreviousNumber(currentNumber)
    chainingOperations = true
  }
  waitingForNewNumber = true
  currentOperationSymbol = operatorPressed
  handleButtonDisabling()
}

const addNumberTocurrentNumber = (newNumber) => {
  if (getNumberLength(currentNumber) < MAX_DIGITS_IN_DISPLAY) {
    if (isNextNumberDecimal) {
      if (newNumber === 0) {
        storedZeros += '0'
        currentNumber = parseFloat(currentNumber.toString() + '.' + newNumber.toString())
        addingZeros = true
      } else if (addingZeros) {
        currentNumber = parseFloat(currentNumber.toString() + '.' + storedZeros + newNumber.toString())
        isNextNumberDecimal = false
        addingZeros = false
        storedZeros = ''
      } else {
        currentNumber = parseFloat(currentNumber.toString() + '.' + newNumber.toString())
        isNextNumberDecimal = false
      }
    } else {
      currentNumber = parseFloat(currentNumber.toString() + newNumber.toString())
    }
  }
  displaycurrentNumber()
  waitingForNewNumber = false
  handleButtonDisabling()
}

const negateNumber = (number) => {
  return -number
}

const addPointTocurrentNumber = () => {
  if (getNumberLength(currentNumber) < MAX_DIGITS_IN_DISPLAY) {
    if (Number.isInteger(currentNumber)) {
      isNextNumberDecimal = true
    }
  }
  displaycurrentNumber()
  handleButtonDisabling()
}

const cleanDisplay = () => {
  errorCode = false
  setDisplay(0)
  currentNumber = 0
}

const cleanSavedNumbers = () => {
  currentNumber = 0
  previousNumber = 0
}

const cleanEverything = () => {
  unHighlightAllButtons()
  cleanDisplay()
  cleanSavedNumbers()
  disableAllButtons(false)
  disableButton('zero', true)
  disableButton('negate', true)
}

const displayError = () => {
  disableAllButtons(true)
  setDisplay('ERROR')
  errorCode = true
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
  number = parseFloat(number.toPrecision(MAX_DIGITS_IN_DISPLAY))
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
      displaycurrentNumber()
    } else {
      displayError()
    }
    saveToPreviousNumber(currentNumber)
  }
  waitingForNewNumber = false
}

const displaycurrentNumber = () => {
  if (isNextNumberDecimal) {
    setDisplay(currentNumber.toString() + ',' + storedZeros)
  } else {
    setDisplay(currentNumber.toString().replace('.', ','))
  }
  handleButtonDisabling()
}

const setDisplay = (value) => {
  display.innerHTML = value
}

pressButtons()
pressKeys()
cleanEverything()
