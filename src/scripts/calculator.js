

const MAX_DIGITS_IN_DISPLAY = 10
const MAX_DIGITS_IN_DISPLAY_WHIT_COMMA = 11
const MAX_DIGITS_IN_DISPLAY_WHIT_COMMA_AND_HYPHEN  = 13
let inputValue = null
let valueDisplay = ""
let firstNumber = null
let operator = null
let secondNumber = null
let isSecondNumber = false
let comma = false
let tryNegateSecondNumber = false
let tryNegateFirstNumber = false
let arrOperations = []
const display = document.querySelector('div[name="display"] span')

const getValueDisplay = (value) => {
    value = value.toString()
    value = value.replace(".", ",")
    return value
}

const concatInputsNumbers = (value) => {
  if(tryNegateFirstNumber === false && !isSecondNumber){
    inputValue = inputValue.toString()
    inputValue = inputValue + value
    setDisplay(inputValue)
    inputValue = parseFloat(inputValue)
  }
  else if(isSecondNumber){
    if(secondNumber === null){
      secondNumber = value
      valueDisplay = secondNumber
      setDisplay(valueDisplay)
    }
    else{
      if(tryNegateSecondNumber === false){
        valueDisplay = secondNumber
        valueDisplay = valueDisplay.toString() + value
        secondNumber = parseFloat(valueDisplay, 10) 
        inputValue = parseFloat(valueDisplay, 10) 
        setDisplay(valueDisplay)
      }
      else{
        
        valueDisplay = inputValue
        
        valueDisplay = valueDisplay.toString() + value
        
        setDisplay(value)
        tryNegateSecondNumber = false
        return
      }
      

return
    }
  }
}

const putCommaAndConcatNumbers = (value) => {
  if(tryNegateFirstNumber === false){
    inputValue = inputValue.toString()
    inputValue = inputValue + "." + value
    setDisplay(inputValue)
    inputValue = parseFloat(inputValue)
  }
  else{
    inputValue = value
    setDisplay(inputValue)
    inputValue = parseFloat(inputValue)
  }
  
}

const negateInputValue = (value) => {
    
    comma = false
    if(!isSecondNumber){
      tryNegateFirstNumber = true
    }
    else{
      tryNegateSecondNumber = true
    }

    if(valueDisplay.slice(-1) === ","){
      comma = true
    }
    
    if(tryNegateFirstNumber === true){
      
      
      value = value * -1
      inputValue = value
      return
    }
    else if(tryNegateSecondNumber === true){
      
      
      value = value * -1 
      inputValue = value
      return
    }
}

const setInputValue = (value) => {
  
  if(isSecondNumber === true){
      inputValue = value
      concatInputsNumbers(inputValue)
      return
  }
  

  if((valueDisplay.replace(",", "")).length + 1 > MAX_DIGITS_IN_DISPLAY && tryNegateFirstNumber === false){
    return
  }
  else if(value === "." && valueDisplay.includes(",") && isSecondNumber === false){
    return
  }
  else if(inputValue === 0 && value != "." && !valueDisplay.includes(",") && isSecondNumber === false){
    inputValue = value;
  }
  else if(inputValue === 0 && value === "."){
    
    valueDisplay = "0,"
    setDisplay(valueDisplay)
    return
  }
  else{
    if(valueDisplay.slice(-1) === ","){
      
      putCommaAndConcatNumbers(value)
      return
    }
    else if(isSecondNumber === false && tryNegateFirstNumber === false){
      concatInputsNumbers(value)
      return
    }
    else{
      inputValue = value
    }
  }
  
  setDisplay(inputValue)
  
}

const setDisplay = (value) => {
  
  if(firstNumber != null){
      valueDisplay = firstNumber + operator
    }

  valueDisplay = value.toString().replace(".", ",")
  
  if(isSecondNumber === false){
    if(comma === true){
      valueDisplay = valueDisplay + ","
    }  
    
    display.innerHTML = valueDisplay
   
  }
  else if(isSecondNumber === true){
      
      secondNumber = value
      valueDisplay = secondNumber
      valueDisplay =  firstNumber.toString() + operator + valueDisplay.toString().replace(".", ",")
      
      display.innerHTML = valueDisplay.replace(".", ",")
   
    
  }
}

const resetDisplay = () => {
  inputValue = 0
  valueDisplay = '0'
  comma = false
  display.innerHTML = "0"
}

handleOperator = (operation) => {
  firstNumber = inputValue
  operator = operation
  valueForDisplay = operator
  setDisplay(operator)
  isSecondNumber = true
  
}

const handleOperation = () => {
  if(tryNegateSecondNumber === false){
    secondNumber = inputValue
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

      arrOperations.push(secondNumber)
      isSecondNumber = false
      tryNegateSecondNumber = false
      inputValue = result
      valueDisplay = ""
      valueDisplay = result
      
      valueDisplay = valueDisplay.toString().replace(".", "")
      
      if(){

      }
      lengthA = valueDisplay.length 
      if(lengthA > 10){
        lengthA = 10
      }
      console.log(lengthA)
      result = result.toPrecision(lengthA)

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

writeNumber = () => {

  //Click button numbers
  document.getElementsByName('seven')[0].addEventListener('click', () => {
    setInputValue(7)
  })
  document.getElementsByName('eight')[0].addEventListener('click', () => {
    setInputValue(8)
  })
  document.getElementsByName('nine')[0].addEventListener('click', () => {
    setInputValue(9)
  })
  document.getElementsByName('four')[0].addEventListener('click', () => {
    setInputValue(4)
  })
  document.getElementsByName('five')[0].addEventListener('click', () => {
    setInputValue(5)
  })
  document.getElementsByName('six')[0].addEventListener('click', () => {
    setInputValue(6)
  })
  document.getElementsByName('one')[0].addEventListener('click', () => {
    setInputValue(1)
  })
  document.getElementsByName('two')[0].addEventListener('click', () => {
    setInputValue(2)
  })
  document.getElementsByName('three')[0].addEventListener('click', () => {
    setInputValue(3)
  })
  document.getElementsByName('zero')[0].addEventListener('click', () => {
    setInputValue(0)
  })
  document.getElementsByName('clean')[0].addEventListener('click', () => {
    resetDisplay()
  })
  document.getElementsByName('point')[0].addEventListener('click', () => {
    setInputValue('.')
  })
  document.getElementsByName('negate')[0].addEventListener('click', () => {
        negateInputValue(inputValue)
        setInputValue(inputValue)
        tryNegateFirstNumber = false

  })
  document.getElementsByName('divide')[0].addEventListener('click', () => {
    handleOperator("/")
  })
  document.getElementsByName('multiply')[0].addEventListener('click', () => { 
    handleOperator("*")
  })
  document.getElementsByName('subtract')[0].addEventListener('click', () => {
    handleOperator("-")
  })
  document.getElementsByName('sum')[0].addEventListener('click', () => {
    handleOperator("+")
  })
  document.getElementsByName('equal')[0].addEventListener('click', () => {
    handleOperation()
  })

  //Click key buttons
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      resetDisplay()
    }
    else if (event.key === "Control") {
      negateInputValue(inputValue)
      setInputValue(inputValue)
      tryNegateFirstNumber = false
    }
    arrKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ','];
    arrKeys.forEach(num => {
      if(event.key == num){
        if(num != ','){
          setInputValue(num)
        }
        else{
           setInputValue('.')
        }
      }
    });

  });
}

writeNumber();
resetDisplay()
