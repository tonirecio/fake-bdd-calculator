const MAX_DIGITS_IN_DISPLAY = 10
let currentValue = '0'
let firstValue = null
let secondValue = null
let currentOperation = null
let resetDisplay = false

const appendNumber = (number) => {
  if (resetDisplay) {
    currentValue = '0'
    resetDisplay = false
  }
  if (currentValue === '0' && number !== 0) {
    currentValue = number.toString()
    const zeroButton = document.querySelector('button[name="zero"]')
    zeroButton.disabled = false
  } else if (currentValue !== '0' && (currentValue.replace(',', '').length) < MAX_DIGITS_IN_DISPLAY) {
    currentValue += number.toString()
  }
  setDisplay(currentValue)
}


const appendDot = () => {
  if (resetDisplay) {
    currentValue = '0'
    resetDisplay = false
  }
  if (!currentValue.includes(',') && (currentValue.replace(',', '').length) < MAX_DIGITS_IN_DISPLAY) {
    currentValue += ','
  }
  setDisplay(currentValue)
}

const disableNumberButtons = () => {
  const numberButtons = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'point']
  numberButtons.forEach((buttonName) => {
    const button = document.getElementsByName(buttonName)[0]
    button.disabled = true
  })
}

const enableNumberButtons = () => {
  const numberButtons = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'point']
  numberButtons.forEach((buttonName) => {
    const button = document.getElementsByName(buttonName)[0]
    button.disabled = false
  })
}

const setDisplay = (value) => {
  if (value === ',' && currentValue.includes(',')) {
    return
  }
  if (currentValue === '0' && value !== '0' && value !== ',') {
    currentValue = value
  } else if ((currentValue.replace(',', '').length) < MAX_DIGITS_IN_DISPLAY && value !== currentValue) {
    currentValue += value
  }

  // Disable number and comma buttons if the maximum number of digits has been reached
  if ((currentValue.replace(',', '').length) >= MAX_DIGITS_IN_DISPLAY) {
    disableNumberButtons()
  }

  display.innerHTML = currentValue
  negate.disabled = false;
}


const reset = document.querySelector('button[name="clean"]')
reset.addEventListener('click', () => {
  currentValue = '0'
  setDisplay(currentValue)
  const zeroButton = document.querySelector('button[name="zero"]')
  zeroButton.disabled = true
  negate.disabled = true
  enableNumberButtons()
  zeroButton.disabled = true // Keep the zero button disabled
})



const negate = document.querySelector('button[name="negate"]')
negate.addEventListener('click', () => {
  if (currentValue === '0' || /^0,0*$/.test(currentValue)) { // Esta expresión regular busca una cadena que comience y termine con cero y tenga cero o más comas en el medio.
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
        return
    }
  })
})

document.addEventListener('keydown', (event) => {
  const keyCode = event.keyCode
  let keyValue
  switch (keyCode) {
    case 48:
    case 96:
      keyValue = '0'
      break
    case 49:
    case 97:
      keyValue = '1'
      break
    case 50:
    case 98:
      keyValue = '2'
      break
    case 51:
    case 99:
      keyValue = '3'
      break
    case 52:
    case 100:
      keyValue = '4'
      break
    case 53:
    case 101:
      keyValue = '5'
      break
    case 54:
    case 102:
      keyValue = '6'
      break
    case 55:
    case 103:
      keyValue = '7'
      break
    case 56:
    case 104:
      keyValue = '8'
      break
    case 57:
    case 105:
      keyValue = '9'
      break
    case 188:
      keyValue = ','
      break
    case 17:
      negate.click()
      return
    case 27:
      keyValue = currentValue = '0'
      break
    default:
      return
  }
  setDisplay(keyValue)
})

const sum = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => {
  if (b === 0) {
    return null
  }
  return a / b
}

const operate = () => {
  if (firstValue !== null && secondValue !== null && currentOperation !== null) {
    let result = currentOperation(firstValue, secondValue)
    if (result === null) {
      currentValue = 'ERROR'
      setDisplay(currentValue)
      return
    }
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

const handleOperation = (operation) => {
  if (firstValue === null) {
    firstValue = parseFloat(currentValue.replace(',', '.'))
    currentValue = '0'
    enableNumberButtons()
  } else if (currentValue !== '0') {
    secondValue = parseFloat(currentValue.replace(',', '.'))
    operate()
    currentValue = '0'
    enableNumberButtons()
  }
  currentOperation = operation
  if (firstValue !== null && currentValue === '0') {
    negate.disabled = true;
  }
}

const handleEqual = () => {
  if (firstValue === null) {
    firstValue = parseFloat(currentValue.replace(',', '.'))
  }
  if (currentOperation === null) {
    if (currentValue.endsWith(',')) {
      currentValue = currentValue.slice(0, -1)
    }
    setDisplay(currentValue)
    return
  }

  secondValue = parseFloat(currentValue.replace(',', '.'))
  operate()
  firstValue = null
  currentOperation = null
  resetDisplay = true
}

const sumButton = document.querySelector('button[name="sum"]')
sumButton.addEventListener('click', () => handleOperation(sum))

const subtractButton = document.querySelector('button[name="subtract"]')
subtractButton.addEventListener('click', () => handleOperation(subtract))

const multiplyButton = document.querySelector('button[name="multiply"]')
multiplyButton.addEventListener('click', () => handleOperation(multiply))

const divideButton = document.querySelector('button[name="divide"]')
divideButton.addEventListener('click', () => handleOperation(divide))

const equalButton = document.querySelector('button[name="equal"]')
equalButton.addEventListener('click', handleEqual)

const display = document.querySelector('div[name="display"] span')