const MAX_DIGITS_IN_DISPLAY = 10

/*const setDisplay = (value) => {
  display.innerHTML = value
}*/
let currentValue = '0';

const setDisplay = (value) => {
  if (value === ',' && currentValue.includes(',')) {
    return;
  }
  if (currentValue === '0' && value !== ',') {
    currentValue = value;
  } else if (currentValue.length < MAX_DIGITS_IN_DISPLAY) {
    currentValue += value;
  }
  display.innerHTML = currentValue;
}

const resetButton = document.querySelector('button[name="clean"]');
resetButton.addEventListener('click', () => {
  currentValue = '0';
  setDisplay(currentValue);
});

const negate = document.querySelector('button[name="negate"]');
negate.addEventListener('click', () => {
  currentValue = currentValue * -1;
  setDisplay(currentValue);
})

const display = document.querySelector('div[name="display"] span')
document.getElementsByName('multiply')[0].addEventListener('click', () => {
  sayHello()
})

const buttons = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'point'];
buttons.forEach((buttonName) => {
  const button = document.getElementsByName(buttonName)[0];
  button.addEventListener('click', () => {
    setDisplay(button.innerHTML);
  });
});

const sayHello = () => {
  window.alert('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.')
}