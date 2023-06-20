

const MAX_DIGITS_IN_DISPLAY = 10
let valueDisplay = "";

const display = document.querySelector('div[name="display"] span')

const getValueDisplay = () => {
    valueDisplay = valueDisplay.toString()
    valueDisplay = valueDisplay.replace(".", ",")
    return valueDisplay
}

const getFloatValueDisplay = () => {
    valueDisplay = valueDisplay.replace(",", ".")
    return parseFloat(valueDisplay, 10)
}

const negateValueDisplay = () => {

    comma = false
    if(valueDisplay.slice(-1) === ","){
      comma = true
    }
      

    currentFloatValor = getFloatValueDisplay()
    currentFloatValor = currentFloatValor * -1
    valueDisplay = currentFloatValor

    if(comma === true){
      valueDisplay = getValueDisplay() + ','
    }
}

const setDisplay = (value) => {
  
  if(valueDisplay.length > MAX_DIGITS_IN_DISPLAY){
    maxNumberWarning();
  }
  else if(value === "," && getValueDisplay().includes(",")){
  
  }
else if(valueDisplay === "0" && value != ","){
    valueDisplay = value;
  }
  else{
    valueDisplay = getValueDisplay() + value;
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
  setDisplay(getValueDisplay())
})
document.getElementsByName('point')[0].addEventListener('click', () => {
  setDisplay(",")
})
document.getElementsByName('negate')[0].addEventListener('click', () => {
      negateValueDisplay()
      display.innerHTML = getValueDisplay();
})

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    valueDisplay = "0"
    display.innerHTML = getValueDisplay()

  }
  else if (event.key === "Control") {
      negateValueDisplay()  
      display.innerHTML = getValueDisplay()
  }
  
  arrNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ','];
  arrNumbers.forEach(num => {
    if(event.key == num){
      setDisplay(num)
    }
  });

});


reset()
