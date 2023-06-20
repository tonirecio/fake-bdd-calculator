const MAX_DIGITS_IN_DISPLAY = 10

const display = document.querySelector('div[name="display"] span')

let point = false
let negated = false

let operators = 0;
let type

const setDisplay = (value) => {

  if (display.innerHTML.length < MAX_DIGITS_IN_DISPLAY || (display.innerHTML.length < MAX_DIGITS_IN_DISPLAY + 1 && point == true)) {

    if (display.innerHTML === '0' && value !== ',') {
      display.innerHTML = value;

    } else if (value === ',' && !point) {
      display.innerHTML = display.innerHTML + ',';
      point = true;
    } else if (value !== ',') {
      display.innerHTML = display.innerHTML + value;

    }
  }

  console.log(display.innerHTML)
}

const sayHello = () => {
  window.alert('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.')
}


const reset = () => {
  display.innerHTML = 0
  point = false
  negated = false
}

const negate = () => {

  if (negated == false && display.innerHTML != '0' && display.innerHTML != '0,') {
    display.innerHTML = '-' + display.innerHTML
    negated = true
  }

  else if (negated == true) {

    display.innerHTML = display.innerHTML * -1
    negated = false

  }

}
const getNum = () => {
  operators = parseFloat(display.innerHTML.replace(/,/g, '.'));
  display.innerHTML = 0;
  if (!display.innerHTML.includes(",")) {
    point = false;
  }
}

const equal = () => {
  var result = 0;
  if (type === '+') {
    result = operators + parseFloat(display.innerHTML.replace(/,/g, '.'));
  }
  if (type === '-') {
    result = operators - parseFloat(display.innerHTML.replace(/,/g, '.'));
  }
  if (type === '*') {
    result = operators * parseFloat(display.innerHTML.replace(/,/g, '.'));
  }
  if (type === '/') {
    result = operators / parseFloat(display.innerHTML.replace(/,/g, '.'));
  }
  if (!display.innerHTML.includes(".")) {
    point = false;
  }


  display.innerHTML = parseFloat(result).toLocaleString(undefined, { maximumFractionDigits: 10 }).replace(/\./g, ',');

  if (point = false){
  display.innerHTML =display.innerHTML.substring(0, 10)}
else {
  display.innerHTML =display.innerHTML.substring(0, 11)
}
}

//Events teclas

document.addEventListener('keydown', (event) => {

  console.log(event.key)
  const key = event.key;
  const allowedCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];

  if (event.key === 'Escape') {
    reset()
  }

  if (event.key === 'Control') {
    negate()
  }

  if (event.key === '-' && display.innerHTML == 0) {

    display.innerHTML = '-'
    negated = true

  }



  if (allowedCharacters.includes(key)) {

    setDisplay(event.key)

  }
});


// OPERATIONS

document.getElementsByName('sum')[0].addEventListener('click', () => {
  type = '+'
  getNum()
})

document.getElementsByName('subtract')[0].addEventListener('click', () => {
  type = '-'
  getNum()
})

document.getElementsByName('multiply')[0].addEventListener('click', () => {
  type = '*'
  getNum()
})

document.getElementsByName('divide')[0].addEventListener('click', () => {
  type = '/'
  getNum()
})


document.getElementsByName('equal')[0].addEventListener('click', () => {
  equal()
})




//EVENT LISTENERS BUTTONS

document.getElementsByName('clean')[0].addEventListener('click', () => {
  reset()
})

////////////////////////////

document.getElementsByName('zero')[0].addEventListener('click', () => {
  setDisplay('0')
})

document.getElementsByName('one')[0].addEventListener('click', () => {
  setDisplay('1')
})

document.getElementsByName('two')[0].addEventListener('click', () => {
  setDisplay('2')
})

document.getElementsByName('three')[0].addEventListener('click', () => {
  setDisplay('3')
})

document.getElementsByName('four')[0].addEventListener('click', () => {
  setDisplay('4')
})

document.getElementsByName('five')[0].addEventListener('click', () => {
  setDisplay('5')
})

document.getElementsByName('six')[0].addEventListener('click', () => {
  setDisplay('6')
})

document.getElementsByName('seven')[0].addEventListener('click', () => {
  setDisplay('7')
})

document.getElementsByName('eight')[0].addEventListener('click', () => {
  setDisplay('8')
})

document.getElementsByName('nine')[0].addEventListener('click', () => {
  setDisplay('9')
})


////////////////////////////////
document.getElementsByName('point')[0].addEventListener('click', () => {
  setDisplay(',')
})

document.getElementsByName('negate')[0].addEventListener('click', () => {
  negate()
})





reset()
