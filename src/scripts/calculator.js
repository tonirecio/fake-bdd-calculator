const MAX_DIGITS_IN_DISPLAY = 10

let digits = 0

const updateDisplay = (value) => {
  display.innerHTML = value
  currentNumber = value
}

const reset = () => {
  updateDisplay(0)
  digits = 0
}

const negate = (displayedValues) => {
  displayedValues = displayedValues * -1
  updateDisplay(displayedValues)
}

const display = document.querySelector('div[name="display"] span')

document.getElementsByName('negate')[0].addEventListener('click', () => {
  negate(display.innerHTML)
})


const buttons = document.querySelectorAll('button:not([aria-label])')

let currentOperand
let pastOperand 

//const calculator = new Calculator (pastOperand, currentOperand)
let currentNumber = display.innerHTML
let pastNumber


buttons.forEach(button => {
  button.addEventListener('click', () => {
    
    if (digits < MAX_DIGITS_IN_DISPLAY){
      if(display.innerHTML != 0 || button.textContent == ','){      
        currentNumber = currentNumber + button.textContent
        
      } else{
        currentNumber = button.textContent
      }
      digits++
      updateDisplay(currentNumber)
    } else{
      window.alert('Maximum digit capacity reached')
    }
      
  })
})

document.getElementsByName('clean')[0].addEventListener('click', () => {
  reset()
})


/*

document.addEventListener('keydown', (event) => {
      var keyPressed = event.key; // Get the key code or character code
      
      // Handle the key based on its value
      switch (keyPressed) {
        case '1':
          console.log('Menu option 1 selected.');
          // Add your logic for option A here
          break;
        case 'B':
          console.log('Menu option B selected.');
          // Add your logic for option B here
          break;
        case 'C':
          console.log('Menu option C selected.');
          // Add your logic for option C here
          break;
        // Add more cases for additional menu options as needed
      }
    });


*/

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