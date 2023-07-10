const MAX_DIGITS_IN_DISPLAY = 10
const display = document.querySelector('div[name="display"] span')

let inputValue = null
let firstNumber = null
let operator = null
let secondNumber = null
let result = null
let countZeros = 0
let pendingComma = false
let isEqualPressed = false
let numDecimals = 10
let storedZeros = ''


const concatInputsNumbers = (valueToConcat) => {
  if(valueToConcat === '.'){
    pendingComma = true
    setDisplay(inputValue)
    return
  } 
   
  if(inputValue >= 0){
    concatPositiveNumbers(valueToConcat)
  } else if(countZeros === 0) {
    concatNegativeNumbers(valueToConcat)
  } 
  
  if(valueToConcat === 0 && inputValue % 1 != 0){
    storedZeros += '0'
    countZeros += 1
    concatZeros()
    
  } else if(valueToConcat != 0){
    countZeros = 0
  }
}

const concatZeros = () => {
  inputValueToString = inputValue + storedZeros
  if(inputValueToString.length > MAX_DIGITS_IN_DISPLAY){
    console.log(inputValueToString.length);
    disableNumericAndPointButtons()
    return
  }
  setDisplay(inputValueToString)
  countZeros = 0
}

const concatPositiveNumbers = (valueToConcat) => {
  if(valueToConcat != '.' && inputValue % 1 === 0 && countZeros === 0){
    inputValue = inputValue * 10 + valueToConcat
    setDisplay(inputValue)
  } else if(countZeros > 0){
    var zerosToConcat = '0'
    numDecimals = numDecimals * 10
    zerosToConcat = zerosToConcat.repeat(countZeros, '0')
    valueForDisplay = inputValue + '.' + zerosToConcat + valueToConcat
    setDisplay(valueForDisplay)
    inputValue = parseFloat(valueForDisplay)
    countZeros += 1
  } else {
    numDecimals = numDecimals * 10
    inputValue = (inputValue * numDecimals + valueToConcat) / numDecimals
    inputValue = inputValue.toFixed(numDecimals.toString().length - 1)
    inputValue = parseFloat(inputValue, 10)
    setDisplay(inputValue)
  }
}

const concatNegativeNumbers = (valueToConcat) => {
 if(valueToConcat != '.' && inputValue % 1 === 0 && countZeros === 0){
    inputValue = inputValue * 10 - valueToConcat
    setDisplay(inputValue)
  } else if(countZeros > 0){
    var zerosToConcat = '0'
    numDecimals = numDecimals * 10
    zerosToConcat = zerosToConcat.repeat(countZeros, '0')
    valueForDisplay = inputValue + '.' + zerosToConcat + valueToConcat
    setDisplay(valueForDisplay)
    inputValue = parseFloat(valueForDisplay)
    countZeros += 1
  } else {
    numDecimals = numDecimals * 10
    inputValue = (inputValue * numDecimals - valueToConcat) / numDecimals
    inputValue = inputValue.toPrecision(numDecimals.toString().length)
    inputValue = parseFloat(inputValue, 10)
    setDisplay(inputValue)
  }
}

const putCommaAndConcatNumbers = (valueToConcat) => {
  if(valueToConcat != 0){
    if(inputValue >= 0){
    inputValue = (inputValue * 10 + valueToConcat) / 10
    } else {
      inputValue = (inputValue * 10 - valueToConcat) / 10
    }
    pendingComma = false
    setDisplay(inputValue)
  } else {
    pendingComma = false
    countZeros += 1
    var zerosToConcat = '0'

    zerosToConcat = zerosToConcat.repeat(countZeros)
    valueToDisplay = inputValue + ',' + zerosToConcat
    setDisplay(valueToDisplay)
  }
}

const negateInputValue = (valueToNegate) => {
  inputValue = valueToNegate * -1
  setDisplay(inputValue)
}

const setInputValue = (input) => {
  var inputValueToString = inputValue
  if(inputValueToString.toString().replace(",", "").length + 1 >= MAX_DIGITS_IN_DISPLAY && input != '.'){
    disableNumericAndPointButtons()
  } else {
    changeStateAllButtons(false)
  }

  if(inputValueToString.toString().replace(".", "").length + 1 > MAX_DIGITS_IN_DISPLAY && input >= 0){
    return
  } else if(inputValue % 1 != 0 && input === '.'){
    return
  } else {
    if(isEqualPressed === true){
      inputValue = input
      setDisplay(inputValue)
      isEqualPressed = false
    }else if(pendingComma === true){
      putCommaAndConcatNumbers(input)
      return
    } else {
      if(handleExponentialNumbers(inputValue, input) === true){
        setDisplay(valueDisplay)
        return
      } else {
        concatInputsNumbers(input)
      }
    } 
  }
}

const setDisplay = (value) => {
  value = value.toString().replace(".", ",")
  if(pendingComma === true){
    value = value + ','
  }
  display.innerHTML = value
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

const resetCalculator = () => {
  resetDisplay()
  firstNumber = null
  operator = null
  secondNumber = null
  result = null
  pendingZeros = 0
}

const resetDisplay = () => {
  inputValue = 0
  setDisplay(inputValue)
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
  setDisplay(firstNumber)
  resetDisplay()
  numDecimals = 10
  countZeros = 0
  secondNumber = 0
}

const handleOperation = () => {
  secondNumber = inputValue
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
  } else {
    controlDecimalsResult()
    setDisplay(result)
    firstNumber = null
    operator = null
    secondNumber = null
    inputValue = result
  }
}

const controlDecimalsResult = () => {
  inputValueToString = inputValue
  if(inputValue % 1 != 0){
    inputValueToString.toString().replace(".", "")
    lengthOfResult = inputValueToString.length 
    if(lengthOfResult > MAX_DIGITS_IN_DISPLAY){
        lengthOfResult = MAX_DIGITS_IN_DISPLAY
    }   
    result = result.toPrecision(lengthOfResult) * 1
    result = parseFloat(result, 10)
  } else if(inputValueToString.length > MAX_DIGITS_IN_DISPLAY){
    showMessageError()
  }
}

const showMessageError = () => {
  resetCalculator()
  setDisplay('ERROR')
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
    changeButtonState(state, button)
  });
  if(inputValue % 1 != 0){
    changeButtonState(true, 'point')
  }
}

const disableNumericAndPointButtons = () => {
  const arrButtons = ['seven', 'eight', 'nine', 'four', 'five', 'six', 'one', 'two', 'three', 'zero', 'point']
  arrButtons.forEach(button => {
  changeButtonState(true, button)
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
    showMessageError()
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
    resetCalculator()
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
      resetCalculator()
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
 resetCalculator()


