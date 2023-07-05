const MAX_DIGITS_IN_DISPLAY = 10
const display = document.querySelector('div[name="display"] span')

let inputValue = null
let valueDisplay = ""
let firstNumber = null
let operator = null
let secondNumber = null
let result = null
let pendingZeros = false
let isEqualPressed = false

const concatInputsNumbers = (value) => { 
  valueDisplay = inputValue
  valueDisplay = valueDisplay.toString() + value
  inputValue = parseFloat(valueDisplay)
  setDisplay(valueDisplay)
  return
}
  
const putZerosAndConcatNumbers = (value) => {
  valueDisplay = valueDisplay.toString()
  valueDisplay = valueDisplay + value
  inputValue = parseFloat(valueDisplay.replace(",", "."))
  setDisplay(valueDisplay)
  pendingZeros = false
  return
}

const putCommaAndConcatNumbers = (value) => {
  valueDisplay = inputValue
  valueDisplay = valueDisplay.toString()
  valueDisplay = valueDisplay + "." + value
  inputValue = parseFloat(valueDisplay)
  setDisplay(valueDisplay)
}

const negateInputValue = (valueToNegate) => {
  inputValue = valueToNegate * -1
  if(valueDisplay.slice(-1) === ','){
    valueDisplay = inputValue
    valueDisplay = valueDisplay + ','
  } else {
    valueDisplay = inputValue
  }
  setDisplay(valueDisplay)
  return
}

const setInputValue = (input) => {
  if(valueDisplay.replace(",", "").length + 1 >= MAX_DIGITS_IN_DISPLAY && input != '.'){
    disableNumericAndPointButtons()
  } else {
    changeStateAllButtons(false)
  }

  if(valueDisplay.replace(",", "").length + 1 > MAX_DIGITS_IN_DISPLAY && input > 0){
    return
  } else if(inputValue === 0 && input != "." && !valueDisplay.includes(",")){
    inputValue = input;
    isEqualPressed = false
    setDisplay(inputValue)
    return
  } else {
    if(isEqualPressed === true){
      inputValue = input
      setDisplay(inputValue)
      isEqualPressed = false
    }else if(valueDisplay.slice(-1) === ","){
      putCommaAndConcatNumbers(input)
      return
    } else if(input === 0){
      valueDisplay = valueDisplay + input
      inputValue = parseFloat(valueDisplay.replace(",", "."))
      setDisplay(valueDisplay)
      return
    } else if(pendingZeros === true){
      putZerosAndConcatNumbers(input)
    } else {
      if(handleExponentialNumbers(inputValue, input) === true){
        setDisplay(valueDisplay)
        return
      } else {
        concatInputsNumbers(input)
      }
      return
    } 
  }
}

const setDisplay = (value) => {
  valueDisplay = value.toString().replace(".", ",")
  if(valueDisplay.includes("e-")){
    handleExponentialNumbers(valueDisplay, null)
  }

  display.innerHTML = valueDisplay
}

const handleExponentialNumbers = (value, valueToConcat) => {
  concatened = false
  valueDisplay = value.toString()
  if(!valueDisplay.includes('e-')){
    return
  }
  negativeNumber = false
  numZeros = valueDisplay.slice(-1) - 1
  number = valueDisplay.charAt(0)
  if(number === '-'){
    number = valueDisplay.charAt(1)
    negativeNumber = true
  }
  valueDisplay = '0,'
  for(cont = 0; cont < numZeros; cont++){
    valueDisplay += "0"
  }
  valueDisplay += number
  if(negativeNumber === true){
    valueDisplay = '-' + valueDisplay
  }

  if(valueToConcat != null){
    valueDisplay += valueToConcat
    concatened = true
  }
  inputValue = parseFloat(valueDisplay)
  return concatened
}

const resetDisplay = () => {
  inputValue = 0
  valueDisplay = '0'
  firstNumber = null
  operator = null
  secondNumber = null
  result = null
  pendingZeros = false
  display.innerHTML = valueDisplay
}

const handleOperator = (operation) => {
  changeStateAllButtons(false)
  changeButtonState(true, 'negate')
  if(operator === null){
    firstNumber = inputValue
  } else if(secondNumber != null && inputValue != 0){
    handleOperation()
    firstNumber = result
  }
  operator = operation
  valueDisplay = firstNumber
  setDisplay(valueDisplay)
  inputValue = 0
  secondNumber = 0
  valueDisplay = '0'
}

const handleOperation = () => {

  if(inputValue != 0){
    secondNumber = inputValue
  }

  changeStateAllButtons(false)
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
  if(secondNumber === 0 && operator != null){
    showMessageError()
  } else if(operator === null){
    result = inputValue
  } else if(firstNumber === 0 && (operator === '+' || operator === '-')){
    if(operator === '-' && secondNumber > 0){
      negateInputValue(secondNumber)
    }
    return
  } 

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
    if(lengthOfResult > MAX_DIGITS_IN_DISPLAY){
        lengthOfResult = MAX_DIGITS_IN_DISPLAY
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
  firstNumber = null
  operator = null
  secondNumber = null 
  result = 'ERROR'
  changeStateAllButtons(true)
  changeButtonState(false ,'clean')
}

const changeButtonState = (state, name) => {
  document.getElementsByName(name)[0].disabled = state;
  return
}

const changeStateAllButtons = (state) => {
  const arrButtons = ['clean', 'negate', 'divide', 'seven', 'eight', 'nine', 'multiply', 'four', 'five', 'six', 'subtract', 'one', 'two', 'three', 'sum', 'zero', 'point', 'equal']
  arrButtons.forEach(button => {
    document.getElementsByName(button)[0].disabled = state;
  });
  if(valueDisplay.includes(',')){
    changeButtonState(true, 'point')
  }
}

const disableNumericAndPointButtons = () => {
  const arrButtons = ['seven', 'eight', 'nine', 'four', 'five', 'six', 'one', 'two', 'three', 'zero', 'point']
  arrButtons.forEach(button => {
  document.getElementsByName(button)[0].disabled = true;
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
  if(secondNumber != 0 && firstNumber != 0){
    return firstNumber / secondNumber
  } else {
    changeStateAllButtons(true)
    changeButtonState(false ,'clean')
    return "ERROR"
  }
}

const createALlButtonsFunctions = () => {
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
    pendingZeros = true
  })
  document.getElementsByName('clean')[0].addEventListener('click', () => {
    resetDisplay()
    changeStateAllButtons(false)
    changeButtonState(true, 'negate')
    changeButtonState(true, 'zero')
  })
  document.getElementsByName('point')[0].addEventListener('click', () => {
    setInputValue('.')
    changeButtonState(true, 'point')
  })
  document.getElementsByName('negate')[0].addEventListener('click', () => {
    negateInputValue(inputValue)
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
    isEqualPressed = true
  })

  //Click key buttons
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      resetDisplay()
      changeStateAllButtons(false)
      changeButtonState(true, 'negate')
      changeButtonState(true, 'zero')
    } else if (event.key === "Control") {
      negateInputValue(inputValue)
    }
    arrKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ','];
    arrKeys.forEach(num => {
      if(event.key == num){
        if(num === 0){
          pendingZeros = true
        }

        if(num != ','){
          setInputValue(num)
        } else {
          setInputValue('.')
        }
      }
    });
  });
}
createALlButtonsFunctions();
resetDisplay()


