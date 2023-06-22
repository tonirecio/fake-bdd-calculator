/// Adrian Lopez Villalba       --      Travelport
///
/// yarn test tests/features/calculator.feature --tags "@sc_NonOpScreenBtn or @sc_NumberCheck or @sc_DigitExceedTest or @sc_Operations or @sc_BeforeEqual or @sc_LongNumber or @sc_OverlapOps or @sc_NewOp or @sc_ConcatResult or @sc_ConcatResultPlus"

const MAX_DIGITS_IN_DISPLAY = 10
const pointLocale = ','
let currentOp
let prevNum
let displayValue = '0'
let clearDisplay = false

const setDisplay = (value) => {
  const display = document.querySelector('div[name="display"] span')
  const localeValue = value.replace('.', pointLocale)
  display.innerHTML = localeValue
}

//////////////////// FUNCTIONS
const reset = () => {
  prevNum = 0
  displayValue = '0'
  currentOp = null
  clearDisplay = false
  setDisplay(displayValue)
}

const negateDisplay = () => {
  if (displayValue !== '0' && displayValue !== '0.') {
    if (displayValue.startsWith('-')) {
      displayValue = displayValue.replace('-', '')
    } else {
      displayValue = '-' + displayValue
    }
  }
  setDisplay(displayValue)
}

const pressNumber = (buttonContent) => {
  if (clearDisplay) {
    displayValue = buttonContent
    clearDisplay = false
  } else {
    if (displayValue.length < MAX_DIGITS_IN_DISPLAY || (displayValue.includes('.') && displayValue.length <= MAX_DIGITS_IN_DISPLAY)) {
      if (displayValue !== '0') {
        displayValue += buttonContent
      } else {
        displayValue = buttonContent
      }
    }
  }
  setDisplay(displayValue)
}

const floatDisplay = () => {
  if (!displayValue.includes('.') && displayValue.length < MAX_DIGITS_IN_DISPLAY) {
    displayValue += '.'
  }
  setDisplay(displayValue)
}

const completeOp = () => {
  const currentNum = parseFloat(displayValue)
  let resultNum = null
  let resultOp = null
  switch (currentOp) {
    case 'sum':
      resultNum = prevNum + currentNum
      break
    case 'subtract':
      resultNum = prevNum - currentNum
      break
    case 'multiply':
      resultNum = prevNum * currentNum
      break
    case 'divide':
      resultNum = prevNum / currentNum
      break
    default:
      console.log('[ERROR] ' + currentOp + ' has not been implemented yet.')
  }
  if (Math.abs(resultNum) < Math.pow(10, MAX_DIGITS_IN_DISPLAY)) {
    // character length of the integer number (including - sign if applicable)
    const integerLength = (Math.round(resultNum)).toString().length
    // (1 * x) forces x to not have trailing 0s
    resultOp = (1 * resultNum.toFixed(MAX_DIGITS_IN_DISPLAY - integerLength)).toString()
  } else {
    resultOp = 'ERROR'
  }

  displayValue = resultOp
  currentOp = null
  clearDisplay = true
  setDisplay(displayValue)
}

const addNumericalButtonPress = (buttonName, number) => {
  document.getElementsByName(buttonName)[0].addEventListener('click', () => { pressNumber(number) })
}

const addFunctionButtonPress = (buttonName, assignedFunction) => {
  document.getElementsByName(buttonName)[0].addEventListener('click', assignedFunction)
}

const addOperationButtonPress = (buttonName) => {
  document.getElementsByName(buttonName)[0].addEventListener('click', () => {
    if(currentOp !== null) {
      completeOp()
    }
    currentOp = buttonName
    prevNum = parseFloat(displayValue.replace(',', '.'))
    clearDisplay = true
  })
}

addNumericalButtonPress('one', '1')
addNumericalButtonPress('two', '2')
addNumericalButtonPress('three', '3')
addNumericalButtonPress('four', '4')
addNumericalButtonPress('five', '5')
addNumericalButtonPress('six', '6')
addNumericalButtonPress('seven', '7')
addNumericalButtonPress('eight', '8')
addNumericalButtonPress('nine', '9')
addNumericalButtonPress('zero', '0')

addFunctionButtonPress('clean', reset)
addFunctionButtonPress('negate', negateDisplay)
addFunctionButtonPress('point', floatDisplay)
addFunctionButtonPress('equal', completeOp)

addOperationButtonPress('sum')
addOperationButtonPress('multiply')
addOperationButtonPress('subtract')
addOperationButtonPress('divide')



// NON-OP KEYBOARD
document.addEventListener('keyup', (event) => {
  const keyName = event.key

  if (isNaN(keyName)) {
    if (keyName === 'Escape') {
      reset()
    } else if (keyName === 'Control') {
      negateDisplay()
    } else if (keyName === pointLocale) {
      floatDisplay(keyName)
    }
  } else {
    pressNumber(keyName)
  }
})

reset()
