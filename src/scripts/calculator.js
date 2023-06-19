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
  sayHello()
})
reset()

const buttons = document.querySelectorAll('div[name="keypad"] button')

buttons.forEach(button => button.addEventListener('click', () => {


  if (!isNaN(button.innerHTML)) {
    if (display.innerHTML == 0) {
      setDisplay(button.innerHTML.toString());
    } else {
      setDisplay(display.innerHTML.toString() + button.innerHTML.toString());
    }


  } else {

    switch (button.getAttribute("name")) {

      case "point":
        if (!display.innerHTML.includes(button.innerHTML)) {
          setDisplay(display.innerHTML.toString() + button.innerHTML.toString());
        }
        break;

      case "clean":
        reset();
        break;

      case "negate":
        setDisplay((-1 * (display.innerHTML).replace(",", ".")).toString().replace(".", ","));
        break;
      default:
        console.log("Error");
    }
  }



})
)


