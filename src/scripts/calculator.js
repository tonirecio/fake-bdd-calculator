const MAX_DIGITS_IN_DISPLAY = 10
let currentValue = '0'
let firstValue = null
let secondValue = null
let currentOperation = null

const appendNumber = (number) => {
  if (currentValue === '0' && number !== 0) {
    currentValue = number.toString()
  } else if (currentValue !== '0' && (currentValue.replace(',', '').length) < MAX_DIGITS_IN_DISPLAY) {
    currentValue += number.toString()
  }
  display.innerHTML = currentValue
}

const appendDot = () => {
  if (!currentValue.includes(',') && (currentValue.replace(',', '').length) < MAX_DIGITS_IN_DISPLAY) {
    currentValue += ','
  }
  display.innerHTML = currentValue
}

const setDisplay = (value) => {
  if (value === ',' && currentValue.includes(',')) {
    return
  }
  if (currentValue === '0' && value !== ',') {
    currentValue = value
  } else if ((currentValue.replace(',', '').length) < MAX_DIGITS_IN_DISPLAY && value !== currentValue) {
    currentValue += value
  }

  display.innerHTML = currentValue
}

const reset = document.querySelector('button[name="clean"]')
reset.addEventListener('click', () => {
  currentValue = '0'
  setDisplay(currentValue)
})

const negate = document.querySelector('button[name="negate"]')
negate.addEventListener('click', () => {
  if (currentValue === '0' || /^0,0*$/.test(currentValue)) {
    return
  }
  const endsWithComma = currentValue.endsWith(',')
  currentValue = (parseFloat(currentValue.replace(',', '.')) * -1).toString().replace('.', ',')
  if (endsWithComma) {
    currentValue += ','
  }
  setDisplay(currentValue)
})


const buttons = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'point']
buttons.forEach((buttonName) => {
  const button = document.getElementsByName(buttonName)[0]
  button.addEventListener('click', () => {
    switch (buttonName) {
      case 'one':
        appendNumber(1)
        break
      case 'two':
        appendNumber(2)
        break
      case 'three':
        appendNumber(3)
        break
      case 'four':
        appendNumber(4)
        break
      case 'five':
        appendNumber(5)
        break
      case 'six':
        appendNumber(6)
        break
      case 'seven':
        appendNumber(7)
        break
      case 'eight':
        appendNumber(8)
        break
      case 'nine':
        appendNumber(9)
        break
      case 'zero':
        appendNumber(0)
        break
      case 'point':
        appendDot()
        break
      case 'clean':
        reset()
        break
      case 'negate':
        negate()
        break
      default:
        window.alert('Error: botón no reconocido')
    }
  })
})

const keyCodes = {
  48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9', 96: '0', 97: '1', 98: '2', 99: '3', 100: '4', 101: '5', 102: '6', 103: '7', 104: '8', 105: '9', 188: ','
}

document.addEventListener('keydown', (event) => {
  const keyCode = event.keyCode.toString()
  if (keyCodes.hasOwnProperty(keyCode)) {
    setDisplay(keyCodes[keyCode])
  } else if (event.keyCode === 17) {
    negate()
    setDisplay(currentValue)
  } else if (event.keyCode === 27) {
    currentValue = '0'
    setDisplay(currentValue)
  }
})

const sum = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => a / b

const operate = () => {
  if (firstValue !== null && secondValue !== null && currentOperation !== null) {
    let result = currentOperation(firstValue, secondValue)
    firstValue = result
    secondValue = null
    currentOperation = null
    result = result.toString().replace('.', ',')
    if (result.replace(',', '').length > MAX_DIGITS_IN_DISPLAY) {
      const decimalIndex = result.indexOf(',')
      if (decimalIndex !== -1 && decimalIndex < MAX_DIGITS_IN_DISPLAY) {
        const decimalPlaces = MAX_DIGITS_IN_DISPLAY - decimalIndex
        result = parseFloat(result.replace(',', '.')).toFixed(decimalPlaces).replace('.', ',')
        result = result.replace(/0*$/, '').replace(/,$/, '') // Elimina los ceros finales y la coma final si está presente
      } else {
        result = 'ERROR'
      }
    }
    currentValue = result
    setDisplay(currentValue)
  }
}

const sumButton = document.querySelector('button[name="sum"]')
sumButton.addEventListener('click', () => {
  firstValue = parseFloat(currentValue.replace(',', '.'))
  currentOperation = sum
  currentValue = '0'
})

const subtractButton = document.querySelector('button[name="subtract"]')
subtractButton.addEventListener('click', () => {
  firstValue = parseFloat(currentValue.replace(',', '.'))
  currentOperation = subtract
  currentValue = '0'
})

const multiplyButton = document.querySelector('button[name="multiply"]')
multiplyButton.addEventListener('click', () => {
  firstValue = parseFloat(currentValue.replace(',', '.'))
  currentOperation = multiply
  currentValue = '0'
})

const divideButton = document.querySelector('button[name="divide"]')
divideButton.addEventListener('click', () => {
  firstValue = parseFloat(currentValue.replace(',', '.'))
  currentOperation = divide
  currentValue = '0'
})

const equalButton = document.querySelector('button[name="equal"]')
equalButton.addEventListener('click', () => {
  secondValue = parseFloat(currentValue.replace(',', '.'))
  operate()
})
const display = document.querySelector('div[name="display"] span')