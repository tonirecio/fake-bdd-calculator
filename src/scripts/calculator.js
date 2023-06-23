const MAX_DIGITS_IN_DISPLAY = 10

const display = document.querySelector('div[name="display"] span')

let currentNumber
let previousNumber
let operationType
let isNextNumberDecimal = false

const pressKeys = () => {
  document.addEventListener('keydown', (event) => {
    const keyPressed = event.key

    if (keyPressed >= '0' && keyPressed <= '9') {
      pressedNumber(keyPressed)
      displaycurrentNumber()
    } else if (keyPressed === 'Escape') {
      cleanEverything()
    } else if (keyPressed === 'Control') {
      currentNumber = negateNumber(currentNumber)
      displaycurrentNumber()
    } else if (keyPressed === ',') {
      addPointTocurrentNumber()
      displaycurrentNumber()
    } else if (keyPressed === '+') {
      pressedOperator('+')
    } else if (keyPressed === '-') {
      pressedOperator('-')
    } else if (keyPressed === '*') {
      pressedOperator('*')
    } else if (keyPressed === '/') {
      pressedOperator('/')
    } else if (keyPressed === '=') {
      performOperation()
      cleanDisplay()
    }
  })
}

const pressButtons = () => {
  document.getElementsByName('zero')[0].addEventListener('click', () => {
    pressedNumber(0)
    displaycurrentNumber()
  })
  document.getElementsByName('one')[0].addEventListener('click', () => {
    pressedNumber(1)
    displaycurrentNumber()
  })
  document.getElementsByName('two')[0].addEventListener('click', () => {
    pressedNumber(2)
    displaycurrentNumber()
  })
  document.getElementsByName('three')[0].addEventListener('click', () => {
    pressedNumber(3)
    displaycurrentNumber()
  })
  document.getElementsByName('four')[0].addEventListener('click', () => {
    pressedNumber(4)
    displaycurrentNumber()
  })
  document.getElementsByName('five')[0].addEventListener('click', () => {
    pressedNumber(5)
    displaycurrentNumber()
  })
  document.getElementsByName('six')[0].addEventListener('click', () => {
    pressedNumber(6)
    displaycurrentNumber()
  })
  document.getElementsByName('seven')[0].addEventListener('click', () => {
    pressedNumber(7)
    displaycurrentNumber()
  })
  document.getElementsByName('eight')[0].addEventListener('click', () => {
    pressedNumber(8)
    displaycurrentNumber()
  })
  document.getElementsByName('nine')[0].addEventListener('click', () => {
    pressedNumber(9)
    displaycurrentNumber()
  })
  document.getElementsByName('point')[0].addEventListener('click', () => {
    addPointTocurrentNumber()
    displaycurrentNumber()
  })
  document.getElementsByName('negate')[0].addEventListener('click', () => {
    currentNumber = negateNumber(currentNumber)
    displaycurrentNumber()
  })
  document.getElementsByName('clean')[0].addEventListener('click', () => {
    cleanEverything()
  })
  document.getElementsByName('sum')[0].addEventListener('click', () => {
    pressedOperator('+')
  })
  document.getElementsByName('subtract')[0].addEventListener('click', () => {
    pressedOperator('-')
  })
  document.getElementsByName('multiply')[0].addEventListener('click', () => {
    pressedOperator('*')
  })
  document.getElementsByName('divide')[0].addEventListener('click', () => {
    pressedOperator('/')
  })
  document.getElementsByName('equal')[0].addEventListener('click', () => {
    performOperation()
  })
}

const saveToPreviousNumber = (number) => {
  if (number !== 0) {
    previousNumber = number
    currentNumber = 0
  }
}

const performOperation = () => {
  if (operationType === '+') {
    currentNumber = previousNumber + currentNumber
  } else if (operationType === '-') {
    currentNumber = previousNumber - currentNumber
  } else if (operationType === '*') {
    currentNumber = previousNumber * currentNumber
  } else if (operationType === '/') {
    currentNumber = previousNumber / currentNumber
  }

  checkResultNumberForError()
}

const pressedOperator = (type) => {
  saveToPreviousNumber(currentNumber)
  operationType = type
  cleanDisplay()
}

const pressedNumber = (newNumber) => {
  addNumberTocurrentNumber(newNumber)
}

const addNumberTocurrentNumber = (newNumber) => {
  if (getNumberLength(currentNumber) < MAX_DIGITS_IN_DISPLAY) {
    if (isNextNumberDecimal) {
      currentNumber = parseFloat(currentNumber.toString() + '.' + newNumber.toString())
      isNextNumberDecimal = false
    } else {
      currentNumber = parseFloat(currentNumber.toString() + newNumber.toString())
    }
  }
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
}

const cleanDisplay = () => {
  setDisplay(0)
  currentNumber = 0
}

const cleanSavedNumbers = () => {
  currentNumber = 0
  previousNumber = 0
}

const cleanEverything = () => {
  cleanDisplay()
  cleanSavedNumbers()
}

const displayError = () => {
  setDisplay('ERROR')
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

const checkResultNumberForError = () => {
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

const displaycurrentNumber = () => {
  if (isNextNumberDecimal) {
    setDisplay(currentNumber.toString() + ',')
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
