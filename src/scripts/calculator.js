const MAX_DIGITS_IN_DISPLAY = 10

const setDisplay = (value) => {
  display.innerHTML = value
}

const sayHello = () => {
  window.alert('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.')
}

const reset = () => {
  setDisplay('INTERNS')
}

const display = document.querySelector('div[name="display"] span')
document.getElementsByName('multiply')[0].addEventListener('click', () => {
  sayHello()
})
reset()

/* My Functions */
const addNumber = (num) => {
  const actualNumber = display.innerHTML

  if (Number(actualNumber) === 0) {
    setDisplay(num)
  } else {
    if (!tenNumbers()) {
      const newNumber = actualNumber + num

      setDisplay(newNumber)
    }
  }
}

const addPoint = () => {
  const actualNumber = display.innerHTML

  if ((Number(actualNumber) % 1 === 0 || Number(actualNumber) === 0) && !tenNumbers()) {
    const newDisplay = actualNumber + ','

    setDisplay(newDisplay)
  }
}

const negateNumber = () => {
  const value = display.innerHTML

  if (value !== '0' && value !== '0,') {
    const numbers = value.split(',')

    const positive = value.split('-')

    if (Number(numbers[0]) >= 0 && !positive[1]) {
      const negated = '-' + value

      setDisplay(negated)
    } else {
      const positive = value.split('-')

      setDisplay(positive[1])
    }
  }
}

/* Check if there are 10 numbers */
const tenNumbers = () => {
  const num = display.innerHTML.split('-')
  const decimals = display.innerHTML.split(',')
  let result = ''

  if (num[1]) {
    if (decimals[1]) {
      result = '' + num[1] + decimals[1]
    } else {
      result = '' + num[1]
    }
  } else {
    if (decimals[1]) {
      result = '' + decimals[0] + decimals[1]
    } else {
      result = '' + decimals[0]
    }
  }

  if (result.length >= 10) {
    return true
  } else {
    return false
  }
}

/* Listeners for buttons */
const buttons = document.getElementsByTagName('button')
const addNumberListeners = (button) => {
  for (const element of button) {
    if (Number(element.innerHTML) >= 0 && Number(element.innerHTML) <= 9) {
      const num = Number(element.innerHTML)

      element.addEventListener('click', () => {
        addNumber(num)
      })
    } else if (element.innerHTML === 'C') {
      element.addEventListener('click', () => {
        reset()
      })
    } else if (element.innerHTML === ',') {
      element.addEventListener('click', () => {
        addPoint()
      })
    } else if (element.name === 'negate') {
      element.addEventListener('click', () => {
        negateNumber()
      })
    }
  }
}

addNumberListeners(buttons)

/* Keyboard input */
document.addEventListener('keydown', (event) => {
  if (event.key >= 0 && event.key <= 9) {
    addNumber(event.key)
  } else if (event.key === ',') {
    addPoint()
  } else if (event.key === 'Control') {
    negateNumber()
  } else if (event.key === 'Escape') {
    reset()
  }
})
