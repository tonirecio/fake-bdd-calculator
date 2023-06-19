const MAX_DIGITS_IN_DISPLAY = 10

const setDisplay = (value) => {
  display.innerHTML = 0
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
  if ((display.innerHTML != 0) && (display.innerHTML.length < MAX_DIGITS_IN_DISPLAY)){
  display.innerHTML = display.innerHTML + value
  } else {
  display.innerHTML = value}
}

const appendSymbol = (value) => {
  display.innerHTML = display.innerHTML + value
}

const setNegation = () => {
  let displayValue = display.innerHTML;

  if (displayValue !== "0") {
    if (displayValue.slice(0, 1) === "-") {
      display.innerHTML = displayValue.slice(1);
    } else {
      display.innerHTML = "-" + displayValue;
    }
  }
};

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
  appendSymbol(',')
})

document.getElementsByName('negate')[0].addEventListener('click', () => {
  setNegation()
})

document.getElementsByName('clean')[0].addEventListener('click', () => {
  reset()
})

// Buttons in Keys

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (key === '0') {
    appendNumber(0);
  } else if (key === '1') {
    appendNumber(1);
  } else if (key === '2') {
    appendNumber(2);
  } else if (key === '3') {
    appendNumber(3);
  } else if (key === '4') {
    appendNumber(4);
  } else if (key === '5') {
    appendNumber(5);
  } else if (key === '6') {
    appendNumber(6);
  } else if (key === '7') {
    appendNumber(7);
  } else if (key === '8') {
    appendNumber(8);
  } else if (key === '9') {
    appendNumber(9);
  } else if (key === ',') {
    appendSymbol(',');
  } else if (key === 'Escape') {
    reset();
  } else if (key === 'Control') {
    setNegation();
  }
})
