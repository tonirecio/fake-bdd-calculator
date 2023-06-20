const MAX_DIGITS_IN_DISPLAY = 10

const setDisplay = (value) => {
  display.innerHTML = value
}

const sayHello = () => {
  window.alert('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.')
}

const updateDisplay = (value) => {
  setDisplay(value)
}

let currentValue

const reset = () => {
  currentValue = ''
  updateDisplay(0)
}

const display = document.querySelector('div[name="display"] span')
document.getElementsByName('multiply')[0].addEventListener('click', () => {
  sayHello()
})
reset()

//const charButtons = document.querySelectorAll('[aria-label]')

const numberButtons = document.querySelectorAll('button:not([aria-label])')
numberButtons.forEach(numberButton =>{
  numberButton.addEventListener('click', () => {
    setDisplay(numberButton.textContent)
  })
})

document.getElementsByName('clean')[0].addEventListener('click', () => {
  reset()
})
/*
numberButtons.forEach(numberButton => {
  numberButton.addEventListener('click', () =>{
  if(parseInt(currentValue) === 0){
    currentValue = numberButton.textContent
  }
  else {
    currentValue += numberButton.textContent
  }
  setDisplay(currentValue)
  })
})
*/

numberButtons.forEach(numberButton => {
  numberButton.addEventListener('click', () =>{
  if(currentValue != 0  || numberButton.textContent == ',' ){
    currentValue += numberButton.textContent
  }
  else {
    currentValue = numberButton.textContent
  }
  setDisplay(currentValue)
  })
})

const negateButton = (displayValues) => {
  displayValues = displayValues * -1
  updateDisplay(displayValues)
}

document.getElementsByName('negate')[0].addEventListener('click', () => {
  negateButton(display.innerHTML)
})
/*
document.getElementsByName('point')[0].addEventListener('click', () => {
  displayValues()
})
*/
