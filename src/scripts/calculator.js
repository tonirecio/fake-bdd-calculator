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

const addNum = (value) => {
  if (!isNaN(value)) {
    if (display.innerHTML === '0') {
      setDisplay(value)
    } else {
      setDisplay(display.innerHTML.concat(value))
    }
  } else {
    if (value === 'C') {
      reset()
    } else if (value === ',') {
      setDisplay(display.innerHTML.concat(value))
    } else if (value === 'negate') {
      setDisplay(parseInt(display.innerHTML) * -1)
    }
  }
}

const display = document.querySelector('div[name="display"] span')

const buttons = document.getElementsByName('keypad')[0].getElementsByTagName('button')
const listeners = (buttons) => {
  for (const button of buttons) {
    button.addEventListener('click', () => {
      addNum(button.innerHTML)
    })
  }
}

document.getElementsByName('negate')[0].addEventListener('click', () => {
  addNum('negate')
})

document.addEventListener('keyup', (key) => {
  console.log(key.key)
  if (!isNaN(key.key)) {
    addNum(key.key)
  } else {
    if (key.key === 'Control') {
      addNum('negate')
    } else if (key.key === 'Escape') {
      addNum('C')
    } else if (key.key === ",") {
      addNum(",")
    }
  }
})



document.getElementsByName('multiply')[0].addEventListener('click', () => {
  sayHello()
})
reset()
listeners(buttons)
