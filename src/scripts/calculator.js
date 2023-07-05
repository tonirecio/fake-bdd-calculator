const MAX_DIGITS_IN_DISPLAY = 10
const display = document.querySelector('div[name="display"] span')

let firstValue
let operator

const setDisplay = (value) => {
  display.innerHTML = value
}

const reset = () => {
  setDisplay('0')
}

const handleKeyDown = (event) => {
  const key = event.key

  if (!isNaN(parseInt(key))) {
    appendNumber(key)
  } else {
    switch (key) {
      case ',':
        appendPoint()
        break
      case 'Escape':
        reset()
        break
      case 'Control':
        setNegation()
        break
    }
  }
}

const appendNumber = (value) => {
  const digitCount = display.innerHTML.replace(/,|-/g, '').length // regex Found and replace ',' and '-'

  if (digitCount >= MAX_DIGITS_IN_DISPLAY) {
    return
  }

  if (display.innerHTML === '0') {
    display.innerHTML = value
  } else {
    display.innerHTML += value
  }
}

const appendPoint = () => {
  if (!display.innerHTML.includes(',') && display.innerHTML.length < MAX_DIGITS_IN_DISPLAY) {
    display.innerHTML += ','
  }
}

const setNegation = () => {
  const displayValue = display.innerHTML

  if (displayValue !== '0' && displayValue !== '0,') {
    if (displayValue.slice(0, 1) === '-') {
      display.innerHTML = displayValue.slice(1)
    } else {
      display.innerHTML = '-' + displayValue
    }
  }
}

// Number Buttons
document.getElementsByName('zero')[0].addEventListener('click', () => {
  appendNumber('0')
})
document.getElementsByName('one')[0].addEventListener('click', () => {
  appendNumber('1')
})
document.getElementsByName('two')[0].addEventListener('click', () => {
  appendNumber('2')
})
document.getElementsByName('three')[0].addEventListener('click', () => {
  appendNumber('3')
})
document.getElementsByName('four')[0].addEventListener('click', () => {
  appendNumber('4')
})
document.getElementsByName('five')[0].addEventListener('click', () => {
  appendNumber('5')
})
document.getElementsByName('six')[0].addEventListener('click', () => {
  appendNumber('6')
})
document.getElementsByName('seven')[0].addEventListener('click', () => {
  appendNumber('7')
})
document.getElementsByName('eight')[0].addEventListener('click', () => {
  appendNumber('8')
})
document.getElementsByName('nine')[0].addEventListener('click', () => {
  appendNumber('9')
})

// Operator Buttons
document.getElementsByName('sum')[0].addEventListener('click', () => {
  operator = '+'
  firstValue = parseFloat(display.innerHTML.replace(',', '.'))
  reset()
})
document.getElementsByName('subtract')[0].addEventListener('click', () => {
  operator = '-'
  firstValue = parseFloat(display.innerHTML.replace(',', '.'))
  reset()
})
document.getElementsByName('multiply')[0].addEventListener('click', () => {
  operator = '*'
  firstValue = parseFloat(display.innerHTML.replace(',', '.'))
  reset()
})
document.getElementsByName('divide')[0].addEventListener('click', () => {
  operator = '/'
  firstValue = parseFloat(display.innerHTML.replace(',', '.'))
  reset()
})

// Other Buttons
document.getElementsByName('point')[0].addEventListener('click', () => {
  appendPoint()
})
document.getElementsByName('negate')[0].addEventListener('click', () => {
  setNegation()
})
document.getElementsByName('clean')[0].addEventListener('click', () => {
  reset()
})

document.getElementsByName('equal')[0].addEventListener('click', () => {
  const secondValue = parseFloat(display.innerHTML.replace(',', '.'))
  calculator(firstValue, secondValue, operator)
})

document.addEventListener('keydown', handleKeyDown)

const calculator = (firstValue, secondValue, operator) => {
  let result

  switch (operator) {
    case '+':
      result = firstValue + secondValue
      break
    case '-':
      result = firstValue - secondValue
      break
    case '*':
      result = firstValue * secondValue
      break
    case '/':
      result = firstValue / secondValue
      break
  }

  const resultLength = result.toString().replace(',', '').length

  if (resultLength > MAX_DIGITS_IN_DISPLAY) {
    result = result.toPrecision(MAX_DIGITS_IN_DISPLAY)
  }

  result = parseFloat(result)

  display.innerHTML = result.toString().replace('.', ',')
}
