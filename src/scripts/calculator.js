let value = '0'; 

const display = document.querySelector('div[name="display"] span');

const setDisplay = () => {
  display.innerHTML = value;
};

const clean = () => {
  value = '0';
  setDisplay();
};

const negate = () => {
  value = parseFloat(value) * -1;
  setDisplay();
};

const handleButtonPress = (buttonValue) => {
  switch (buttonValue) {
    case 'C':
    case 'Escape':
      clean(); 
      break;
    case ',':
      if (!value.includes(',')) {
        value += buttonValue; 
        setDisplay();
      }
      break;
    case '+-':
      negate(); 
      break;
    default:
      // Si el botón presionado es un numero del 0 al 9
      if (/^[0-9]$/.test(buttonValue)) {
        
        if (value === '0') {
          value = buttonValue; 
        } else {
          value += buttonValue; 
        }
        setDisplay();
      }
      break;
  }
};

const handleKeyPress = (event) => {
  const key = event.key;

  switch (key) {
    case 'Escape':
      clean(); 
      break;
    case 'Control':
      negate(); 
      break;
    case ',':
      if (!value.includes(',')) {
        value += key; 
        setDisplay();
      }
      break;
    default:
      // Si la tecla presionada es un numero del 0 al 9
      if (/^[0-9]$/.test(key)) {
          if (value === '0') {
          value = key; 
        } else {
          value += key; 
        }
        setDisplay();
      }
      break;
  }
};

document.querySelectorAll('[data-testid]').forEach((button) => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent;
    handleButtonPress(buttonValue); 
  });
});

document.getElementsByName('clean')[0].addEventListener('click', clean); 
document.getElementsByName('negate')[0].addEventListener('click', negate);

document.addEventListener('keydown', handleKeyPress); 
