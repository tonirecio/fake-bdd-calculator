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
    const newNumber = actualNumber + num

    setDisplay(newNumber)
  }
}

const addPoint = () => {
  const actualNumber = display.innerHTML

  if (Number(actualNumber) % 1 === 0 || Number(actualNumber) === 0) {
    const newDisplay = actualNumber + ','

    setDisplay(newDisplay)
  }
}

const negateNumber = () => {
  const negated = Number(display.innerHTML) * -1

  setDisplay(negated)
}

/* Listeners for buttons */
document.getElementsByName('one')[0].addEventListener('click', () => {
  addNumber(1)
})

document.getElementsByName('two')[0].addEventListener('click', () => {
  addNumber(2)
})

document.getElementsByName('three')[0].addEventListener('click', () => {
  addNumber(3)
})

document.getElementsByName('four')[0].addEventListener('click', () => {
  addNumber(4)
})

document.getElementsByName('five')[0].addEventListener('click', () => {
  addNumber(5)
})

document.getElementsByName('six')[0].addEventListener('click', () => {
  addNumber(6)
})

document.getElementsByName('seven')[0].addEventListener('click', () => {
  addNumber(7)
})

document.getElementsByName('eight')[0].addEventListener('click', () => {
  addNumber(8)
})

document.getElementsByName('nine')[0].addEventListener('click', () => {
  addNumber(9)
})

document.getElementsByName('zero')[0].addEventListener('click', () => {
  addNumber(0)
})

document.getElementsByName('point')[0].addEventListener('click', () => {
  addPoint()
})

document.getElementsByName('negate')[0].addEventListener('click', () => {
  negateNumber()
})

document.getElementsByName('clean')[0].addEventListener('click', () => {
  reset()
})

/* Keyboard input */
document.addEventListener('keypress', (event) => {
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
