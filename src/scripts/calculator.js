const MAX_DIGITS_IN_DISPLAY = 10

// function setDisplay (value) { [...] }
const setDisplay = (value) => {
  display.innerHTML = value
}

// SAY HELLO
const sayHello = () => {
  console.log('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.')
  // window.alert([...])
}

// RESET CALCULATOR
const reset = () => {
  setDisplay(0)
}

// SHARED FUNCTIONS
function negateDisplay() {
  let displayNum = display.innerHTML
  if (displayNum !== '0' && displayNum !== '0,') {
    if (displayNum.startsWith("-")) {
      displayNum = displayNum.replace("-", "")
    } else {
      displayNum = "-" + displayNum
    }
  }

  setDisplay(displayNum)
}

function pressNumber(buttonContent) {
  let displayNum = display.innerHTML
  if (displayNum !== '0') {
    displayNum += buttonContent
  } else {
    displayNum = buttonContent
  }
  setDisplay(displayNum)
}

function floatDisplay(pointType) {
  const displayNum = display.innerHTML
  if (!displayNum.includes(pointType)) {
    setDisplay(displayNum + pointType)
  }
}

// SCREEN OP BUTTONS
const display = document.querySelector('div[name="display"] span')
document.getElementsByName('multiply')[0].addEventListener('click', () => {
  sayHello()
})

// SCREEN NON-OP BUTTONS
const keypad = document.querySelectorAll('div[name="keypad"] button')
keypad.forEach(element => {
  const buttonContent = parseInt(element.innerHTML)

  if (isNaN(buttonContent)) {
    if (element.getAttribute('name') === 'clean') {
      element.addEventListener('click', () => {
        setDisplay(0)
      })
    } else if (element.getAttribute('name') === 'negate') {
      element.addEventListener('click', () => {
        negateDisplay()
      })
    } else if (element.getAttribute('name') === 'point') {
      element.addEventListener('click', () => {
        floatDisplay(element.innerHTML)
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
      setDisplay(0)
    } else if (keyName === 'Control') {
      negateDisplay()
    } else if (keyName === '.' || keyName === ',') {
      floatDisplay(keyName)
    }
  } else {
    pressNumber(keyName)
  }
})

reset()
