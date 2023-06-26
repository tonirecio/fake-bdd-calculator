const MAX_DIGITS_IN_DISPLAY = 10

const setDisplay = (value) => {
  display.innerHTML = value
}

let currentValue = 0
let previousOperand
let countDigit = 0
let isDecimal = false
//let number
//let operator
//isnextnumberdecimal
//isdisplaytobecleaned

const display = document.querySelector('div[name="display"] span')

document.getElementsByName('zero')[0].addEventListener('click', () =>{
  addNumberButtons(0)
})
document.getElementsByName('one')[0].addEventListener('click', () =>{
  addNumberButtons(1)
})
document.getElementsByName('two')[0].addEventListener('click', () =>{
  addNumberButtons(2)
})
document.getElementsByName('three')[0].addEventListener('click', () =>{
  addNumberButtons(3)
})
document.getElementsByName('four')[0].addEventListener('click', () =>{
  addNumberButtons(4)
})
document.getElementsByName('five')[0].addEventListener('click', () =>{
  addNumberButtons(5)
})
document.getElementsByName('six')[0].addEventListener('click', () =>{
  addNumberButtons(6)
})
document.getElementsByName('seven')[0].addEventListener('click', () =>{
  addNumberButtons(7)
})
document.getElementsByName('eight')[0].addEventListener('click', () =>{
  addNumberButtons(8)
})
document.getElementsByName('nine')[0].addEventListener('click', () =>{
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
  operatorButtons('+')
})
document.getElementsByName('subtract')[0].addEventListener('click', () => {
  
})
const buttonPointName = document.getElementsByName('point')[0].addEventListener('click', () => {
  operatorButtons('point')
})
document.getElementsByName('equal')[0].addEventListener('click', () => {
  
})

const addNumberButtons = (number) =>{
  appendNumbers(number)
  setDisplay(currentValue)
}

const reset = () => {
  currentValue = 0
  previousOperand = 0
  setDisplay(0)
}
/*
const appendNumbers = (value) => {
  if(countDigit <= MAX_DIGITS_IN_DISPLAY){
    if(currentValue != 0 ){
      console.log(typeof currentValue)
      currentValue = currentValue * 10 + value
    }
    else {
      currentValue = value
    }
    countDigit++;
  }
  else {
    window.alert("3")
  }
}
*/
const appendNumbers = (value) => {
  if (countDigit <= MAX_DIGITS_IN_DISPLAY) {
    if (currentValue !== 0) {
      // Verificar si ya hay una coma en el valor actual
      if (!isDecimal) {
        currentValue = currentValue * 10 + value;
      } else {
        // Calcular la cantidad de dígitos después de la coma
        const decimalDigits = currentValue.toString().split('.')[1];
        const decimalMultiplier = Math.pow(10, decimalDigits.length);
        const newValue = currentValue + value / decimalMultiplier;
        currentValue = parseFloat(newValue.toFixed(decimalDigits.length));
      }
    } else {
      currentValue = value;
    }
    countDigit++;
    setDisplay(currentValue);
  } else {
    window.alert("3");
  }
};
 
const negateButton = (displayValue) => {
  displayValue = displayValue * -1
  currentValue = displayValue
  setDisplay(displayValue)
}

//const buttons = document.querySelector('keypad')
/*
const operatorButtons = (buttonPointName) => {
  if (buttonPointName == 'point') {
    setDisplay(currentValue + ',')
    console.log(typeof currentValue)
  }
};
*/
const operatorButtons = (buttonPointName) => {
  if (buttonPointName === 'point') {
    if (!isDecimal) {
      setDisplay(currentValue + ',');
      isDecimal = true;
    }
  }
};

/*keydown numbers, escape, control and comma*/

document.addEventListener("keydown",(event)=> {
    let pressedKey = event.key
    if(pressedKey >= '0' && pressedKey <= '9' || pressedKey == ','){
      if(currentValue != 0 || pressedKey.toString().includes(',')){
        currentValue += pressedKey 
      }
      else {
        currentValue = pressedKey
      }
      setDisplay(currentValue)
  
    }
  if(pressedKey === "Escape"){
    reset()
  }else if(pressedKey === "Control"){
    negateButton(currentValue)
  }
})