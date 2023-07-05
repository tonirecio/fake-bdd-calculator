// yarn test tests/features/calculator.feature --tags "@test1Done"

const MAX_DIGITS_IN_DISPLAY = 10
let firstOperator
let currentValue = '0'
let currentValueOperator
const DecimalPoint = ','
let refreshDisplay = false

const setDisplay = (value) => {
  const display = document.querySelector('div[name="display"] span')
  const updatedValue = value.replace('.', DecimalPoint)
  display.innerHTML = updatedValue
}

const displayError = () => {
  setDisplay('ERROR')
}

const reset = () => {
  firstOperator = 0
  currentValue = '0'
  refreshDisplay = false
  currentValueOperator = null
  setDisplay(currentValue)
}

const pressNumber = (buttonNumber) => {
  if (refreshDisplay) {
    currentValue = buttonNumber.toString()
    refreshDisplay = false
  } else {
    if (
      currentValue.length < MAX_DIGITS_IN_DISPLAY ||
      (currentValue.includes('.') &&
        currentValue.length <= MAX_DIGITS_IN_DISPLAY)
    ) {
      if (currentValue !== '0') {
        currentValue += buttonNumber
      } else {
        currentValue = buttonNumber.toString()
      }
    }
  }
  setDisplay(currentValue)
}

const negateInvertNumber = () => {
  if (currentValue !== '0' && currentValue !== '0.') {
    if (currentValue.startsWith('-')) {
      currentValue = currentValue.slice(1)
    } else if (currentValue.startsWith('+')) {
      currentValue = '-' + currentValue.slice(1)
    } else {
      currentValue = '-' + currentValue
    }
    setDisplay(currentValue)
  }
}

const floatCurrentValue = () => {
  if (
    !currentValue.includes('.') &&
    currentValue.length < MAX_DIGITS_IN_DISPLAY
  ) {
    currentValue += '.'
  }
  setDisplay(currentValue)
}

const concludeOperation = () => {
  if (currentValueOperator === null) {
    if (currentValue.endsWith('.')) {
      currentValue = currentValue.replace('.', '')
    }
    setDisplay(currentValue)
    return
  }

  const secondOperator = parseFloat(currentValue.replace(',', '.'))
  let outcome = null
  switch (currentValueOperator) {
    case 'sum':
      outcome = firstOperator + secondOperator
      break
    case 'subtract':
      outcome = firstOperator - secondOperator
      break
    case 'multiply':
      outcome = firstOperator * secondOperator
      break
    case 'divide':
      if (secondOperator === 0) {
        displayError()
        return
      }
      outcome = firstOperator / secondOperator
      break
    default:
      console.log(
        '[ERROR] ' +
        currentValueOperator +
        ' The implementation is still pending.'
      )
  }

  outcome = parseFloat(outcome.toPrecision(MAX_DIGITS_IN_DISPLAY))

  if (outcome.toString().replace('.', '').length > MAX_DIGITS_IN_DISPLAY) {
    displayError()
  } else {
    setDisplay(outcome.toString())
  }
  firstOperator = outcome
  currentValue = outcome.toString()
  refreshDisplay = true
}

const recordFunctionButtonPress = (buttonIdentifier, assignedFunction) => {
  document
    .getElementsByName(buttonIdentifier)[0]
    .addEventListener('click', assignedFunction)
}

let lastButton = null

const recordOperationButtonPress = (buttonIdentifier) => {
  document
    .getElementsByName(buttonIdentifier)[0]
    .addEventListener('click', () => {
      if (
        currentValueOperator !== null &&
        !refreshDisplay &&
        lastButton !== 'equal'
      ) {
        concludeOperation()
      }
      currentValueOperator = buttonIdentifier
      firstOperator = parseFloat(currentValue.replace(',', '.'))
      refreshDisplay = true
      lastButton = buttonIdentifier
    })
}

recordFunctionButtonPress('clean', reset)
recordFunctionButtonPress('equal', concludeOperation)
recordFunctionButtonPress('point', floatCurrentValue)
recordFunctionButtonPress('negate', negateInvertNumber)
recordOperationButtonPress('multiply')
recordOperationButtonPress('subtract')
recordOperationButtonPress('divide')
recordOperationButtonPress('sum')

document.getElementsByName('zero')[0].addEventListener('click', () => {
  pressNumber(0)
})
document.getElementsByName('one')[0].addEventListener('click', () => {
  pressNumber(1)
})
document.getElementsByName('two')[0].addEventListener('click', () => {
  pressNumber(2)
})
document.getElementsByName('three')[0].addEventListener('click', () => {
  pressNumber(3)
})
document.getElementsByName('four')[0].addEventListener('click', () => {
  pressNumber(4)
})
document.getElementsByName('five')[0].addEventListener('click', () => {
  pressNumber(5)
})
document.getElementsByName('six')[0].addEventListener('click', () => {
  pressNumber(6)
})
document.getElementsByName('seven')[0].addEventListener('click', () => {
  pressNumber(7)
})
document.getElementsByName('eight')[0].addEventListener('click', () => {
  pressNumber(8)
})
document.getElementsByName('nine')[0].addEventListener('click', () => {
  pressNumber(9)
})

document.addEventListener('keyup', (event) => {
  const keyName = event.key

  switch (keyName) {
    case 'Control':
      negateInvertNumber()
      break
    case 'Escape':
      reset()
      break
    case DecimalPoint:
      floatCurrentValue(keyName)
      break
    default:
      if (/[0-9]/.test(keyName)) {
        pressNumber(Number(keyName))
      }
  }
})

reset()