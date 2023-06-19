const MAX_DIGITS_IN_DISPLAY = 10
const DEFAULT_DISPLAY = '0'

const setDisplay = (value) => {
  display.innerHTML = value
}

const reset = () => {
  setDisplay(DEFAULT_DISPLAY)
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
let storedNumber = ''

numbers.forEach((number) => {
  const value = document.getElementsByName(number)[0]
  value.addEventListener('click', () => {
    if (storedNumber === '0') {
      storedNumber = ''
    }
    if (storedNumber.length < MAX_DIGITS_IN_DISPLAY) {
      storedNumber += value.innerHTML
    }
    setDisplay(storedNumber)
  })
})

document.getElementsByName('point')[0].addEventListener('click', () => {
  if (!storedNumber.includes(',')) {
    storedNumber += ','
  }
  setDisplay(storedNumber)
})

document.getElementsByName('negate')[0].addEventListener('click', () => {
  storedNumber = (parseFloat(storedNumber) * -1).toString()
  setDisplay(storedNumber)
})

document.getElementsByName('clean')[0].addEventListener('click', () => {
  storedNumber = DEFAULT_DISPLAY
  setDisplay(storedNumber)
})

document.addEventListener('keydown', (event) => {
  const key = event.key
  if (key >= '0' && key <= '9') {
    const numberIndex = parseInt(key, 10)
    const numberName = numbers[numberIndex]
    const value = document.getElementsByName(numberName)[0]

    if (storedNumber === '0') {
      storedNumber = ''
    }
    if (storedNumber.length < MAX_DIGITS_IN_DISPLAY) {
      storedNumber += value.innerHTML
    }
    setDisplay(storedNumber)
  }

  if (key === 'Control') {
    storedNumber = (parseFloat(storedNumber) * -1).toString()
    setDisplay(storedNumber)
  }

  if (key === 'Escape') {
    storedNumber = DEFAULT_DISPLAY
    setDisplay(storedNumber)
  }

  if (key === ',') {
    if (!storedNumber.includes(',')) {
      storedNumber += ','
    }
    setDisplay(storedNumber)
  }
})

reset()
