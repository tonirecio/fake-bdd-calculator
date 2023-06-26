/// Adrian Lopez Villalba       --      Travelport
///
/// yarn test tests/features/calculator.feature --tags "@sc_NonOpScreenBtn or @sc_NumberCheck or @sc_DigitExceedTest or @sc_Operations or @sc_BeforeEqual or @sc_LongNumber or @sc_OverlapOps or @sc_NewOp or @sc_ConcatResult or @sc_ConcatResultPlus"

const MAX_DIGITS_IN_DISPLAY = 10
const POINT_LOCALE = ','

let currentOperation
let previousNumber
let currentNumber
let pendingPoint
let pendingZeros
let clearDisplay
let pendingOperation

const init = () => {
  // KEYBOARD EVENT LISTENER
  document.addEventListener('keyup', (event) => {
    const keyName = event.key
    switch (keyName) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        pressNumber(keyName)
        break
      case 'Escape':
        reset()
        break
      case 'Control':
        negateCurrentNum()
        break
      case POINT_LOCALE:
        floatCurrentNum()
        break
      default:
        console.warn('[WARNING] ' + keyName + ' keyboard event has not been implemented yet.')
    }
    setDisplay(currentNumberToDisplayableString())
  })
  // ON-SCREEN BUTTON EVENTS
  addNumericalButtonClickEvent('one', 1)
  addNumericalButtonClickEvent('two', 2)
  addNumericalButtonClickEvent('three', 3)
  addNumericalButtonClickEvent('four', 4)
  addNumericalButtonClickEvent('five', 5)
  addNumericalButtonClickEvent('six', 6)
  addNumericalButtonClickEvent('seven', 7)
  addNumericalButtonClickEvent('eight', 8)
  addNumericalButtonClickEvent('nine', 9)
  addNumericalButtonClickEvent('zero', 0)

  addFunctionButtonClickEvent('clean', reset)
  addFunctionButtonClickEvent('negate', negateCurrentNum)
  addFunctionButtonClickEvent('point', floatCurrentNum)
  addFunctionButtonClickEvent('equal', completeOperation)

  addOperationButtonClickEvent('sum')
  addOperationButtonClickEvent('multiply')
  addOperationButtonClickEvent('subtract')
  addOperationButtonClickEvent('divide')
}

const setDisplay = (value) => {
  const display = document.querySelector('div[name="display"] span')
  display.innerHTML = value
}

const currentNumberToDisplayableString = () => {
  let displayValue
  if (isFinite(currentNumber)) {
    displayValue = currentNumber.toString()
    if (pendingPoint) {
      displayValue += POINT_LOCALE
    } else {
      displayValue = displayValue.replace('.', POINT_LOCALE)
    }

    if (pendingZeros > 0) {
      displayValue = displayValue + '0'.repeat(pendingZeros)
    }
  } else {
    displayValue = 'ERROR'
  }
  return displayValue
}

const reset = () => {
  currentOperation = null
  pendingOperation = false
  previousNumber = 0
  currentNumber = 0.0
  pendingPoint = false
  pendingZeros = 0
  clearDisplay = false

  setDisplay(currentNumber)
}

const negateCurrentNum = () => {
  currentNumber = -1 * currentNumber
}

const pressNumber = (buttonNumber) => {
  let currentNumberDisplayableString = currentNumberToDisplayableString()
  const currentNumberDisplayableStringSanitized = currentNumberDisplayableString.replace('-', '').replace(POINT_LOCALE, '')
  if (currentOperation !== null) {
    pendingOperation = true
  }
  if (clearDisplay || currentNumber === 'ERROR') {
    currentNumberDisplayableString = buttonNumber.toString()
    clearDisplay = false
  } else {
    if (currentNumberDisplayableStringSanitized.length < MAX_DIGITS_IN_DISPLAY) {
      if (pendingPoint) {
        if (buttonNumber !== 0) {
          currentNumberDisplayableString += buttonNumber
          pendingZeros = 0
          pendingPoint = false
        } else {
          pendingZeros = pendingZeros + 1
        }
      } else {
        currentNumberDisplayableString += buttonNumber
      }
    }
  }
  currentNumber = parseFloat(currentNumberDisplayableString.replace(POINT_LOCALE, '.'))
}

const floatCurrentNum = () => {
  const currentNumberDisplayableString = currentNumberToDisplayableString()
  if (!currentNumberDisplayableString.includes(POINT_LOCALE) && currentNumberDisplayableString.length < MAX_DIGITS_IN_DISPLAY) {
    pendingPoint = true
  }
}

const completeOperation = () => {
  let resultNum = null
  if (currentOperation !== null && clearDisplay) {
    // asked to complete operation when no second value
    resultNum = NaN
  } else {
    switch (currentOperation) {
      case 'sum':
        resultNum = previousNumber + currentNumber
        break
      case 'subtract':
        resultNum = previousNumber - currentNumber
        break
      case 'multiply':
        resultNum = previousNumber * currentNumber
        break
      case 'divide':
        resultNum = previousNumber / currentNumber
        break
      default:
        console.warn('[WARNING] ' + currentOperation + ' has not been implemented yet.')
    }
    if (Math.abs(resultNum) < Math.pow(10, MAX_DIGITS_IN_DISPLAY)) {
      // character length of the integer number (including - sign if applicable)
      const integerLength = (Math.round(resultNum)).toString().length
      // parseFloat forces x to not have trailing 0s
      resultNum = parseFloat(resultNum.toFixed(MAX_DIGITS_IN_DISPLAY - integerLength))
    } else {
      resultNum = NaN
    }
  }

  currentNumber = resultNum
  currentOperation = null
  pendingOperation = false
  clearDisplay = true
}

const addNumericalButtonClickEvent = (buttonName, number) => {
  document.getElementsByName(buttonName)[0].addEventListener('click', () => {
    pressNumber(number)
    setDisplay(currentNumberToDisplayableString())
  })
}

const addFunctionButtonClickEvent = (buttonName, assignedFunction) => {
  document.getElementsByName(buttonName)[0].addEventListener('click', () => {
    assignedFunction()
    setDisplay(currentNumberToDisplayableString())
  })
}

const addOperationButtonClickEvent = (buttonName) => {
  document.getElementsByName(buttonName)[0].addEventListener('click', () => {
    if (pendingOperation) {
      completeOperation()
      setDisplay(currentNumberToDisplayableString())
    }
    currentOperation = buttonName
    previousNumber = currentNumber
    clearDisplay = true
  })
}

// INITIALIZATION
init()
reset()
