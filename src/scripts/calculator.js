const MAX_DIGITS_IN_DISPLAY = 10

let countDigits = 0
//Scenario Writing numbers
let comaUsage = false

const display = document.querySelector('div[name="display"] span')

let currentOperand = 0
let pastOperand
let currentNumber = 0
let pastNumber = 0



const updateDisplay = (value) => {
  value = value.toString();
  valueComas = value.replace(/\./, ",")
  display.innerHTML = valueComas
}

const reset = () => {
  updateDisplay(0)
  countDigits = 0
  currentOperand = 0
  dotUsage = false
}

const negate = (operand) => {
  operand = operand.toString()
  operandFloat = parseFloat(operand)
  operandFloat = operandFloat * -1
  if (operand.charAt(operand.length - 1) == '.'){
    operandFloat += '.'
  }
  updateDisplay(operandFloat)
  currentOperand = operandFloat
}

document.getElementsByName('negate')[0].addEventListener('click', () => {
  console.log(currentOperand)
  negate(currentOperand)
})



reset()



document.getElementsByName('clean')[0].addEventListener('click', () => {
  reset()
})


// Scenario Pressing non-operators screen buttons
const nonOperatorButtons = document.querySelectorAll('button:not([aria-label])')

nonOperatorButtons.forEach(nonOperatorButton => {
  nonOperatorButton.addEventListener('click', () => {
    console.log("LOL", parseFloat(currentOperand))
    if (countDigits < MAX_DIGITS_IN_DISPLAY){
      if (nonOperatorButton.textContent == ',' && !dotUsage) {        
        currentOperand += '.'
        dotUsage = true
      } else if ( nonOperatorButton.textContent == ',' && dotUsage) {
        window.alert("Is not possible to add more dots")      
      } else if (currentOperand != 0 || currentOperand.toString().includes('.')) {
        currentOperand += nonOperatorButton.textContent        
        countDigits++
      } else {
        currentOperand = nonOperatorButton.textContent
        countDigits++
      }
      
      updateDisplay(currentOperand)
    } else{
      window.alert('Maximum digit capacity reached')
    }
      
  })
})

//Scenario Pressing non-operators keys

const nonDigitKeys = ['Escape', 'Control', '/', '*', '-', '+']

document.addEventListener('keydown', (event) => {
  let keyPressed = event.key; 
      
if (countDigits < MAX_DIGITS_IN_DISPLAY){      
  if (((keyPressed >= '0' && keyPressed <= '9') || keyPressed == ',')) {
    if (keyPressed == ',' && !dotUsage){
      currentOperand += '.'
      dotUsage = true
      
    } else if(keyPressed == ',' && dotUsage){      
      window.alert("Is not possible to add more dots")        
    } else if (currentOperand != 0 || currentOperand.toString().includes('.')){
      currentOperand += keyPressed      
      countDigits++
    } else {
      currentOperand = keyPressed
      countDigits++
    }
    updateDisplay(currentOperand)
        
  } else if (nonDigitKeys.includes(keyPressed)){
    switch (keyPressed) {
      case 'Escape':
        reset()
      case 'Control':
        negate(currentOperand)
    }
  }
} else{
        window.alert('Maximum digit capacity reached')
      }
  })


//Scenario Writing numbers








/*

const compute = () => {

}

const clear = () {

}

appendNumber = (number) => {

}

chooseOperation = (operation) {
}


*/

//yarn lint (detector de errores*)