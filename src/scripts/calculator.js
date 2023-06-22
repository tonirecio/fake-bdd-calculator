const MAX_DIGITS_IN_DISPLAY = 10
let hasDecimal = false

const setDisplay = (value) => {
  display.innerHTML = value
}

const reset = () => {
  setDisplay(0)
  hasDecimal = false
}

const DisplayAcu = (value) => {
  const currentValue = display.innerHTML

  if (value === '+' || value === '-') {
    if (currentValue === '0') {
      display.innerHTML = value
    } else if (currentValue === '+' || currentValue === '-') {
      display.innerHTML = value === currentValue ? value : value === '+' ? '-' : '+'
    } else {
      const newValue = currentValue + value
      display.innerHTML = newValue
    }
  } else {
    const newValue = currentValue === '0' && value !== ',' ? value : currentValue + value
    if (newValue.replace(',', '').replace('+', '').replace('-', '').length <= MAX_DIGITS_IN_DISPLAY) {
      display.innerHTML = newValue
    } else {
      window.alert('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.')
      // reset();
    }
  }
}

document.getElementsByName('clean')[0].addEventListener('click', () => {
  reset()
})

const display = document.querySelector('div[name="display"] span')
document.getElementsByName('multiply')[0].addEventListener('click', () => {
  DisplayAcu('x')
})

const displaysum = document.querySelector('div[name="display"] span')
document.getElementsByName('sum')[0].addEventListener('click', () => {
  DisplayAcu('+')
})

const displaysubtract = document.querySelector('div[name="display"] span')
document.getElementsByName('subtract')[0].addEventListener('click', () => {
  DisplayAcu('-')
})

const displaydivide = document.querySelector('div[name="display"] span')
document.getElementsByName('divide')[0].addEventListener('click', () => {
  DisplayAcu('÷')
})

const displaypoint = document.querySelector('div[name="display"] span')
document.getElementsByName('point')[0].addEventListener('click', () => {
  if (!hasDecimal) {
    Coma(',')
  }
})

document.getElementsByName('negate')[0].addEventListener('click', () => {
  negateInvertNumber()
})

document.getElementsByName('zero')[0].addEventListener('click', () => {
  DisplayAcu('0')
})

document.getElementsByName('one')[0].addEventListener('click', () => {
  DisplayAcu('1')
})

document.getElementsByName('two')[0].addEventListener('click', () => {
  DisplayAcu('2')
})

document.getElementsByName('three')[0].addEventListener('click', () => {
  DisplayAcu('3')
})

document.getElementsByName('four')[0].addEventListener('click', () => {
  DisplayAcu('4')
})

document.getElementsByName('five')[0].addEventListener('click', () => {
  DisplayAcu('5')
})

document.getElementsByName('six')[0].addEventListener('click', () => {
  DisplayAcu('6')
})

document.getElementsByName('seven')[0].addEventListener('click', () => {
  DisplayAcu('7')
})

document.getElementsByName('eight')[0].addEventListener('click', () => {
  DisplayAcu('8')
})

document.getElementsByName('nine')[0].addEventListener('click', () => {
  DisplayAcu('9')
})

const negateInvertNumber = () => {
  let currentValue = display.innerHTML

  if (currentValue !== '0' && currentValue !== '0,') {
    if (currentValue.startsWith('-')) {
      currentValue = currentValue.slice(1)
    } else if (currentValue.startsWith('+')) {
      currentValue = '-' + currentValue.slice(1)
    } else {
      currentValue = '-' + currentValue
    }
    setDisplay(currentValue)
  }
}

const Coma = (value) => {
  const currentValue = display.innerHTML
  if (value === ',') {
    if (!hasDecimal && currentValue.indexOf(',') === -1 && currentValue.length < MAX_DIGITS_IN_DISPLAY) {
      const newValue = currentValue === '0' ? '0' + value : currentValue + value
      display.innerHTML = newValue
    }
  }
}

const pressKey = (event) => {
  const key = event.key

  switch (key) {
    case '+':
      DisplayAcu('+')
      break
    case '-':
      DisplayAcu('-')
      break
    case '*':
      DisplayAcu('x')
      break
    case '/':
      DisplayAcu('÷')
      break
    case '.':
    case ',':
      if (!hasDecimal) {
        DisplayAcu(',')
      }
      break
    case '0':
      DisplayAcu('0')
      break
    case '1':
      DisplayAcu('1')
      break
    case '2':
      DisplayAcu('2')
      break
    case '3':
      DisplayAcu('3')
      break
    case '4':
      DisplayAcu('4')
      break
    case '5':
      DisplayAcu('5')
      break
    case '6':
      DisplayAcu('6')
      break
    case '7':
      DisplayAcu('7')
      break
    case '8':
      DisplayAcu('8')
      break
    case '9':
      DisplayAcu('9')
      break
    case 'Control':
      negateInvertNumber()
      break
    case 'Escape':
      reset()
      break
    default:
      break
  }
}

document.addEventListener('keydown', pressKey)
