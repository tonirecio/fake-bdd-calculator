const MAX_DIGITS_IN_DISPLAY = 10
let valueDisplay = "";

const display = document.querySelector('div[name="display"] span')


const setDisplay = (value) => {
  
  if(valueDisplay.length > MAX_DIGITS_IN_DISPLAY){
    maxNumberWarning();
  }
  else if(value === "," && valueDisplay.includes(",")){
  
  }
  else if(valueDisplay === "0" && value != ","){
    valueDisplay = value;
  }
  else{
    valueDisplay = valueDisplay + value;
  }
    display.innerHTML = valueDisplay
}

const maxNumberWarning = () => {
  window.alert('The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.')
}

const reset = () => {
  setDisplay("0")
}

document.getElementsByName('seven')[0].addEventListener('click', () => {
  setDisplay("7")
})
document.getElementsByName('eight')[0].addEventListener('click', () => {
  setDisplay("8")
})
document.getElementsByName('nine')[0].addEventListener('click', () => {
  setDisplay("9")
})
document.getElementsByName('four')[0].addEventListener('click', () => {
  setDisplay("4")
})
document.getElementsByName('five')[0].addEventListener('click', () => {
  setDisplay("5")
})
document.getElementsByName('six')[0].addEventListener('click', () => {
  setDisplay("6")
})
document.getElementsByName('one')[0].addEventListener('click', () => {
  setDisplay("1")
})
document.getElementsByName('two')[0].addEventListener('click', () => {
  setDisplay("2")
})
document.getElementsByName('three')[0].addEventListener('click', () => {
  setDisplay("3")
})
document.getElementsByName('zero')[0].addEventListener('click', () => {
  setDisplay("0")
})
document.getElementsByName('clean')[0].addEventListener('click', () => {
  valueDisplay = "0";
  setDisplay(valueDisplay)
})
document.getElementsByName('point')[0].addEventListener('click', () => {
  setDisplay(",")
})
document.getElementsByName('negate')[0].addEventListener('click', () => {
  valueDisplay = valueDisplay * -1
  display.innerHTML = valueDisplay;
})


reset()
