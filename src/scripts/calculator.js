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

// Buttons in Display

const appendNumber = (value) => {
  const displayValue = display.innerHTML.replace(/,|-/g, ''); // Remove comma and negative sign
  const digitCount = displayValue.length;

  if (digitCount >= MAX_DIGITS_IN_DISPLAY) {
    return;
  }

  if (display.innerHTML == '0') {
    display.innerHTML = value;
  } else {
    display.innerHTML += value;
  }
};


const appendPoint = (value) => {
  let regex = '([,])+'
  if (!display.innerHTML.match(regex) && (display.innerHTML.length < MAX_DIGITS_IN_DISPLAY)) {
    display.innerHTML = display.innerHTML + value
  }

}

const setNegation = () => {
  let displayValue = display.innerHTML
  let valueLength = displayValue.length
  let hasPoint = false

  if (displayValue.charAt(valueLength - 1) == ','){
    hasPoint = true
  }

  if ((displayValue != 0) && (displayValue != '0,')) {
    displayValue = displayValue.replace(',', '.')
    displayValue = parseFloat(displayValue) * (-1)
    displayValue = displayValue.toString().replace('.', ',')


    if (hasPoint == true){
    displayValue += ','	
  }
    display.innerHTML = displayValue
  }
}

document.getElementsByName('zero')[0].addEventListener('click', () => {
  appendNumber(0)
})

document.getElementsByName('one')[0].addEventListener('click', () => {
  appendNumber(1)
})

document.getElementsByName('two')[0].addEventListener('click', () => {
  appendNumber(2)
})

document.getElementsByName('three')[0].addEventListener('click', () => {
  appendNumber(3)
})

document.getElementsByName('four')[0].addEventListener('click', () => {
  appendNumber(4)
})

document.getElementsByName('five')[0].addEventListener('click', () => {
  appendNumber(5)
})

document.getElementsByName('six')[0].addEventListener('click', () => {
  appendNumber(6)
})

document.getElementsByName('seven')[0].addEventListener('click', () => {
  appendNumber(7)
})

document.getElementsByName('eight')[0].addEventListener('click', () => {
  appendNumber(8)
})

document.getElementsByName('nine')[0].addEventListener('click', () => {
  appendNumber(9)
})

document.getElementsByName('point')[0].addEventListener('click', () => {
  appendPoint(',')
})

document.getElementsByName('negate')[0].addEventListener('click', () => {
  setNegation()
})

document.getElementsByName('clean')[0].addEventListener('click', () => {
  reset()
})

// Buttons in Keys

document.addEventListener('keydown', (event) => {
  const key = event.key

  if (/[0-9]/.test(key)) {
    appendNumber(Number(key));
  }
  if (key === ',') {
    appendPoint(',');
  }
  if (key === 'Escape') {
    reset();
  }
  if (key === 'Control') {
    setNegation();
  }
})

// Operations
let firstOperand
let operation
  // Sum
document.getElementsByName('sum')[0].addEventListener('click', () => {
  firstOperand = parseFloat(display.innerHTML.replace(',', '.'))
  operation = '+'
  reset()
})
  // Subtract
document.getElementsByName('subtract')[0].addEventListener('click', () => {
  firstOperand = parseFloat(display.innerHTML.replace(',', '.'))
  operation = '-'
  reset()
})
  // Multiply
document.getElementsByName('multiply')[0].addEventListener('click', () => {
  firstOperand = parseFloat(display.innerHTML.replace(',', '.'))
  operation = '*'
  reset()
})
  // Divide
document.getElementsByName('divide')[0].addEventListener('click', () => {
  firstOperand = parseFloat(display.innerHTML.replace(',', '.'))
  operation = '/'
  reset()
})
  // Equal
document.getElementsByName('equal')[0].addEventListener('click', () => {
  let secondOperand = parseFloat(display.innerHTML.replace(',','.'))
  reset()
  calculate(firstOperand, secondOperand, operation)
})

const calculate = (firstOperand, secondOperand, operation) => {
  let result
  let resultLength

  if (operation == '+'){
    result = firstOperand + secondOperand
  } else if (operation == '-'){
    result = firstOperand - secondOperand
  } else if (operation == '*') {
    result = firstOperand * secondOperand
  } else {
    result = firstOperand / secondOperand
  }

  resultLength = result.toString().replace(',', '').length

  if (resultLength > MAX_DIGITS_IN_DISPLAY) {
    result = result.toPrecision(MAX_DIGITS_IN_DISPLAY)
  }

  display.innerHTML = result.toString().replace('.', ',')
}
