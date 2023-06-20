const MAX_DIGITS_IN_DISPLAY = 10

let currentValue = '0';

const setDisplay = (value) => {
  if (value === ',' && currentValue.includes(',')) {
    return;
  }
  if (currentValue === '0' && value !== ',') {
    currentValue = value;
  } else if (currentValue.length < MAX_DIGITS_IN_DISPLAY && value !== currentValue) {
    currentValue += value;
  }
  display.innerHTML = currentValue;
}


const reset = document.querySelector('button[name="clean"]');
reset.addEventListener('click', () => {
  currentValue = '0';
  setDisplay(currentValue);
});

const negate = document.querySelector('button[name="negate"]');
negate.addEventListener('click', () => {
  if (currentValue === '0' || /^0,0*$/.test(currentValue)) {
    return;
  }
  if (currentValue.startsWith('-')) {
    currentValue = currentValue.slice(1);
  } else {
    currentValue = '-' + currentValue;
  }
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

const keyCodes = {
  '48': '0',
  '49': '1',
  '50': '2',
  '51': '3',
  '52': '4',
  '53': '5',
  '54': '6',
  '55': '7',
  '56': '8',
  '57': '9',
  '96': '0',
  '97': '1',
  '98': '2',
  '99': '3',
  '100': '4',
  '101': '5',
  '102': '6',
  '103': '7',
  '104': '8',
  '105': '9',
  '188': ','
};

document.addEventListener('keydown', (event) => {
  const keyCode = event.keyCode.toString();
  if (keyCodes.hasOwnProperty(keyCode)) {
    setDisplay(keyCodes[keyCode]);
  } else if (event.keyCode === 17) {
    currentValue = currentValue * -1;
    setDisplay(currentValue);
  } else if (event.keyCode === 27) {
    currentValue = '0';
    setDisplay(currentValue);
  }
});

const sayHello = () => {
  window.alert('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.')
}