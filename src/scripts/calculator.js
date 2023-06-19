const MAX_DIGITS_IN_DISPLAY = 10

const display = document.querySelector('div[name="display"] span')

let point = false
let negated = false

const setDisplay = (value) => {

  if (display.innerHTML.length < MAX_DIGITS_IN_DISPLAY) {

    if (display.innerHTML === '0' && value !== ',') {
      display.innerHTML = value;

    } else if (value === ',' && !point) {
      display.innerHTML = display.innerHTML + value;
      point = true;

    } else if (value !== ',') {
      display.innerHTML = display.innerHTML + value;

    }
  }
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

    display.innerHTML = display.innerHTML.slice(1)
    negated = false

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

  if (event.key === '-') {
    negate()
  }



  if (allowedCharacters.includes(key)) {

    setDisplay(event.key)

  }
});





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


document.getElementsByName('multiply')[0].addEventListener('click', () => {
  sayHello()
})


reset()
