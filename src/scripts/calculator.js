const MAX_DIGITS_IN_DISPLAY = 10 
const COMMA_CHARACTER = ',' 
const display = document.querySelector('div[name="display"] span') 
const COMMA_BUTTON = document.getElementsByName('point')[0]
const NEGATE_BUTTON = document.getElementsByName('negate')[0]
const CLEAN_BUTTON = document.getElementsByName('clean')[0]
const ZERO_BUTTON = document.getElementsByName('zero')[0]
const ONE_BUTTON = document.getElementsByName('one')[0]
const TWO_BUTTON = document.getElementsByName('two')[0]
const THREE_BUTTON = document.getElementsByName('three')[0]
const FOUR_BUTTON = document.getElementsByName('four')[0]
const FIVE_BUTTON = document.getElementsByName('five')[0]
const SIX_BUTTON = document.getElementsByName('six')[0]
const SEVEN_BUTTON = document.getElementsByName('seven')[0]
const EIGHT_BUTTON = document.getElementsByName('eight')[0]
const NINE_BUTTON = document.getElementsByName('nine')[0]
const DIVIDE_BUTTON = document.getElementsByName('divide')[0]
const MULTUPLY_BUTTON = document.getElementsByName('multiply')[0]
const SUBSTRACT_BUTTON = document.getElementsByName('subtract')[0]
const SUM_BUTTON = document.getElementsByName('sum')[0]
const EQUAL_BUTTON = document.getElementsByName('equal')[0]

var inMemoryNumber = 0 //El numero que se queda en memoria para poder hacer calculos
var savedOperator = ''
var isANumberOnMemory = false
var isTheOperationFinished = false

const setDisplay = (value) => {
  display.innerHTML = value
}

const getDisplayNumber = () => {

  var numero = display.innerHTML
  numero = numero.replace(COMMA_CHARACTER, '.')
  numero = parseFloat(numero)
  return numero

}

const sayHello = () => {
  window.alert('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '. Number saved = ' + inMemoryNumber)
}

const invertNumberDisplay = () => {
  
  if (isOnDisplayZero() == false && isOnDisplayZeroWithDot() == false) {

    var displayNumber = display.innerHTML
    if (isANegativeNumberDisplay()) displayNumber = displayNumber.slice(1) 
    else displayNumber = '-' + displayNumber 

    setDisplay(displayNumber) 

  }

}

const reset = () => {
  setDisplay(0)
  inMemoryNumber = 0
  savedOperator = ''
}

const addToTheDisplay = (value) => {

  if (isTheOperationFinished) {

    setDisplay(0)
    isTheOperationFinished = false

  }

  if (!isTheMaxLenght()) {

    var actualDisplay = display.innerHTML

    if (isOnDisplayZero()){

      if (value == COMMA_CHARACTER) setDisplay('0' + COMMA_CHARACTER)
      else setDisplay(value) 

    }
    else {

      if (value == COMMA_CHARACTER){

        if (isADotOnDisplay() == false){

          actualDisplay += value
          setDisplay(actualDisplay)

        }

      }
      else{

        actualDisplay += value
        setDisplay(actualDisplay)

      }

    }

  }

}

const numbersBeforeComma = (value) => {

  var numero = value.toString().split('.')[0].replace('-','')
  return numero.length;

}

const numberAfterComma = (value) => {

  var numero = value.toString().split('.')[1]
  return numero.length;

}

const roundNumber = (value, decimal) => {

  var multiple = 1

  for (var i = 0; i < decimal; i++) multiple *= 10

  var numero = value * multiple
  numero = Math.round(numero)
  numero /= multiple

  return numero

}

const showResults = (value) => {

  var result = value.toString();

  if (isADotOnThis(value) == false) {
    
    if (isOnRangeOfNotError(value)) setDisplay(result)
    else setDisplay("ERROR") 


  }
  else {

    if(isOnRangeOfNotError(value)) {

      var countOfNumberBeforeComma = numbersBeforeComma(value)

      if(value < 0) value = roundNumber(value,MAX_DIGITS_IN_DISPLAY + 2 - countOfNumberBeforeComma)
      else value = roundNumber(value,MAX_DIGITS_IN_DISPLAY - countOfNumberBeforeComma)

      result = value.toString()

      //In this line we are taking the last numbers that are zeros and we remove them replacing them with nothing

      result = result.replace(/\.?0+$/, "");
      result = result.replace('.', COMMA_CHARACTER)
      setDisplay(result)

    }
    else setDisplay("ERROR")

  }

}

const emptyStoredMemory = () => {

  inMemoryNumber = getDisplayNumber()
  setDisplay(0)

}

const operatorSelect = (value) => {

    savedOperator = value 
    if (!isANumberOnMemory) emptyStoredMemory()
    isANumberOnMemory = true

}
const operate = () => {

  if (savedOperator == '+') {
    doAddition()
    resetMemoryNumberAndOperator()
  }
  else if (savedOperator == '-') {
    doSubstraction()
    resetMemoryNumberAndOperator()
  }
  else if (savedOperator == '*') {
    doMultiplication()
    resetMemoryNumberAndOperator()
  }
  else if (savedOperator == '/') {
    doDivision()
    resetMemoryNumberAndOperator()
  }

}

const resetMemoryNumberAndOperator = () => {

  savedOperator = ''
  isANumberOnMemory = false
  inMemoryNumber = 0
  isTheOperationFinished = true

}

const doAddition = () => {

  var total = inMemoryNumber + getDisplayNumber()
  showResults(total)

}

const doSubstraction = () => {

  var total = inMemoryNumber - getDisplayNumber()
  showResults(total)

}

const doMultiplication = () => {

  var total = inMemoryNumber * getDisplayNumber()
  showResults(total)

}

const doDivision = () => {

  var total = inMemoryNumber / getDisplayNumber()
  showResults(total)

}

document.addEventListener('keydown', () => {
  if (event.key === "Escape" || event.keyCode === 27) reset()
  else if (event.ctrlKey) invertNumberDisplay()
  else if (event.key === "0") addToTheDisplay(0)
  else if (event.key === "1") addToTheDisplay(1)
  else if (event.key === "2") addToTheDisplay(2)
  else if (event.key === "3") addToTheDisplay(3)
  else if (event.key === "4") addToTheDisplay(4)
  else if (event.key === "5") addToTheDisplay(5)
  else if (event.key === "6") addToTheDisplay(6)
  else if (event.key === "7") addToTheDisplay(7)
  else if (event.key === "8") addToTheDisplay(8)
  else if (event.key === "9") addToTheDisplay(9)
  else if (event.key === "+") operatorSelect('+')
  else if (event.key === "-") operatorSelect('-')
  else if (event.key === "*") operatorSelect('*')
  else if (event.key === "/") operatorSelect('/')
  else if (event.key === COMMA_CHARACTER) addToTheDisplay(COMMA_CHARACTER)
})

COMMA_BUTTON.addEventListener('click', () => { addToTheDisplay(COMMA_CHARACTER) })
NEGATE_BUTTON.addEventListener('click', () => { invertNumberDisplay() })
CLEAN_BUTTON.addEventListener('click', () => { reset() })
ZERO_BUTTON.addEventListener('click', () => { addToTheDisplay(0) })
ONE_BUTTON.addEventListener('click', () => { addToTheDisplay(1) })
TWO_BUTTON.addEventListener('click', () => { addToTheDisplay(2) })
THREE_BUTTON.addEventListener('click', () => { addToTheDisplay(3) })
FOUR_BUTTON.addEventListener('click', () => { addToTheDisplay(4) })
FIVE_BUTTON.addEventListener('click', () => { addToTheDisplay(5) })
SIX_BUTTON.addEventListener('click', () => { addToTheDisplay(6) })
SEVEN_BUTTON.addEventListener('click', () => { addToTheDisplay(7) })
EIGHT_BUTTON.addEventListener('click', () => { addToTheDisplay(8) })
NINE_BUTTON.addEventListener('click', () => { addToTheDisplay(9) })
DIVIDE_BUTTON.addEventListener('click', () => { operatorSelect('/') })
MULTUPLY_BUTTON.addEventListener('click', () => { operatorSelect('*') })
SUBSTRACT_BUTTON.addEventListener('click', () => { operatorSelect('-') })
SUM_BUTTON.addEventListener('click', () => { operatorSelect('+') })
EQUAL_BUTTON.addEventListener('click', () => { operate() })
reset()

const isTheMaxLenght = () => {

  var displayString = display.innerHTML
  var totalLenght = displayString.length

  if (displayString.includes(",")) totalLenght -= 1

  if (totalLenght >= MAX_DIGITS_IN_DISPLAY) return true
  else return false

}

const isOnDisplayZero = () => {

  var displayString = display.innerHTML

  if (displayString == 0) return true
  else return false

}

const isADotOnDisplay = () => {

  var displayString = display.innerHTML

  if (displayString.includes(COMMA_CHARACTER)) return true
  else return false

}

const isADotOnThis = (value) => {

  var displayString = value.toString() 

  if (displayString.includes('.')) return true
  else return false

}

const isANegativeNumberDisplay = () => {

  var displayString = display.innerHTML

  if (displayString.includes('-')) return true
  else return false

}

const isANegativeNumber = (value) => {

  if (value < 0) return true
  else return false

}

const isOnDisplayZeroWithDot = () => {

  var displayString = display.innerHTML

  if (displayString == '0' + COMMA_CHARACTER ) return true
  else return false

}

const operationUnselected = () => {

  if (savedOperator == '') return true
  else return false

}

const isOnRangeOfNotError = (value) => {

  var numeroLimite = '' 

  for (var i = 0 ; i < MAX_DIGITS_IN_DISPLAY ; i++) numeroLimite = numeroLimite + 9

  numeroLimite = parseInt(numeroLimite) 

  if (numeroLimite >= value && value >= -numeroLimite) return true 
  else return false 

}