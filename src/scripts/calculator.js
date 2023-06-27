const MAX_DIGITS_IN_DISPLAY = 10

const setDisplay = (value) => {
  //  display.innerHTML = value.toString().replace('.',',')
  display.innerHTML = replaceComma(value)
}

let currentValue = 0
let currentValueToString = 0
let previousOperand
let countDigit = 0
let isDecimal = false
//  let operator
//  isdisplaytobecleaned

const display = document.querySelector('div[name="display"] span')

document.getElementsByName('zero')[0].addEventListener('click', () => {
  addNumberButtons(0)
})
document.getElementsByName('one')[0].addEventListener('click', () => {
  addNumberButtons(1)
})
document.getElementsByName('two')[0].addEventListener('click', () => {
  addNumberButtons(2)
})
document.getElementsByName('three')[0].addEventListener('click', () => {
  addNumberButtons(3)
})
document.getElementsByName('four')[0].addEventListener('click', () => {
  addNumberButtons(4)
})
document.getElementsByName('five')[0].addEventListener('click', () => {
  addNumberButtons(5)
})
document.getElementsByName('six')[0].addEventListener('click', () => {
  addNumberButtons(6)
})
document.getElementsByName('seven')[0].addEventListener('click', () => { 
  addNumberButtons(7)
})
document.getElementsByName('eight')[0].addEventListener('click', () => {
  addNumberButtons(8)
})
document.getElementsByName('nine')[0].addEventListener('click', () => {
  addNumberButtons(9)
})
document.getElementsByName('clean')[0].addEventListener('click', () => {
  reset()
})
document.getElementsByName('negate')[0].addEventListener('click', () => {
  negateButton(currentValue)
})
document.getElementsByName('divide')[0].addEventListener('click', () => {

})
document.getElementsByName('multiply')[0].addEventListener('click', () => {
})
document.getElementsByName('sum')[0].addEventListener('click', () => {

})
document.getElementsByName('subtract')[0].addEventListener('click', () => { 
})
const buttonPointName = document.getElementsByName('point')[0].addEventListener('click', () => {
  operatorButtons('point')
})
document.getElementsByName('equal')[0].addEventListener('click', () => {
  
})

const reset = () => {
  currentValue = 0
  previousOperand = 0
  currentValueToString = 0
  isDecimal = false
  countDigit = 0
  setDisplay(0)
}

const addNumberButtons = (number) => {
  if(!isDecimal) {
    currentValue = appendIntegerNumbers(number)
    console.log(typeof currentValue)
  }else {
    currentValue = appendDecimalNumbers(number)
    console.log(typeof currentValue)
  }
  setDisplay(currentValue)
}

const appendIntegerNumbers = (value) => {
  if(countDigit < MAX_DIGITS_IN_DISPLAY) {
    if(currentValue != 0) {
      currentValue = currentValue * 10 + value
    }
    else {
      currentValue = value
    }
    countDigit++;
  }else {
    window.alert("You can't add more values")
  }
  return currentValue
}

const replaceComma = (value) => {
  return value.toString().replace('.',',')
}

const appendDecimalNumbers = (value) => {
  if(countDigit < MAX_DIGITS_IN_DISPLAY) {
    if(isDecimal) {
      currentValueToString = currentValue + "," + value
      console.log(typeof currentValueToString)
    }
    else {
      currentValue = value
    }
    countDigit++;
  }
  else {
    window.alert("You can't add more values")
  }
  return parseFloat(currentValueToString.replace(',','.'))
}

const negateButton = (displayValue) => {
  displayValue = displayValue * -1
  currentValue = displayValue
  console.log(typeof displayValue)
  setDisplay(displayValue)
}

const operatorButtons = (buttonPointName) => {
  if (buttonPointName === 'point') {
    if (!isDecimal && countDigit < MAX_DIGITS_IN_DISPLAY) {
      setDisplay(currentValue + ',');
      isDecimal = true;
    }
  }
}

/*keydown numbers, escape, control and comma*/

document.addEventListener("keydown",(event)=> {
    let pressedKey = event.key
    if(pressedKey >= '0' && pressedKey <= '9' || pressedKey == ',') {
      if(currentValue != 0 || pressedKey.toString().includes(',')) {
        currentValue += pressedKey 
      }
      else { 
        currentValue = pressedKey
      }
      setDisplay(currentValue)
  
    }
  if(pressedKey === "Escape") {
    reset()
  }else if(pressedKey === "Control") {
    negateButton(currentValue)
  }
})