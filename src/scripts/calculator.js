const MAX_DIGITS_IN_DISPLAY = 10

let currentNumber = 0
let previousNumber = 0
let operation = ''
const numberStack = []

const display = document.querySelector('div[name="display"] span')

const setDisplay = value => {
  display.innerHTML = value
}

const reset = () => {
  numberStack.length = 0
  numberStack.push(0)
  currentNumber = 0
  previousNumber = 0
  setDisplay(stackToNumber(numberStack))
}

const stackToNumber = stack => {
  let result = 0
  let number = 0
  let decimal = 0
  let decimalMultiplier = 1
  let isNegative = false

  const stackCopy = [...stack]

  if (stackCopy[0] < 0) {
    isNegative = true
    stackCopy.shift()
  }

  stackCopy.forEach(element => {
    if (element === null) {
      decimalMultiplier = 0.1
    } else if (decimalMultiplier === 1) {
      number = number * 10 + element
    } else {
      decimal += element * decimalMultiplier
      decimalMultiplier *= 0.1
    }
  })

  result = number + decimal
  if (isNegative) {
    result *= -1
  }

  return result
}

const negateNumberStack = stack => {
  if (stack[0] === -1) {
    stack.shift()
  } else {
    stack.unshift(-1)
  }
}

const stackToString = stack => {
  let result = ''

  stack.forEach((element, index) => {
    if (index === 0 && element === -1) {
      result += '-'
    } else if (element === null) {
      result += ','
    } else {
      result += element.toString()
    }
  })

  return result
}

const canPushToNumberStack = stack => {
  let result = false
  let lengthLimit = MAX_DIGITS_IN_DISPLAY

  if (stack.includes(null)) {
    lengthLimit++
  }
  if (stack[0] === -1) {
    lengthLimit++
  }

  result = stack.length < lengthLimit

  return result
}

const pushToNumberStack = (stack, number) => {
  if (stack.length === 1 && stack[0] === 0) {
    stack.shift()
  }
  stack.push(number)
}

const updateOperation = operationType => {
  if (previousNumber === 0) {
    previousNumber = stackToNumber(numberStack)
    numberStack.length = 0
    numberStack.push(0)
  }
  operation = operationType
}

const executeOperation = operationType => {
  const firstOperand = parseFloat(previousNumber)
  const secondOperand = parseFloat(currentNumber)
  let result = 0
  let digitCount = 0
  let resultOutput = ''

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
  digitCount = result.toString().replace('.', '').length

  if (digitCount <= MAX_DIGITS_IN_DISPLAY) {
    resultOutput = result.toString().replace('.', ',')
  } else {
    resultOutput = 'ERROR'
  }

  previousNumber = result
  currentNumber = 0
  numberStack.length = 0
  numberStack.push(0)
  return resultOutput
}

const handleNumberClick = number => {
  if (canPushToNumberStack(numberStack)) {
    pushToNumberStack(numberStack, number)
  }
  setDisplay(stackToString(numberStack))
}

const handlePointClick = () => {
  if (!numberStack.includes(null) && canPushToNumberStack(numberStack)) {
    numberStack.push(null)
  }
  setDisplay(stackToString(numberStack))
}

const handleNegateClick = () => {
  if (stackToNumber(numberStack) !== 0) {
    negateNumberStack(numberStack)
  }
  setDisplay(stackToString(numberStack))
}

const handleSubtractClick = () => {
  if (numberStack.length === 0) {
    numberStack.push(-1)
  }
  updateOperation('subtract')
}

const handleEqualClick = () => {
  currentNumber = stackToNumber(numberStack)
  setDisplay(executeOperation(operation))
}

document
  .getElementsByName('zero')[0]
  .addEventListener('click', () => handleNumberClick(0))
document
  .getElementsByName('one')[0]
  .addEventListener('click', () => handleNumberClick(1))
document
  .getElementsByName('two')[0]
  .addEventListener('click', () => handleNumberClick(2))
document
  .getElementsByName('three')[0]
  .addEventListener('click', () => handleNumberClick(3))
document
  .getElementsByName('four')[0]
  .addEventListener('click', () => handleNumberClick(4))
document
  .getElementsByName('five')[0]
  .addEventListener('click', () => handleNumberClick(5))
document
  .getElementsByName('six')[0]
  .addEventListener('click', () => handleNumberClick(6))
document
  .getElementsByName('seven')[0]
  .addEventListener('click', () => handleNumberClick(7))
document
  .getElementsByName('eight')[0]
  .addEventListener('click', () => handleNumberClick(8))
document
  .getElementsByName('nine')[0]
  .addEventListener('click', () => handleNumberClick(9))
document
  .getElementsByName('point')[0]
  .addEventListener('click', handlePointClick)
document.getElementsByName('clean')[0].addEventListener('click', reset)
document
  .getElementsByName('negate')[0]
  .addEventListener('click', handleNegateClick)
document
  .getElementsByName('sum')[0]
  .addEventListener('click', () => updateOperation('sum'))
document
  .getElementsByName('subtract')[0]
  .addEventListener('click', handleSubtractClick)
document
  .getElementsByName('multiply')[0]
  .addEventListener('click', () => updateOperation('multiply'))
document
  .getElementsByName('divide')[0]
  .addEventListener('click', () => updateOperation('divide'))
document
  .getElementsByName('equal')[0]
  .addEventListener('click', handleEqualClick)

document.body.addEventListener('keydown', event => {
  const key = event.key

  if (key >= 0 && key <= 9) {
    const keyNumber = parseInt(key)
    handleNumberClick(keyNumber)
  } else {
    switch (key) {
      case ',':
        handlePointClick()
        break
      case 'Escape':
        reset()
        break
      case 'Control':
        handleNegateClick()
        break
      case '+':
        updateOperation('sum')
        break
      case '-':
        handleSubtractClick()
        break
      case '*':
        updateOperation('multiply')
        break
      case '/':
        updateOperation('divide')
        break
      case 'Enter':
        handleEqualClick()
        break
      default:
        break
    }
  }
})

reset()
