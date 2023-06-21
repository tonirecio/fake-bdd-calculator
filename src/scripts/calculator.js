const MAX_DIGITS_IN_DISPLAY = 10;
let currentValue = '0';

const setDisplay = (value) => {
  display.innerHTML = value;
  currentValue = value;
};

const handleButtonPress = (buttonValue) => {
  if (buttonValue === 'C') {
    setDisplay('0');
  } else if (buttonValue === ',' && !currentValue.includes(',')) {
    setDisplay(currentValue + buttonValue);
  } else if (buttonValue === '+-') {
    setDisplay(parseFloat(currentValue) * -1);
  } else if (currentValue === '0') {
    setDisplay(buttonValue);
  } else {
    setDisplay(currentValue + buttonValue);
  }
};

const display = document.querySelector('div[name="display"] span');

document.querySelectorAll('[data-testid]').forEach((button) => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent;
    handleButtonPress(buttonValue);
  });
});

document.getElementsByName('clean')[0].addEventListener('click', () => {
  setDisplay('0');
});

document.getElementsByName('negate')[0].addEventListener('click', () => {
  setDisplay(parseFloat(currentValue) * -1);
});

reset();
