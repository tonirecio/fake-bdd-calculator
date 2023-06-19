const MAX_DIGITS_IN_DISPLAY = 10

const setDisplay = (value) => {
  display.innerHTML = value
}

const sayHello = () => {
  window.alert('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.')
}

const reset = () => {
  setDisplay(0)
}

const display = document.querySelector('div[name="display"] span')
document.getElementsByName('multiply')[0].addEventListener('click', () => {
  setDisplay("X")
})
reset()
