/// Adrian Lopez Villalba       --      Travelport
///
/// yarn test tests/features/calculator.feature --tags "@sc_NonOpScreenBtn or @sc_NumberCheck or @sc_DigitExceedTest or @sc_Operations or @sc_BeforeEqual or @sc_LongNumber or @sc_OverlapOps or @sc_NewOp or @sc_ConcatResult or @sc_ConcatResultPlus"

const MAX_DIGITS_IN_DISPLAY = 10
const POINT_LOCALE = ','

let currentOperation = null
let pendingOperation = false
let previousNumber = 0
let currentNumber = 0.0
let pendingPoint = false
let pendingZeros = 0
let clearDisplay = false

const setDisplay = (value) => {
  const display = document.querySelector('div[name="display"] span')
  display.innerHTML = value
}

const setStateButtonLogic = (status) => {
  switch (status) {
    case 'clear':
      setStateNumericalButtonSet(true)
      setStateButton('point', true)
      setStateOperationButtonSet(true)
      setStateButton('zero', false)
      setStateNonOperationButtonSet(true)
      setStateButton('negate', false)
      break
    case 'resolve':
      setStateNumericalButtonSet(true)
      setStateButton('point', true)
      setStateOperationButtonSet(true)
      setStateButton('negate', true)
      break
    case 'max_digits_in_display':
      setStateNumericalButtonSet(false)
      setStateButton('point', false)
      break
    case 'operator':
      setStateNumericalButtonSet(true)
      setStateButton('point', true)
      setStateOperationButtonSet(true)
      setStateButton('negate', false)
      break
    case 'enable_numericals':
      setStateNumericalButtonSet(true)
      setStateButton('negate', true)
      break
    case 'existing_point':
      setStateButtonLogic('enable_numericals')
      setStateButton('point', false)
      break
    case 'error':
      setStateAllButtons(false)
      setStateButton('clean', true)
      break
    case 'init':
      setStateAllButtons(true)
      break
    default:
      console.warn('[WARNING] ' + status + ' logic state not contemplated / implemented.')
  }
}
const setStateAllButtons = (boolStatus) => {
  setStateNumericalButtonSet(boolStatus)
  setStateOperationButtonSet(boolStatus)
  setStateNonOperationButtonSet(boolStatus)
}

const setStateNumericalButtonSet = (boolStatus) => {
  setStateButton('zero', boolStatus)
  setStateButton('one', boolStatus)
  setStateButton('two', boolStatus)
  setStateButton('three', boolStatus)
  setStateButton('four', boolStatus)
  setStateButton('five', boolStatus)
  setStateButton('six', boolStatus)
  setStateButton('seven', boolStatus)
  setStateButton('eight', boolStatus)
  setStateButton('nine', boolStatus)
}

const setStateOperationButtonSet = (boolStatus) => {
  setStateButton('sum', boolStatus)
  setStateButton('subtract', boolStatus)
  setStateButton('multiply', boolStatus)
  setStateButton('divide', boolStatus)
}

const setStateNonOperationButtonSet = (boolStatus) => {
  setStateButton('clean', boolStatus)
  setStateButton('negate', boolStatus)
  setStateButton('equal', boolStatus)
  setStateButton('point', boolStatus)
}

const setStateButton = (buttonName, boolStatus) => {
  document.getElementsByName(buttonName)[0].disabled = !boolStatus
}

const highlightButtonLogic = (operationTrigger) => {
    highlightButton('sum', false)
    highlightButton('subtract', false)
    highlightButton('multiply', false)
    highlightButton('divide', false)
  if (operationTrigger !== 'clean' && operationTrigger !== 'equal'){
    highlightButton(operationTrigger, true)
  } 
}

const highlightButton = (buttonName, boolStatus) => {
  if (boolStatus) {
    document.getElementsByName(buttonName)[0].classList.add('highlighted')
  } else {
    document.getElementsByName(buttonName)[0].classList.remove('highlighted')
  }
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

    if (displayValue.includes('e-')) {
      displayValue = decimalScientificToString(displayValue) + '0'.repeat(pendingZeros)
    } else {
      if (pendingZeros > 0) {
        displayValue = displayValue + '0'.repeat(pendingZeros)
      }
    }
  } else {
    displayValue = 'ERROR'
    setStateButtonLogic('error')
  }
  return displayValue
}

const sanitizeString = (currNumString) => {
  return currNumString.replace('-', '').replace(POINT_LOCALE, '')
}

const decimalScientificToString = (displayValue) => {
  const indexOfE = displayValue.indexOf('e')
  const exponent = parseInt(displayValue.slice(indexOfE + 2))
  const mantissa = displayValue.slice(0, indexOfE).replace(',', '')
  displayValue = '0,' + '0'.repeat(exponent - 1) + mantissa
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
  setStateButtonLogic('clear')
  reset()
}

const resolve = () => {
  setStateButtonLogic('resolve')
  completeOperation()
}

const negateCurrentNum = () => {
  currentNumber = -1 * currentNumber
}

const pressNumber = (buttonNumber) => {
  let currNumString = currentNumberToDisplayableString()
  let currNumStringSanitized = sanitizeString(currNumString)
  // avoid missing the second number on an operation
  if (currentOperation !== null) {
    pendingOperation = true
  }
  // main number logic
  if (clearDisplay || currentNumber === 'ERROR') {
    setStateButtonLogic('enable_numericals')
    currNumString = buttonNumber.toString()
    pendingZeros = 0
    pendingPoint = false
    clearDisplay = false
  } else {
    if (currNumStringSanitized.length < MAX_DIGITS_IN_DISPLAY) {
      setStateButtonLogic('enable_numericals')
      if (pendingPoint) {
        if (buttonNumber !== 0 && buttonNumber !== '0') {
          currNumString += buttonNumber
          pendingZeros = 0
          pendingPoint = false
        } else {
          pendingZeros++
        }
      } else {
        if (currentNumber !== 0 &&
          currNumString.includes(POINT_LOCALE) &&
          (buttonNumber === 0 || buttonNumber === '0')) {
          pendingZeros++
        } else {
          currNumString += buttonNumber
          pendingZeros = 0
        }
      }
    }
  }
  currentNumber = parseFloat(currNumString.replace(POINT_LOCALE, '.'))

  currNumStringSanitized = sanitizeString(currentNumberToDisplayableString())
  if (currNumStringSanitized.length >= MAX_DIGITS_IN_DISPLAY) {
    setStateButtonLogic('max_digits_in_display')
  }
}

const floatCurrentNum = () => {
  const currentNumberDisplayableString = currentNumberToDisplayableString()
  if (!currentNumberDisplayableString.includes(POINT_LOCALE) && currentNumberDisplayableString.length < MAX_DIGITS_IN_DISPLAY) {
    setStateButtonLogic('existing_point')
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
        break
      default:
        console.warn('[WARNING] ' + currentOperation + ' has not been implemented yet.')
    }
    if (Math.abs(resultNum) < Math.pow(10, MAX_DIGITS_IN_DISPLAY)) {
      // character length of the whole number (including - sign if applicable)
      const wholeNumberLength = (Math.round(resultNum)).toString().length
      // result number has MAX_DIGITS between whole and fractional
      // parseFloat done to avoid trailing 0s
      resultNum = parseFloat(resultNum.toFixed(MAX_DIGITS_IN_DISPLAY - wholeNumberLength))
    } else {
      resultNum = NaN
    }
  }

  currentNumber = resultNum
  currentOperation = null
  pendingOperation = false
  pendingPoint = false
  pendingZeros = 0
  clearDisplay = true
}

const buttonOperation = (buttonName) => {
  if (pendingOperation) {
    completeOperation()
    setDisplay(currentNumberToDisplayableString())
  }
  setStateButtonLogic('operator')
  currentOperation = buttonName
  previousNumber = currentNumber
  clearDisplay = true
}

const addNumericalButtonClickEvent = (buttonName, number) => {
  document.getElementsByName(buttonName)[0].addEventListener('click', () => {
    pressNumber(number)
    setDisplay(currentNumberToDisplayableString())
  })
}

const addFunctionButtonClickEventWithHighlightLogic = (buttonName, assignedFunction) => {
  document.getElementsByName(buttonName)[0].addEventListener('click', () => {
    assignedFunction()
    setDisplay(currentNumberToDisplayableString())
    highlightButtonLogic(buttonName)
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
    buttonOperation(buttonName)
    highlightButtonLogic(buttonName)
  })
}

const init = () => {
  // KEYBOARD EVENT LISTENER
  document.addEventListener('keypress', (event) => {
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
      case '+':
        buttonOperation('sum')
        highlightButtonLogic('sum')
        break
      case '-':
        buttonOperation('subtract')
        highlightButtonLogic('subtract')
        break
      case '*':
        buttonOperation('multiply')
        highlightButtonLogic('multiply')
        break
      case '/':
        buttonOperation('divide')
        highlightButtonLogic('divide')
        break
      case POINT_LOCALE:
        floatCurrentNum()
        break
      case 'Enter':
        // handled by both keyup and keypress event
        resolve()
        highlightButtonLogic('equal')
        event.preventDefault()
        break
      default:
        console.warn('[WARNING] ' + keyName + ' keypress event not planned')
    }
    setDisplay(currentNumberToDisplayableString())
  })
  // special keys that interact with the keyup event
  document.addEventListener('keyup', (event) => {
    const keyName = event.key
    switch (keyName) {
      case ' ':
      case 'Enter':
        resolve()
        highlightButtonLogic('equal')
        event.preventDefault()
        break
      case 'Escape':
        reset()
        highlightButtonLogic('clean')
        break
      case 'Control':
        negateCurrentNum()
        break
      default:
        break
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

  addFunctionButtonClickEventWithHighlightLogic('clean', clear)
  addFunctionButtonClickEventWithHighlightLogic('equal', resolve)
  addFunctionButtonClickEvent('negate', negateCurrentNum)
  addFunctionButtonClickEvent('point', floatCurrentNum)

  addOperationButtonClickEvent('sum')
  addOperationButtonClickEvent('multiply')
  addOperationButtonClickEvent('subtract')
  addOperationButtonClickEvent('divide')
  // force enabled buttons at start
  setStateButtonLogic('init')
}

// INITIALIZATION
init()
reset()
