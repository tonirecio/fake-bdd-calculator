const MAX_DIGITS_IN_DISPLAY = 10
const DEFAULT_DISPLAY = '0'

const setDisplay = value => {
  const updatedValue = value.replace('.', ',')
  display.innerHTML = updatedValue
}

const reset = () => {
  storedNumber = DEFAULT_DISPLAY
  setDisplay(storedNumber)
}

const negate = value => {
  const temp = value
  value = (parseFloat(storedNumber) * -1).toString()
  if (temp.endsWith('.')) {
    value += '.'
  }
  storedNumber = value
  setDisplay(storedNumber)
}

const display = document.querySelector('div[name="display"] span')

const numbers = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine'
]
let storedNumber = DEFAULT_DISPLAY

numbers.forEach(number => {
  const value = document.getElementsByName(number)[0]
  value.addEventListener('click', () => {
    if (storedNumber === '0') {
      storedNumber = ''
    }
    if (storedNumber.replace('.', '').length < MAX_DIGITS_IN_DISPLAY) {
      storedNumber += value.innerHTML
    }
    setDisplay(storedNumber)
  })
})

document.getElementsByName('point')[0].addEventListener('click', () => {
  if (
    !storedNumber.includes('.') &&
    storedNumber.length < MAX_DIGITS_IN_DISPLAY
  ) {
    storedNumber += '.'
  }
  setDisplay(storedNumber)
})

document.getElementsByName('negate')[0].addEventListener('click', () => {
  negate(storedNumber)
})

document.getElementsByName('clean')[0].addEventListener('click', () => {
  reset()
})

document.addEventListener('keydown', event => {
  const key = event.key
  if (key >= '0' && key <= '9') {
    const value = parseInt(key, 10)

    if (storedNumber === '0') {
      storedNumber = ''
    }
    if (storedNumber.replace('.', '').length < MAX_DIGITS_IN_DISPLAY) {
      storedNumber += value
    }
    setDisplay(storedNumber)
  }

  if (key === 'Control') {
    negate(storedNumber)
  }

  if (key === 'Escape') {
    reset()
  }

  if (key === ',') {
    if (
      !storedNumber.includes('.') &&
      storedNumber.length < MAX_DIGITS_IN_DISPLAY
    ) {
      storedNumber += '.'
    }
    setDisplay(storedNumber)
  }
})

reset()
