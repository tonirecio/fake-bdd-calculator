const MAX_DIGITS_IN_DISPLAY = 10

const setDisplay = (value) => {
  display.innerHTML = value
}

const appendNumber = (value) => {
  if (display.innerHTML != 0){
  display.innerHTML = display.innerHTML + value
  } else {
  display.innerHTML = value}
}

const setDecimal = (value) => {
  display.innerHTML = display.innerHTML + value
}

const setNegation = () => {
  let displayValue = display.innerHTML;

  if (displayValue != "0") {
    if (displayValue.slice(0, 1) === "-") {
      display.innerHTML = displayValue.slice(1);
    } else {
      display.innerHTML = "-" + displayValue;
    }
  }
};

const sayHello = () => {
  window.alert('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.')
}

const reset = () => {
  setDisplay(0)
}

const display = document.querySelector('div[name="display"] span')


// Buttons 
// Number buttons
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

// Other buttons
document.getElementsByName('point')[0].addEventListener('click', () => {
  setDecimal(',')
})
document.getElementsByName('clean')[0].addEventListener('click', () => {
  reset()
})
document.getElementsByName('negate')[0].addEventListener('click', () => {
  setNegation()
})
reset()
