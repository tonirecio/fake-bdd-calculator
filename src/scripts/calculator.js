const MAX_DIGITS_IN_DISPLAY = 10

const setDisplay = (value) => {
  display.innerHTML = '0'
}

const sayHello = () => {
  window.alert('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.')
}

const addZero = () => {
  display.innerHTML = document.getElementById("display") + '0'
}

const addOne = () => {
  display.innerHTML = document.getElementById("display") + '1'
}



const reset = () => {
  setDisplay(0)
}

const display = document.querySelector('div[name="display"] span')



//EVENT LISTENERS
document.getElementsByName('zero')[0].addEventListener('click', () => {
  addZero()
})

document.getElementsByName('zero')[0].addEventListener('click', () => {
  addOne()
})


document.getElementsByName('multiply')[0].addEventListener('click', () => {
  sayHello()
})


reset()
