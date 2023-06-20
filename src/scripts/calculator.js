const MAX_DIGITS_IN_DISPLAY = 10

const getDisplay = () => {
  const num = display.innerHTML
  return (num.replace(',', '.'))
}

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
  if (display.innerHTML === '0') {
    setDisplay(value)
  } else {
    setDisplay(display.innerHTML.concat(value))
  }
}

const negateNum = () => {
  let num = display.innerHTML
  if (Number(getDisplay()) !== 0) {
    if (num.startsWith('-')) {
      num = num.slice(1)
    } else {
      num = '-' + num
    }
    setDisplay(num)
  }
}

const addPoint = () => {
  const num = display.innerHTML
  if (!num.includes(',')) {
    setDisplay(num.concat(','))
  }
}

// Buttons events

const buttons = document.getElementsByName('keypad')[0].getElementsByTagName('button')
const listeners = (buttons) => {
  for (const button of buttons) {
    button.addEventListener('click', () => {
      if (!isNaN(button.innerHTML)) {
        addNum(button.innerHTML)
      } else {
        if (button.innerHTML === 'C') {
          reset()
        } else if (button.innerHTML === ',') {
          addPoint()
        } else if (button.innerHTML === 'negate') {
          negateNum()
        }
      }
    })
  }
}

document.getElementsByName('negate')[0].addEventListener('click', () => {
  negateNum()
})

// Keys events

document.addEventListener('keyup', (key) => {
  console.log(key.key)
  if (!isNaN(key.key)) {
    addNum(key.key)
  } else {
    if (key.key === 'Control') {
      negateNum()
    } else if (key.key === 'Escape') {
      reset()
    } else if (key.key === ',') {
      addPoint()
    }
  }
})

document.getElementsByName('multiply')[0].addEventListener('click', () => {
  sayHello()
})

const display = document.querySelector('div[name="display"] span')

reset()
listeners(buttons)
