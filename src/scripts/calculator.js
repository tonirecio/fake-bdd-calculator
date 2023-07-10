const MAX_DIGITS_IN_DISPLAY = 10
const display = document.querySelector('div[name="display"] span')

let currentValue = '0'
let firstValue
let operator

const setDisplay = (currentValue) => {
  const displayValue = currentValue.replace('.', ',')
  display.innerHTML = displayValue
}

const reset = () => {
  currentValue = '0'
  setDisplay(currentValue)
}

const appendNumberToCurrentValue = (valueToAppend) => {
  const digitCount = currentValue.replace(/[.,-]/g, '').length // Regular expresion that found '.' and '-' on currentValue

  if (digitCount >= MAX_DIGITS_IN_DISPLAY) {
    setDisplay(currentValue)
  } else if (currentValue === '0') {
    currentValue = valueToAppend.toString()
  } else {
    currentValue += valueToAppend.toString()
  }

  setDisplay(currentValue)
}

const appendPoint = () => {
  if (!currentValue.includes('.') && currentValue.length < MAX_DIGITS_IN_DISPLAY) {
    currentValue += '.'
    setDisplay(currentValue)
  }
}

const setNegation = () => {
  if (currentValue !== '0' && currentValue !== '0.') {
    if (currentValue.slice(0, 1) === '-') {
      currentValue = currentValue.slice(1)
    } else {
      currentValue = '-' + currentValue
    }
  }

  setDisplay(currentValue)
}

// Input Controllers
const pressingButtons = () => {
  // Numbers
  document.getElementsByName('zero')[0].addEventListener('click', () => appendNumberToCurrentValue(0))
  document.getElementsByName('one')[0].addEventListener('click', () => appendNumberToCurrentValue(1))
  document.getElementsByName('two')[0].addEventListener('click', () => appendNumberToCurrentValue(2))
  document.getElementsByName('three')[0].addEventListener('click', () => appendNumberToCurrentValue(3))
  document.getElementsByName('four')[0].addEventListener('click', () => appendNumberToCurrentValue(4))
  document.getElementsByName('five')[0].addEventListener('click', () => appendNumberToCurrentValue(5))
  document.getElementsByName('six')[0].addEventListener('click', () => appendNumberToCurrentValue(6))
  document.getElementsByName('seven')[0].addEventListener('click', () => appendNumberToCurrentValue(7))
  document.getElementsByName('eight')[0].addEventListener('click', () => appendNumberToCurrentValue(8))
  document.getElementsByName('nine')[0].addEventListener('click', () => appendNumberToCurrentValue(9))
  // Operators
  document.getElementsByName('sum')[0].addEventListener('click', () => handleOperator())
  document.getElementsByName('subtract')[0].addEventListener('click', () => handleOperator())
  document.getElementsByName('multiply')[0].addEventListener('click', () => handleOperator())
  document.getElementsByName('divide')[0].addEventListener('click', () => handleOperator())
  // Others
  document.getElementsByName('point')[0].addEventListener('click', () => appendPoint())
  document.getElementsByName('negate')[0].addEventListener('click', () => setNegation())
  document.getElementsByName('clean')[0].addEventListener('click', () => reset())
}
const pressingKeys = () => {
  // Numbers
  document.addEventListener('keydown', (event) => {
    const key = event.key
    if (key >= '0' && key <= '9') appendNumberToCurrentValue(key)
    else if (key === ',') appendPoint()
    else if (key === 'Control') setNegation()
    else if (key === 'Escape') reset()
  })
}
pressingButtons()
pressingKeys()

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

document.getElementsByName('equal')[0].addEventListener('click', () => {
  const secondValue = parseFloat(display.innerHTML.replace(',', '.'))
  calculator(firstValue, secondValue, operator)
})

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

// document.getElementsByName('zero')[0].addEventListener('click', () => {
//   appendNumberToDisplay('0')
// })
// document.getElementsByName('one')[0].addEventListener('click', () => {
//   appendNumberToDisplay('1')
// })
// document.getElementsByName('two')[0].addEventListener('click', () => {
//   appendNumberToDisplay('2')
// })
// document.getElementsByName('three')[0].addEventListener('click', () => {
//   appendNumberToDisplay('3')
// })
// document.getElementsByName('four')[0].addEventListener('click', () => {
//   appendNumberToDisplay('4')
// })
// document.getElementsByName('five')[0].addEventListener('click', () => {
//   appendNumberToDisplay('5')
// })
// document.getElementsByName('six')[0].addEventListener('click', () => {
//   appendNumberToDisplay('6')
// })
// document.getElementsByName('seven')[0].addEventListener('click', () => {
//   appendNumberToDisplay('7')
// })
// document.getElementsByName('eight')[0].addEventListener('click', () => {
//   appendNumberToDisplay('8')
// })
// document.getElementsByName('nine')[0].addEventListener('click', () => {
//   appendNumberToDisplay('9')
// })

// Other Buttons
// document.getElementsByName('point')[0].addEventListener('click', () => {
//   appendPoint()
// })
// document.getElementsByName('negate')[0].addEventListener('click', () => {
//   setNegation()
// })
// document.getElementsByName('clean')[0].addEventListener('click', () => {
//   reset()
// })

// const handleKeyDown = (event) => {
//   const key = event.key

//   if (!isNaN(parseInt(key))) {
//     appendNumberToDisplay(key)
//   } else {
//     switch (key) {
//       case ',':
//         appendPoint()
//         break
//       case 'Escape':
//         reset()
//         break
//       case 'Control':
//         setNegation()
//         break
//     }
//   }
// }
