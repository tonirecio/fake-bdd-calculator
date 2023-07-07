const MAX_DIGITS_IN_DISPLAY = 10
const display = document.querySelector('div[name="display"] span')

let currentValue = 0
let firstValue
let operator

const setDisplay = (value) => {
  currentValue = value
  display.innerHTML = currentValue
}

const reset = () => {
  currentValue = '0'
  setDisplay(currentValue)
}

const appendNumberToDisplay = (value) => {
  const digitCount = display.innerHTML.replace(/,|-/, '').length

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

// Input Controllers
const pressingButtons = () => {
  // Numbers
  document.getElementsByName('zero')[0].addEventListener('click', () => appendNumberToDisplay(0))
  document.getElementsByName('one')[0].addEventListener('click', () => appendNumberToDisplay(1))
  document.getElementsByName('two')[0].addEventListener('click', () => appendNumberToDisplay(2))
  document.getElementsByName('three')[0].addEventListener('click', () => appendNumberToDisplay(3))
  document.getElementsByName('four')[0].addEventListener('click', () => appendNumberToDisplay(4))
  document.getElementsByName('five')[0].addEventListener('click', () => appendNumberToDisplay(5))
  document.getElementsByName('six')[0].addEventListener('click', () => appendNumberToDisplay(6))
  document.getElementsByName('seven')[0].addEventListener('click', () => appendNumberToDisplay(7))
  document.getElementsByName('eight')[0].addEventListener('click', () => appendNumberToDisplay(8))
  document.getElementsByName('nine')[0].addEventListener('click', () => appendNumberToDisplay(9))
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
    if (key >= '0' && key <= '9') appendNumberToDisplay(key)
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
