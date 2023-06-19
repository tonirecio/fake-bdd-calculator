const MAX_DIGITS_IN_DISPLAY = 10

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
  setDisplay(display.innerHTML.toString() + content.toString())
}

const display = document.querySelector('div[name="display"] span')
document.getElementsByName('multiply')[0].addEventListener('click', () => {
  sayHello()
})
reset()

// Button handling
const buttons = document.querySelectorAll('div[name="keypad"] button')

buttons.forEach(button => button.addEventListener('click', () => {
  if (!isNaN(button.innerHTML)) {
    if (display.innerHTML === '0') {
      setDisplay(button.innerHTML.toString())
    } else {
      append(button.innerHTML)
    }
  } else {
    switch (button.getAttribute('name')) {
      case 'point':
        if (!display.innerHTML.includes(button.innerHTML)) {
          append(button.innerHTML)
        }
        break

      case 'clean':
        reset()
        break

      case 'negate':
        negate()
        break
      default:
        console.log('Error')
    }
  }
})
)

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
