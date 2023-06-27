const MAX_DIGITS_IN_DISPLAY = 10

const DIGITO_COMA = ',';

const display = document.querySelector('div[name="display"] span')

let firstOperator = null;

let operator = null;

const setDisplay = (value) => {

  var formattedValue = value;
  console.log(formattedValue)

  if (formattedValue.length > MAX_DIGITS_IN_DISPLAY + 1) {
    formattedValue = roundToDecimalPlaces(value, MAX_DIGITS_IN_DISPLAY - 1);

  }
  formattedValue = formattedValue.toString()  
  formattedValue = formattedValue.replace('.', DIGITO_COMA);
  display.innerHTML = formattedValue;
}

const sayHello = () => {
  window.alert('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.')
}

const reset = () => {
  setDisplay(0)
}

document.getElementsByName('point')[0].addEventListener('click', () => {
  addToDisplay(DIGITO_COMA)
})
document.getElementsByName('negate')[0].addEventListener('click', () => {
  invertNumberDisplay()
})
document.getElementsByName('clean')[0].addEventListener('click', () => {
  reset()
})
document.getElementsByName('zero')[0].addEventListener('click', () => {
  addToDisplay(0)
})
document.getElementsByName('one')[0].addEventListener('click', () => {
  addToDisplay(1)
})
document.getElementsByName('two')[0].addEventListener('click', () => {
  addToDisplay(2)
})
document.getElementsByName('three')[0].addEventListener('click', () => {
  addToDisplay(3)
})
document.getElementsByName('four')[0].addEventListener('click', () => {
  addToDisplay(4)
})
document.getElementsByName('five')[0].addEventListener('click', () => {
  addToDisplay(5)
})
document.getElementsByName('six')[0].addEventListener('click', () => {
  addToDisplay(6)
})
document.getElementsByName('seven')[0].addEventListener('click', () => {
  addToDisplay(7)
})
document.getElementsByName('eight')[0].addEventListener('click', () => {
  addToDisplay(8)
})
document.getElementsByName('nine')[0].addEventListener('click', () => {
  addToDisplay(9)
})
document.getElementsByName('divide')[0].addEventListener('click', () => {
  seleccionarOperador('/')
})
document.getElementsByName('multiply')[0].addEventListener('click', () => {
  seleccionarOperador('*')
})
document.getElementsByName('subtract')[0].addEventListener('click', () => {
  seleccionarOperador('-')
})
document.getElementsByName('sum')[0].addEventListener('click', () => {
  seleccionarOperador('+')
})
document.getElementsByName('equal')[0].addEventListener('click', () => {
  toOperate()
})

document.addEventListener('keydown', () => {
  if (event.key === "Escape" || event.keyCode === 27) reset()
  else if (event.ctrlKey) invertNumberDisplay()
  else if (event.key === "0") addToDisplay(0)
  else if (event.key === "1") addToDisplay(1)
  else if (event.key === "2") addToDisplay(2)
  else if (event.key === "3") addToDisplay(3)
  else if (event.key === "4") addToDisplay(4)
  else if (event.key === "5") addToDisplay(5)
  else if (event.key === "6") addToDisplay(6)
  else if (event.key === "7") addToDisplay(7)
  else if (event.key === "8") addToDisplay(8)
  else if (event.key === "9") addToDisplay(9)
  else if (event.key === "+") seleccionarOperador('+')
  else if (event.key === "-" && display.innerHTML == 0) seleccionarOperador('-')
  else if (event.key === "-") seleccionarOperador('-')
  else if (event.key === "*") seleccionarOperador('*')
  else if (event.key === "/") seleccionarOperador('/')
  else if (event.key === DIGITO_COMA) addToDisplay(DIGITO_COMA)

})

const addToDisplay = (value) => {

    let currentValue = display.innerHTML;

    const isSign = value === '-';
   
    if (!isSign && !isMaxLength()) {

        if (currentValue === '0') {
            if (value === DIGITO_COMA) {
                currentValue += value;
            } else {
                currentValue = value;
            }

        } else {
            if (value === DIGITO_COMA ) {
                if (!currentValue.includes(DIGITO_COMA)){
                  currentValue += value;
                }
            } else {
              currentValue += value;
            }

        }

    }
    setDisplay(currentValue);
}

const isMaxLength = () => {

    let currentValue = display.innerHTML;

    const hasComma = currentValue.includes(',')
    const hasMinus = currentValue.includes('-')
    var valueLength = currentValue.length;

    if (hasMinus) {
      valueLength -= 1

    }
    if (hasComma) {
      valueLength -= 1

    }

    if (MAX_DIGITS_IN_DISPLAY <= valueLength) return true
    else return false
}

const invertNumberDisplay = () => {

  let currentValue = display.innerHTML;

  if (currentValue !== '0' && currentValue !== '0,'  ) {
    if (currentValue.startsWith('-')) {
      currentValue = currentValue.slice(1);

    } else {
      currentValue = '-' + currentValue;

    }
    setDisplay(currentValue);

  }
};

const seleccionarOperador = (op) => {

  operator = op;

  firstOperator = display.innerHTML;
  firstOperator = firstOperator.replace(DIGITO_COMA, '.')
  firstOperator = parseFloat(firstOperator)

  reset();

}


const toOperate = () => {

  console.log(display.innerHTML)
  var secondOperator = display.innerHTML;
  secondOperator = secondOperator.replace(DIGITO_COMA, '.')
  secondOperator = parseFloat(secondOperator)

  let result = 0;

  if (operator === '+') {
    result = firstOperator + secondOperator;

  } else if (operator === '-') {
    result = firstOperator - secondOperator;

  } else if (operator === '*') {
    result = firstOperator * secondOperator;

  } else if (operator === '/') {
    result = firstOperator / secondOperator;

  }
  var numTotalBeforeComma = numberBeforeComma(result);
  if (result < 0) {
    result = roundToDecimalPlaces(result, MAX_DIGITS_IN_DISPLAY + 2 - numTotalBeforeComma);
  } else {
    result = roundToDecimalPlaces(result, MAX_DIGITS_IN_DISPLAY - numTotalBeforeComma);
  }
  console.log(firstOperator + " + " + secondOperator + " = " + result)
  setDisplay(result);

  firstOperator = result;

  operator = null;

}

const roundToDecimalPlaces = (value, decimalPlaces) => {

  var multiple = 1;

  for(var numDecimals = 0; numDecimals < decimalPlaces; numDecimals++) {
    multiple *= 10;
  }
  var num = value * multiple;
  num = Math.round(num);
  num = num/multiple
  return num;

};

const numberBeforeComma = (value) => {

  var numTotalBeforeComma = value.toString().split('.')[0]
  return numTotalBeforeComma.length

}

reset()