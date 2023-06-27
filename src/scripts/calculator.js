const MAX_DIGITS_IN_DISPLAY = 10

let currentNumber = 0
let previousNumber = 0
let operation = ''
let result = 0
const numberStack = []

const display = document.querySelector('div[name="display"] span')

const setDisplay = value => {
  display.innerHTML = value
}

const reset = () => {
  numberStack.length = 0
  numberStack.push(0)
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
  previousNumber = stackToNumber(numberStack)
  numberStack.length = 0
  operation = operationType
}

const executeOperation = operationType => {
  const firstOperand = parseFloat(previousNumber)
  const secondOperand = parseFloat(currentNumber)

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
  setDisplay(result.toString().replace('.', ','))
}

document.getElementsByName('zero')[0].addEventListener('click', () => {
  if (canPushToNumberStack(numberStack)) {
    pushToNumberStack(numberStack, 0)
  }
  setDisplay(stackToString(numberStack))
})

document.getElementsByName('one')[0].addEventListener('click', () => {
  if (canPushToNumberStack(numberStack)) {
    pushToNumberStack(numberStack, 1)
  }
  setDisplay(stackToString(numberStack))
})

document.getElementsByName('two')[0].addEventListener('click', () => {
  if (canPushToNumberStack(numberStack)) {
    pushToNumberStack(numberStack, 2)
  }
  setDisplay(stackToString(numberStack))
})

document.getElementsByName('three')[0].addEventListener('click', () => {
  if (canPushToNumberStack(numberStack)) {
    pushToNumberStack(numberStack, 3)
  }
  setDisplay(stackToString(numberStack))
})

document.getElementsByName('four')[0].addEventListener('click', () => {
  if (canPushToNumberStack(numberStack)) {
    pushToNumberStack(numberStack, 4)
  }
  setDisplay(stackToString(numberStack))
})

document.getElementsByName('five')[0].addEventListener('click', () => {
  if (canPushToNumberStack(numberStack)) {
    pushToNumberStack(numberStack, 5)
  }
  setDisplay(stackToString(numberStack))
})

document.getElementsByName('six')[0].addEventListener('click', () => {
  if (canPushToNumberStack(numberStack)) {
    pushToNumberStack(numberStack, 6)
  }
  setDisplay(stackToString(numberStack))
})

document.getElementsByName('seven')[0].addEventListener('click', () => {
  if (canPushToNumberStack(numberStack)) {
    pushToNumberStack(numberStack, 7)
  }
  setDisplay(stackToString(numberStack))
})

document.getElementsByName('eight')[0].addEventListener('click', () => {
  if (canPushToNumberStack(numberStack)) {
    pushToNumberStack(numberStack, 8)
  }
  setDisplay(stackToString(numberStack))
})

document.getElementsByName('nine')[0].addEventListener('click', () => {
  if (canPushToNumberStack(numberStack)) {
    pushToNumberStack(numberStack, 9)
  }
  setDisplay(stackToString(numberStack))
})

document.getElementsByName('point')[0].addEventListener('click', () => {
  if (!numberStack.includes(null) && canPushToNumberStack(numberStack)) {
    numberStack.push(null)
  }
  setDisplay(stackToString(numberStack))
})

document.getElementsByName('clean')[0].addEventListener('click', () => {
  reset()
})

document.getElementsByName('negate')[0].addEventListener('click', () => {
  if (stackToNumber(numberStack) !== 0) {
    negateNumberStack(numberStack)
  }
  console.log(numberStack)
  setDisplay(stackToString(numberStack))
})

document.getElementsByName('sum')[0].addEventListener('click', () => {
  updateOperation('sum')
})

document.getElementsByName('subtract')[0].addEventListener('click', () => {
  if (numberStack.length === 0) {
    numberStack.push(-1)
    console.log(numberStack)
  } else {
    updateOperation('subtract')
  }
})

document.getElementsByName('multiply')[0].addEventListener('click', () => {
  updateOperation('multiply')
})

document.getElementsByName('divide')[0].addEventListener('click', () => {
  updateOperation('divide')
})

document.getElementsByName('equal')[0].addEventListener('click', () => {
  currentNumber = stackToNumber(numberStack)
  executeOperation(operation)
})

document.body.addEventListener('keydown', event => {
  const key = event.key

  if (key >= 0 && key <= 9) {
    const keyNumber = parseInt(key)
    if (canPushToNumberStack(numberStack)) {
      pushToNumberStack(numberStack, keyNumber)
    }
    setDisplay(stackToString(numberStack))
  } else {
    switch (key) {
      case ',':
        if (!numberStack.includes(null) && canPushToNumberStack(numberStack)) {
          numberStack.push(null)
        }
        setDisplay(stackToString(numberStack))
        break
      case 'Escape':
        reset()
        break
      case 'Control':
        if (stackToNumber(numberStack) !== 0) {
          negateNumberStack(numberStack)
        }
        setDisplay(stackToString(numberStack))
        break
      case '+':
        updateOperation('sum')
        break
      case '-':
        if (numberStack.length === 0) {
          numberStack.push(-1)
        }
        updateOperation('subtract')
        break
      case '*':
        updateOperation('multiply')
        break
      case '/':
        updateOperation('divide')
        break
      case 'Enter':
        currentNumber = stackToNumber(numberStack)
        executeOperation(operation)
        break
      default:
        break
    }
  }
})

reset()
