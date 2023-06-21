

const MAX_DIGITS_IN_DISPLAY = 10
const MAX_DIGITS_IN_DISPLAY_WHIT_COMMA = 11
let valueDisplay = ""
let firstNumber = null
let operator = null
let secondNumber = null
let isSecondNumber = false
let tryNegateSecondNumber = false
let arrOperations = []
const display = document.querySelector('div[name="display"] span')

const getValueDisplay = (value) => {
    value = value.toString()
    value = value.replace(".", ",")
    return value
}

const getFloatValueDisplay = (valor) => {
    valor = getValueDisplay(valueDisplay).replace(",", ".")
    return parseFloat(valor, 10)
}

const negateValueDisplay = (valor) => {
    comma = false

    if(getValueDisplay(valor).slice(-1) === ","){
      comma = true
    }
<<<<<<< Updated upstream
      

    currentFloatValue = getFloatValueDisplay()
    currentFloatValue = currentFloatValue * -1
    valueDisplay = currentFloatValue

    if(comma === true){
      valueDisplay = getValueDisplay() + ','
=======
    
    if(tryNegateSecondNumber === false){
      currentFloatValor = getFloatValueDisplay(valor)
      currentFloatValor = currentFloatValor * -1
      valueDisplay = currentFloatValor
>>>>>>> Stashed changes
    }
    else if(tryNegateSecondNumber === true){
      currentFloatValor = secondNumber
      currentFloatValor = currentFloatValor * -1
      secondNumber = currentFloatValor
      
     
      setDisplay(secondNumber)
    }
    
    if(comma === true){
      setDisplay(",")
    }  
}

const setDisplay = (value) => {
  if(isSecondNumber === true && tryNegateSecondNumber != true){
      
      valueDisplay = getValueDisplay(value)
      secondNumber = getFloatValueDisplay(value)
  }
  else if(isSecondNumber === true && tryNegateSecondNumber === true){
      secondNumber = value
      valueDisplay = getValueDisplay(firstNumber) + getValueDisplay(operator) + getValueDisplay(secondNumber)
      display.innerHTML = valueDisplay
      return
  }

  if(getValueDisplay(valueDisplay).includes(",")){
    maxDigitNumber = MAX_DIGITS_IN_DISPLAY_WHIT_COMMA
  }
  else{
    maxDigitNumber = MAX_DIGITS_IN_DISPLAY
  }
  

  if(getValueDisplay(valueDisplay).length + 1 > maxDigitNumber){
    return
  }
  else if(value === "," && getValueDisplay(valueDisplay).includes(",") && isSecondNumber === false){
    return
  }
  else if(getValueDisplay(valueDisplay) === "0" && value != "," && isSecondNumber === false){
    valueDisplay = value;
  }
  else{
    if(isSecondNumber === false){
      valueDisplay = getValueDisplay(valueDisplay) + value;
    }
  }

  if(isSecondNumber === false){
    display.innerHTML = valueDisplay
  }
  else if(isSecondNumber === true){
    valueDisplay = getValueDisplay(firstNumber) + getValueDisplay(operator) + getValueDisplay(secondNumber)
    display.innerHTML = valueDisplay
  }


}

const reset = () => {
  setDisplay("0")
}

handleOperator = () => {
  firstNumber = getFloatValueDisplay(valueDisplay)
  operator = valueDisplay.slice(-1)
  isSecondNumber = true
  tryNegateSecondNumber = true
}

const handleOperation = () => {
  if(tryNegateSecondNumber === false){
    secondNumber = getFloatValueDisplay(valueDisplay)
  }

  switch (operator){
    case '+':
      result = sumNumbers(firstNumber, secondNumber)
      break;

    case '-':
      result = subtractNumbers(firstNumber, secondNumber)
      break;

    case '*':
      result = multiplyNumbers(firstNumber, secondNumber)
      break;

    case '/':
      result = divideNumbers(firstNumber, secondNumber)
      break;
  } 

      console.log(firstNumber)
      console.log(operator)
      console.log(secondNumber)
      console.log(result)

      isSecondNumber = false
      tryNegateSecondNumber = false
      valueDisplay = ""
      setDisplay(result)
      firstNumber = null
      operator = null
      secondNumber = null
      
}

sumNumbers = (firstNumber, secondNumber) => {
    return firstNumber + secondNumber
}
subtractNumbers = (firstNumber, secondNumber) => {
    return firstNumber - secondNumber
}
multiplyNumbers = (firstNumber, secondNumber) => {
    return firstNumber * secondNumber
}
divideNumbers = (firstNumber, secondNumber) => {
    return firstNumber / secondNumber
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
  setDisplay(getValueDisplay(valueDisplay))
})
document.getElementsByName('point')[0].addEventListener('click', () => {
  setDisplay(",")
})
document.getElementsByName('negate')[0].addEventListener('click', () => {
      negateValueDisplay(valueDisplay)
      display.innerHTML = getValueDisplay(valueDisplay);
})
 

document.getElementsByName('divide')[0].addEventListener('click', () => {
  setDisplay("/")
  handleOperator()
})
document.getElementsByName('multiply')[0].addEventListener('click', () => {
  setDisplay("*")  
  handleOperator()
})
document.getElementsByName('subtract')[0].addEventListener('click', () => {
  setDisplay("-")
  handleOperator()
})
document.getElementsByName('sum')[0].addEventListener('click', () => {
  setDisplay("+")
  handleOperator()
})
document.getElementsByName('equal')[0].addEventListener('click', () => {
  handleOperation()
})

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
<<<<<<< Updated upstream
    valueDisplay = "0";
    setDisplay(getValueDisplay())

  }
  else if (event.key === "Control") {
    negateValueDisplay()
    setDisplay(getValueDisplay())
=======
    valueDisplay = "0"
    display.innerHTML = getValueDisplay(valueDisplay)
  }
  else if (event.key === "Control") {
      negateValueDisplay(valueDisplay)  
      display.innerHTML = getValueDisplay(valueDisplay)
>>>>>>> Stashed changes
  }
  
  arrKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ','];
  arrKeys.forEach(num => {
    if(event.key == num){
      setDisplay(num)
    }
  });

});


reset()
