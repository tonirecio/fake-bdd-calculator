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

const setDisplay = (value) => {
  const display = document.querySelector('div[name="display"] span')
  display.innerHTML = value
}

const disableButtonLogic = (status) => {
  switch (status) {
    case 'clear':
      disableNumericalButtonSet(false)
      disableButton('point', false)
      disableOperationButtonSet(false)
      disableButton('zero', true)
      disableNonOperationButtonSet(false)
      disableButton('negate', true)
      break
    case 'resolve':
      disableNumericalButtonSet(false)
      disableButton('point', false)
      disableOperationButtonSet(false)
      disableButton('negate', false)
      break
    case 'max_digits_in_display':
      disableNumericalButtonSet(true)
      disableButton('point', true)
      break
    case 'operator':
      disableNumericalButtonSet(false)
      disableButton('point', false)
      disableOperationButtonSet(false)
      disableButton('negate', true)
      break
    case 'enable_numericals':
      disableNumericalButtonSet(false)
      disableButton('negate', false)
      break
    case 'existing_point':
      disableButtonLogic('enable_numericals')
      disableButton('point', true)
      break
    case 'error':
      disableNumericalButtonSet(true)
      disableOperationButtonSet(true)
      disableNonOperationButtonSet(true)
      disableButton('clean', false)
      break
    case 'init':
      disableNumericalButtonSet(false)
      disableOperationButtonSet(false)
      disableNonOperationButtonSet(false)
      break
    default:
      console.warn('[WARNING] ' + status + ' logic state not contemplated / implemented.')
  }
}

const disableNumericalButtonSet = (boolStatus) => {
  disableButton('zero', boolStatus)
  disableButton('one', boolStatus)
  disableButton('two', boolStatus)
  disableButton('three', boolStatus)
  disableButton('four', boolStatus)
  disableButton('five', boolStatus)
  disableButton('six', boolStatus)
  disableButton('seven', boolStatus)
  disableButton('eight', boolStatus)
  disableButton('nine', boolStatus)
}

const disableOperationButtonSet = (boolStatus) => {
  disableButton('sum', boolStatus)
  disableButton('subtract', boolStatus)
  disableButton('multiply', boolStatus)
  disableButton('divide', boolStatus)
}

const disableNonOperationButtonSet = (boolStatus) => {
  disableButton('clean', boolStatus)
  disableButton('negate', boolStatus)
  disableButton('equal', boolStatus)
  disableButton('point', boolStatus)
}

const disableButton = (buttonName, boolStatus) => {
  document.getElementsByName(buttonName)[0].disabled = boolStatus
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
    // 3,3e-7
    if (displayValue.includes('e-')) {
      const indexOfE = displayValue.indexOf('e')
      const exponent = parseInt(displayValue.slice(indexOfE + 2))
      const mantissa = displayValue.slice(0, indexOfE).replace(',', '')
      displayValue = '0,' + '0'.repeat(exponent - 1) + mantissa
    }
  } else {
    displayValue = 'ERROR'
    disableButtonLogic('error')
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

const clear = () => {
  disableButtonLogic('clear')
  reset()
}

const resolve = () => {
  disableButtonLogic('resolve')
  completeOperation()
}

const negateCurrentNum = () => {
  currentNumber = -1 * currentNumber
}

const pressNumber = (buttonNumber) => {
  let currentNumberDisplayableString = currentNumberToDisplayableString()
  let currentNumberDisplayableStringSanitized = currentNumberDisplayableString.replace('-', '').replace(POINT_LOCALE, '')
  // avoid missing the second number on an operation
  if (currentOperation !== null) {
    pendingOperation = true
  }
  // main number logic
  if (clearDisplay || currentNumber === 'ERROR') {
    disableButtonLogic('enable_numericals')
    currentNumberDisplayableString = buttonNumber.toString()
    clearDisplay = false
  } else {
    if (currentNumberDisplayableStringSanitized.length < MAX_DIGITS_IN_DISPLAY) {
      disableButtonLogic('enable_numericals')
      if (pendingPoint) {
        if (buttonNumber !== 0 && buttonNumber !== '0') {
          currentNumberDisplayableString += buttonNumber
          pendingZeros = 0
          pendingPoint = false
        } else {
          pendingZeros++
        }
      } else {
        if (currentNumber !== 0 && currentNumberDisplayableString.includes(POINT_LOCALE) && (buttonNumber === 0 || buttonNumber === '0')) {
          pendingZeros++
        } else {
          currentNumberDisplayableString += buttonNumber
          pendingZeros = 0
        }
      }
    }
  }
  currentNumberDisplayableStringSanitized = currentNumberDisplayableString.replace('-', '').replace(POINT_LOCALE, '')
  if (currentNumberDisplayableStringSanitized.length + 1 > MAX_DIGITS_IN_DISPLAY) {
    disableButtonLogic('max_digits_in_display')
  }
  currentNumber = parseFloat(currentNumberDisplayableString.replace(POINT_LOCALE, '.'))
}

const floatCurrentNum = () => {
  const currentNumberDisplayableString = currentNumberToDisplayableString()
  if (!currentNumberDisplayableString.includes(POINT_LOCALE) && currentNumberDisplayableString.length < MAX_DIGITS_IN_DISPLAY) {
    disableButtonLogic('enable_numericals')
    disableButton('point', true)
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
      case null:
        resultNum = currentNumber
        pendingPoint = false
        pendingZeros = 0
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
    disableButtonLogic('operator')
    currentOperation = buttonName
    previousNumber = currentNumber
    clearDisplay = true
  })
}

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

  addFunctionButtonClickEvent('clean', clear)
  addFunctionButtonClickEvent('negate', negateCurrentNum)
  addFunctionButtonClickEvent('point', floatCurrentNum)
  addFunctionButtonClickEvent('equal', resolve)

  addOperationButtonClickEvent('sum')
  addOperationButtonClickEvent('multiply')
  addOperationButtonClickEvent('subtract')
  addOperationButtonClickEvent('divide')
  // force enabled buttons at start
  disableButtonLogic('init')
}

// INITIALIZATION
init()
reset()
