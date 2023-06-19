const MAX_DIGITS_IN_DISPLAY = 10

const updateDisplay = (value) => {
  display.innerHTML = 0
}

const sayHello = () => {
  window.alert('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.')
}

const reset = () => {
  updateDisplay(0)
}

const display = document.querySelector('div[name="display"] span')
document.getElementsByName('multiply')[0].addEventListener('click', () => {
  sayHello()
})
reset()


let symbol
let number
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

//