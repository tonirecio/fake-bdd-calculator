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
      addNumberTocurrentNumber(keyPressed)
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
      operationType = '+'
      saveToPreviousNumber()
      cleanDisplay()
    } else if (keyPressed === '-') {
      operationType = '-'
      saveToPreviousNumber()
      cleanDisplay()
    } else if (keyPressed === '*') {
      operationType = '*'
      saveToPreviousNumber()
      cleanDisplay()
    } else if (keyPressed === '/') {
      operationType = '/'
      saveToPreviousNumber()
      cleanDisplay()
    } else if (keyPressed === '=') {
      performOperation()
      cleanDisplay()
    }
  })
}

const pressButtons = () => {
  document.getElementsByName('zero')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(0)
    displaycurrentNumber()
  })
  document.getElementsByName('one')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(1)
    displaycurrentNumber()
  })
  document.getElementsByName('two')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(2)
    displaycurrentNumber()
  })
  document.getElementsByName('three')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(3)
    displaycurrentNumber()
  })
  document.getElementsByName('four')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(4)
    displaycurrentNumber()
  })
  document.getElementsByName('five')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(5)
    displaycurrentNumber()
  })
  document.getElementsByName('six')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(6)
    displaycurrentNumber()
  })
  document.getElementsByName('seven')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(7)
    displaycurrentNumber()
  })
  document.getElementsByName('eight')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(8)
    displaycurrentNumber()
  })
  document.getElementsByName('nine')[0].addEventListener('click', () => {
    addNumberTocurrentNumber(9)
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
    operationType = '+'
    saveToPreviousNumber()
    cleanDisplay()
  })
  document.getElementsByName('subtract')[0].addEventListener('click', () => {
    operationType = '-'
    saveToPreviousNumber()
    cleanDisplay()
  })
  document.getElementsByName('multiply')[0].addEventListener('click', () => {
    operationType = '*'
    saveToPreviousNumber()
    cleanDisplay()
  })
  document.getElementsByName('divide')[0].addEventListener('click', () => {
    operationType = '/'
    saveToPreviousNumber()
    cleanDisplay()
  })
  document.getElementsByName('equal')[0].addEventListener('click', () => {
    performOperation()
  })
}

const saveToPreviousNumber = () => {
  previousNumber = currentNumber
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
  
  checkResultNumber();
}

const addNumberTocurrentNumber = (newNumber) => {
  if (getNumberLength(currentNumber) < MAX_DIGITS_IN_DISPLAY) {
    if (isNextNumberDecimal) {
      currentNumber = Number(currentNumber.toString() + '.' + newNumber.toString())
      isNextNumberDecimal = false
    } else {
      currentNumber = Number(currentNumber.toString() + newNumber.toString())
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

const checkResultNumber = () => {
/* Rounding decimals of result, to avoid numbers like 1,0000000001 */
  if (!Number.isInteger(currentNumber)) {
    currentNumber = currentNumber.toFixed(MAX_DIGITS_IN_DISPLAY)
    currentNumber = currentNumber.slice(0, MAX_DIGITS_IN_DISPLAY + 1)
    currentNumber = parseFloat(currentNumber)
  }

  if (getNumberLength(currentNumber) <= MAX_DIGITS_IN_DISPLAY) {
    displaycurrentNumber()
  } else {
    displayError()
  }
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
