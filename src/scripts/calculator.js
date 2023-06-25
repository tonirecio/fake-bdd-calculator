const MAX_DIGITS_IN_DISPLAY = 10
const display = document.querySelector('div[name="display"] span')

let inputValue = null
let valueDisplay = ""
let firstNumber = null
let operator = null
let secondNumber = null
let result = null
let isSecondNumber = false
let tryingNegateNumber = false

const concatInputsNumbers = (value) => {
  if(tryingNegateNumber === true){
    inputValue = value
    setDisplay(inputValue)
    return
  } else {  
      valueDisplay = inputValue
      valueDisplay = valueDisplay.toString() + value
      inputValue = parseFloat(valueDisplay)
      setDisplay(valueDisplay)
      return
  } 
}
  
const putCommaAndConcatNumbers = (value) => {
  valueDisplay = inputValue
  valueDisplay = valueDisplay.toString()
  if(tryingNegateNumber == false){
    valueDisplay = valueDisplay + "." + value
  } else {
    valueDisplay = valueDisplay + "."
  }
  inputValue = parseFloat(valueDisplay)
  setDisplay(valueDisplay)
}

const negateInputValue = (valueToNegate) => {
  if(valueDisplay.slice(-1) === ','){
    pendingComma = true
  }
  tryingNegateNumber = true
  inputValue = valueToNegate * -1
  setInputValue(inputValue)
  return
}

const setInputValue = (input) => {
  enableAllButtons()

  if((valueDisplay.replace(",", "")).length + 1 > MAX_DIGITS_IN_DISPLAY && tryingNegateNumber === false){
    return
  } else if(input === "." && valueDisplay.includes(",")){
    return
  } else if(inputValue === 0 && input != "." && !valueDisplay.includes(",")){
    inputValue = input;
    setDisplay(inputValue)
    return
  } else {
    if(result != null && secondNumber === null){
      inputValue = ''
      concatInputsNumbers(input)
      result = null
    } else if(valueDisplay.slice(-1) === ","){
        putCommaAndConcatNumbers(input)
        return
    } else {
        concatInputsNumbers(input)
        return
    } 
  }
}

const setDisplay = (value) => {
  valueDisplay = value.toString().replace(".", ",")
  if(isSecondNumber === false){
    display.innerHTML = valueDisplay
  } else {
      secondNumber = parseFloat(value)
      display.innerHTML = valueDisplay.replace(".", ",")
  }
}

const resetDisplay = () => {
  inputValue = 0
  valueDisplay = '0'
  display.innerHTML = valueDisplay
}

const handleOperator = (operation) => {
  changeButtonState(true, 'negate')
  if(operator === null){
    firstNumber = inputValue
  } else if(secondNumber != null){
    handleOperation()
    firstNumber = result
  }
  operator = operation
  valueForDisplay = firstNumber
  setDisplay(valueDisplay)
  isSecondNumber = true
  inputValue = 0
  valueDisplay = '0'
}

const handleOperation = () => {
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

  if(secondNumber === null && operator != null){
    showMessageError()
  } else if(operator === null){
    result = inputValue
  }

  isSecondNumber = false
  tryingNegateNumber = false
  valueDisplay = result
  valueDisplay = valueDisplay.toString()  

  controlDecimalsResult()
  setDisplay(result)

  firstNumber = null
  operator = null
  secondNumber = null 
  inputValue = result
  valueDisplay = ''
  return
}

const controlDecimalsResult = () => {
  if(valueDisplay.includes(".")){
    valueDisplay.replace(".", "")
    lengthOfResult = valueDisplay.length 
    if(lengthOfResult > 10){
        lengthOfResult = 10
    }      
    result = result.toPrecision(lengthOfResult) * 1
    return
  } else if(valueDisplay.length > MAX_DIGITS_IN_DISPLAY){
    showMessageError()
    return
  }
}

const showMessageError = () => {
  inputValue = 0
  isSecondNumber = false
  tryingNegateNumber = false
  firstNumber = null
  operator = null
  secondNumber = null 
  result = 'ERROR'
}

const changeButtonState = (state, name) => {
  document.getElementsByName(name)[0].disabled = state;
  return
}

const enableAllButtons = () => {
  const arrButtons = ['clean', 'negate', 'divide', 'seven', 'eight', 'nine', 'multiply', 'four', 'five', 'six', 'subtract', 'one', 'two', 'three', 'sum', 'zero', 'point', 'equal']
  arrButtons.forEach(button => {
    document.getElementsByName(button)[0].disabled = false;
  });
}

const sumNumbers = (firstNumber, secondNumber) => {
  return firstNumber + secondNumber
}
const subtractNumbers = (firstNumber, secondNumber) => {
  return firstNumber - secondNumber
}
const multiplyNumbers = (firstNumber, secondNumber) => {
  return firstNumber * secondNumber
}
const divideNumbers = (firstNumber, secondNumber) => {
  if(secondNumber != 0){
    return firstNumber / secondNumber
  } else {
    return "ERROR"
  }
}

const writeNumber = () => {
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
    changeButtonState(true, 'negate')
    changeButtonState(true, 'zero')
  })
  document.getElementsByName('point')[0].addEventListener('click', () => {
    setInputValue('.')
  })
  document.getElementsByName('negate')[0].addEventListener('click', () => {
    negateInputValue(inputValue)
    tryingNegateNumber = false
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
    } else if (event.key === "Control") {
      negateInputValue(inputValue)
      tryingNegateNumber = false
    }
    arrKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ','];
    arrKeys.forEach(num => {
      if(event.key == num){
        if(num != ','){
          setInputValue(num)
        } else {
           setInputValue('.')
        }
      }
    });
  });
}

writeNumber();
resetDisplay()
