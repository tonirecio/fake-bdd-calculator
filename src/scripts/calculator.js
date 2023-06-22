const MAX_DIGITS_IN_DISPLAY = 10

const setDisplay = value => {
  const updatedValue = value.replace('.', ',')
  display.innerHTML = updatedValue
}

const reset = () => {
  storedNumber = '0'
  setDisplay(storedNumber)
}

const negate = () => {
  if (storedNumber !== '0') {
    const temp = storedNumber
    storedNumber = (parseFloat(storedNumber) * -1).toString()
    if (temp.endsWith('.')) {
      storedNumber += '.'
    }
    setDisplay(storedNumber)
  }
}

const appendNumber = value => {
  if (storedNumber === '0') {
    storedNumber = ''
  }
  if (storedNumber.replace('.', '').length < MAX_DIGITS_IN_DISPLAY) {
    storedNumber += value
  }
  setDisplay(storedNumber)
}

const appendDot = () => {
  if (
    !storedNumber.includes('.') &&
    storedNumber.length < MAX_DIGITS_IN_DISPLAY
  ) {
    storedNumber += '.'
  }
  setDisplay(storedNumber)
}

const updateOperation = operationType => {
  tempNumber = parseFloat(storedNumber).toString()
  storedNumber = '0'
  operation = operationType
}

const executeOperation = operationType => {
  const firstOperand = parseFloat(tempNumber)
  const secondOperand = parseFloat(storedNumber)

  switch (operationType) {
    case 'sum':
      result = firstOperand + secondOperand
      break
    case 'subtract':
      result = firstOperand - secondOperand
      break
    case 'multiply':
      result = firstOperand * secondOperand
      break
    case 'divide':
      result = firstOperand / secondOperand
      break
    default:
      break
  }

  result = parseFloat(result.toPrecision(MAX_DIGITS_IN_DISPLAY))
  setDisplay(result.toString())
}

const display = document.querySelector('div[name="display"] span')

let storedNumber = '0'
let tempNumber = '0'
let operation = ''
let result = 0

const buttons = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'zero',
  'point',
  'clean',
  'negate',
  'sum',
  'subtract',
  'multiply',
  'divide',
  'equal'
]

buttons.forEach(button => {
  const value = document.getElementsByName(button)[0]
  value.addEventListener('click', () => {
    switch (button) {
      case 'one':
        appendNumber(1)
        break
      case 'two':
        appendNumber(2)
        break
      case 'three':
        appendNumber(3)
        break
      case 'four':
        appendNumber(4)
        break
      case 'five':
        appendNumber(5)
        break
      case 'six':
        appendNumber(6)
        break
      case 'seven':
        appendNumber(7)
        break
      case 'eight':
        appendNumber(8)
        break
      case 'nine':
        appendNumber(9)
        break
      case 'zero':
        appendNumber(0)
        break
      case 'point':
        appendDot()
        break
      case 'clean':
        reset()
        break
      case 'negate':
        negate()
        break
      case 'sum':
        updateOperation('sum')
        break
      case 'subtract':
        updateOperation('subtract')
        break
      case 'multiply':
        updateOperation('multiply')
        break
      case 'divide':
        updateOperation('divide')
        break
      case 'equal':
        executeOperation(operation)
        break
      default:
        break
    }
  })
})

document.addEventListener('keydown', event => {
  const key = event.key
  switch (key) {
    case '1':
      appendNumber(1)
      break
    case '2':
      appendNumber(2)
      break
    case '3':
      appendNumber(3)
      break
    case '4':
      appendNumber(4)
      break
    case '5':
      appendNumber(5)
      break
    case '6':
      appendNumber(6)
      break
    case '7':
      appendNumber(7)
      break
    case '8':
      appendNumber(8)
      break
    case '9':
      appendNumber(9)
      break
    case '0':
      appendNumber(0)
      break
    case ',':
      appendDot()
      break
    case 'Escape':
      reset()
      break
    case 'Control':
      negate()
      break
    case 'sum':
      updateOperation('sum')
      break
    case 'subtract':
      updateOperation('subtract')
      break
    case 'multiply':
      updateOperation('multiply')
      break
    case 'divide':
      updateOperation('divide')
      break
    case 'equal':
      executeOperation(operation)
      break
    default:
      break
  }
})

reset()
