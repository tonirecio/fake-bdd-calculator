/// Adrian Lopez Villalba       --      Travelport
///
/// yarn test tests/features/calculator.feature --tags "@sc_NonOpScreenBtn or @sc_NumberCheck or @sc_DigitExceedTest or @sc_Operations or @sc_BeforeEqual or @sc_LongNumber or @sc_OverlapOps or @sc_NewOp"

const MAX_DIGITS_IN_DISPLAY = 10
const pointLocale = document.getElementsByName('point')[0].innerHTML
const display = document.querySelector('div[name="display"] span')
let currentOp
let prevNum
let clearDisplay = false

// function setDisplay (value) { [...] }
const setDisplay = (value) => {
  display.innerHTML = value
}

// const sayHello = () => {
//   console.log('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.')
//   // window.alert([...])
// }

// RESET CALCULATOR
const reset = () => {
  prevNum = 0
  currentOp = null
  setDisplay(prevNum)
}

// SHARED FUNCTIONS
const negateDisplay = () => {
  let displayNum = display.innerHTML
  if (displayNum !== '0' && displayNum !== '0,') {
    if (displayNum.startsWith('-')) {
      displayNum = displayNum.replace('-', '')
    } else {
      displayNum = '-' + displayNum
    }
  }

  setDisplay(displayNum)
}

const pressNumber = (buttonContent) => {
  let displayNum = display.innerHTML

  if (clearDisplay) {
    displayNum = buttonContent
    clearDisplay = false
  } else {
    if (displayNum.length < MAX_DIGITS_IN_DISPLAY || (displayNum.includes(pointLocale) && displayNum.length <= MAX_DIGITS_IN_DISPLAY)) {
      if (displayNum !== '0') {
        displayNum += buttonContent
      } else {
        displayNum = buttonContent
      }
    }
  }

  setDisplay(displayNum)
}

const floatDisplay = () => {
  const displayNum = display.innerHTML
  if (!displayNum.includes(pointLocale) && displayNum.length < MAX_DIGITS_IN_DISPLAY) {
    setDisplay(displayNum + pointLocale)
  }
}

// SCREEN BUTTONS
const keypad = document.querySelectorAll('div[name="keypad"] button')
keypad.forEach(element => {
  const buttonContent = parseInt(element.innerHTML)

  if (isNaN(buttonContent)) {
    const elementName = element.getAttribute('name')
    if (elementName === 'clean') {
      element.addEventListener('click', () => {
        reset()
      })
    } else if (elementName === 'negate') {
      element.addEventListener('click', () => {
        negateDisplay()
      })
    } else if (elementName === 'point') {
      element.addEventListener('click', () => {
        floatDisplay()
      })
    } else if (elementName === 'sum') {
      element.addEventListener('click', () => {
        currentOp = 'sum'
        prevNum = parseFloat(display.innerHTML.replace(',', '.'))
        clearDisplay = true
      })
    } else if (elementName === 'subtract') {
      element.addEventListener('click', () => {
        currentOp = 'subtract'
        prevNum = parseFloat(display.innerHTML.replace(',', '.'))
        clearDisplay = true
      })
    } else if (elementName === 'multiply') {
      element.addEventListener('click', () => {
        currentOp = 'multiply'
        prevNum = parseFloat(display.innerHTML.replace(',', '.'))
        clearDisplay = true
      })
    } else if (elementName === 'divide') {
      element.addEventListener('click', () => {
        currentOp = 'divide'
        prevNum = parseFloat(display.innerHTML.replace(',', '.'))
        clearDisplay = true
      })
    } else if (elementName === 'equal') {
      element.addEventListener('click', () => {
        const currentNum = parseFloat(display.innerHTML.replace(',', '.'))
        let resultNum = null
        let resultOp = null

        console.log('----------------------------EQUAL')
        if (currentOp === 'sum') {
          resultNum = prevNum + currentNum
          console.log(resultNum)
        } else if (currentOp === 'subtract') {
          resultNum = prevNum - currentNum
          console.log(resultNum)
        } else if (currentOp === 'multiply') {
          resultNum = prevNum * currentNum
          console.log(resultNum)
        } else if (currentOp === 'divide') {
          resultNum = prevNum / currentNum
          console.log(resultNum)
        }

        if (Math.abs(resultNum) < Math.pow(10, MAX_DIGITS_IN_DISPLAY)) {
        // character length of the integer number (including - sign if applicable)
          const integerLength = (Math.round(resultNum)).toString().length
          // forcing this number to not have trailing of 0s (1 *) and have a maximum
          // of MAX_DIGITS_IN_DISPLAY number characters between its integer and
          // decimal part
          const fixedNum = 1 * resultNum.toFixed(MAX_DIGITS_IN_DISPLAY - integerLength)
          // set locale replacement
          resultOp = fixedNum.toString().replace('.', ',')
        } else {
          resultOp = 'ERROR'
        }

        clearDisplay = true
        setDisplay(resultOp)
      })
    }
  } else {
    element.addEventListener('click', () => {
      pressNumber(buttonContent)
    })
  }
})

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
