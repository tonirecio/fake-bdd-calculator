let currentNumber = 0
let addingComma = false

const display = document.querySelector('[data-testid="display"]')

const MAX_DIGITS_IN_DISPLAY = 10

const addNumber = (number) => {
  if (addingComma) {
    currentNumber = parseFloat(currentNumber.toString() + '.' + number.toString())
    addingComma = false
    setDisplay()
  } else {
    currentNumber = parseFloat(currentNumber.toString() + number.toString())
    setDisplay()
  }
}

const getNumberLength = (number) => {
  number = number.toString()
  number = number.replace('.', '')
  number = number.replace('-', '')
  const length = number.length
  return length
}

const setDisplay = () => {
  let displayValue
  if (addingComma) {
    displayValue = currentNumber.toString() + ','
  } else {
    displayValue = currentNumber.toString().replace('.', ',')
  }
  display.textContent = displayValue
}

const clean = () => {
  currentNumber = 0
  operator = ''
  operand1 = null
  operand2 = null
  addingComma = false
  setDisplay()
}

const negate = () => {
  currentNumber = currentNumber * -1
  setDisplay()
}

const handleComma = () => {
  if (Number.isInteger(currentNumber)) { addingComma = true }
  setDisplay()
}

const handleButtonPress = (button) => {
  switch (button) {
    case 'C':
      clean()
      break
    case ',':
      if (getNumberLength(currentNumber) < MAX_DIGITS_IN_DISPLAY) {
        handleComma()
      }
      break
    case '+-':
      negate()
      break
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
    default:
      if (getNumberLength(currentNumber) < MAX_DIGITS_IN_DISPLAY) {
        addNumber(Number(button))
      }
      console.log(getNumberLength(currentNumber))
      break
  }
}

const handleKeyPress = (event) => {
  const key = event.key
  switch (key) {
    case 'Escape':
      clean()
      break
    case 'Control':
      negate()
      break
    case ',':
      if (getNumberLength(currentNumber) < MAX_DIGITS_IN_DISPLAY) {
        handleComma()
      }
      break
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
    default:
      if (getNumberLength(currentNumber) < MAX_DIGITS_IN_DISPLAY) {
        addNumber(Number(key))
      }
      break
  }
}

document.getElementsByName('clean')[0].addEventListener('click', clean)

document.getElementsByName('negate')[0].addEventListener('click', negate)

document.getElementsByName('zero')[0].addEventListener('click', () => {
  handleButtonPress('0')
})

document.getElementsByName('one')[0].addEventListener('click', () => {
  handleButtonPress('1')
})

document.getElementsByName('two')[0].addEventListener('click', () => {
  handleButtonPress('2')
})

document.getElementsByName('three')[0].addEventListener('click', () => {
  handleButtonPress('3')
})

document.getElementsByName('four')[0].addEventListener('click', () => {
  handleButtonPress('4')
})

document.getElementsByName('five')[0].addEventListener('click', () => {
  handleButtonPress('5')
})

document.getElementsByName('six')[0].addEventListener('click', () => {
  handleButtonPress('6')
})

document.getElementsByName('seven')[0].addEventListener('click', () => {
  handleButtonPress('7')
})

document.getElementsByName('eight')[0].addEventListener('click', () => {
  handleButtonPress('8')
})

document.getElementsByName('nine')[0].addEventListener('click', () => {
  handleButtonPress('9')
})

document.getElementsByName('divide')[0].addEventListener('click', () => {
  handleButtonPress('/')
})

document.getElementsByName('multiply')[0].addEventListener('click', () => {
  handleButtonPress('*')
})

document.getElementsByName('subtract')[0].addEventListener('click', () => {
  handleButtonPress('-')
})

document.getElementsByName('sum')[0].addEventListener('click', () => {
  handleButtonPress('+')
})

document.getElementsByName('point')[0].addEventListener('click', () => {
  handleButtonPress(',')
})

document.getElementsByName('equal')[0].addEventListener('click', () => {
  handleButtonPress('=')
})

document.addEventListener('keydown', handleKeyPress)
