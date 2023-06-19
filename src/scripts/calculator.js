const MAX_DIGITS_IN_DISPLAY = 10
const displayNumber = document.getElementById('displayNumber')

const sayHello = () => {
  window.alert('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.')
}

function setDisplay (value) {
  displayNumber.value = value
}

function reset (value = 0) {
  setDisplay(value)
}