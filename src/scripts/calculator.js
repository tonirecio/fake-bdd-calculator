const MAX_DIGITS_IN_DISPLAY = 10
let currentOperation = null
let previousOperand = null

const setDisplay = (value) => {
  display.innerHTML = value
}

const sayHello = () => {
  window.alert('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.')
}

const reset = () => {
  setDisplay(0)
}

const negate = () => {
  if (display.innerHTML !== '0' && display.innerHTML !== '0,') {
    if (display.innerHTML[0] === '-') {
      display.innerHTML = display.innerHTML.substring(1)
    } else {
      display.innerHTML = '-' + display.innerHTML
    }
  }
}

const append = (content) => {
  if (display.innerHTML.replace(',', '').replace('-', '').length < MAX_DIGITS_IN_DISPLAY) {
    setDisplay(display.innerHTML.toString() + content.toString())
  }
}

const writeNumber = (button) => {
  if (display.innerHTML === '0') {
    setDisplay(button.innerHTML.toString())
  } else {
    append(button.innerHTML)
  }
}

const performOperation = () => {
  if (previousOperand !== null) {
    const currentOperand = Number(display.innerHTML.replace(',', '.'))
    let result = 'ERROR'
    if (currentOperation === 'sum') {
      result = previousOperand + currentOperand
    } else if (currentOperation === 'subtract') {
      result = previousOperand - currentOperand
    } else if (currentOperation === 'multiply') {
      result = previousOperand * currentOperand
    } else if (currentOperation === 'divide') {
      result = previousOperand / currentOperand
    }
    result = formatResult(result)
    setDisplay(result)
  }
}

const formatResult = (result) => {
  if (result > Math.pow(10, MAX_DIGITS_IN_DISPLAY)) result = 'ERROR'
  if (result !== 'ERROR') {
    if (result.toString().replace('.', '').replace('-', '').length > MAX_DIGITS_IN_DISPLAY) {
      const integerPartDigits = parseInt(result.toString()).toString().length
      result = 1 * result.toFixed(MAX_DIGITS_IN_DISPLAY - integerPartDigits)
    }
    result = result.toString().replace('.', ',')
    console.log('result3' + result)
  }
  return result
}

const display = document.querySelector('div[name="display"] span')
document.getElementsByName('multiply')[0].addEventListener('click', () => {
  sayHello()
})
reset()

// Button handling
const buttons = document.querySelectorAll('div[name="keypad"] button')

buttons.forEach(button => {
  if (!isNaN(button.innerHTML)) {
    button.addEventListener('click', () => {
      writeNumber(button)
    })
  } else {
    switch (button.getAttribute('name')) {
      case 'point':
        button.addEventListener('click', () => {
          if (!display.innerHTML.includes(button.innerHTML)) {
            append(button.innerHTML)
          }
        })
        break

      case 'clean':
        button.addEventListener('click', reset)
        break

      case 'negate':
        button.addEventListener('click', negate)
        break

      case 'equal':
        button.addEventListener('click', performOperation)
        break

      default:
        button.addEventListener('click', () => {
          currentOperation = button.getAttribute('name')
          previousOperand = Number(display.innerHTML.replace(',', '.'))
          reset()
        })
    }
  }
})

// Keyboard handling
document.addEventListener('keydown', (event) => {
  const name = event.key
  if (!isNaN(name)) {
    if (display.innerHTML === '0') {
      setDisplay(name)
    } else {
      append(name)
    }
  } else {
    if (name === ',') {
      if (!display.innerHTML.includes(',')) { append(',') }
    } else if (name === 'Escape') {
      reset()
    } else if (name === 'Control') {
      negate()
    }
  }
})
