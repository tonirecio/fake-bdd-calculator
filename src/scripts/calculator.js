const MAX_DIGITS_IN_DISPLAY = 10
const DIGITO_COMA = ',';
const display = document.querySelector('div[name="display"] span')

let result = 0;
let firstOperator = null
let isRecentlyPutAOperator = false
let isTheOperationFinished = false
let isNumberMemory = false
let currentValue = ''

let operator = null;

const setDisplay = (value) => {

  var formattedValue = value;

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
  enableButtons()
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
  if (isRecentlyPutAOperator === false) {
      /*if (parseFloat(display.innerHTML) === 0) {
        setDisplay(0);
      } else {*/
        toOperate();
      //}
  } else {
      setDisplay('ERROR')
  }
  enableButtons()

})

document.addEventListener('keydown', (event) => {
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

    let currentValue = '';
    const isSign = value === '-';
    console.log('valor Introducido: ' + value + ', valor en memoria: ' + firstOperator)
    
    if (isTheOperationFinished  || isRecentlyPutAOperator) {
      setDisplay(0)
      isTheOperationFinished = false;
    } else currentValue = display.innerHTML;
      
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
  isRecentlyPutAOperator = false;

  enableButtons()
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

const isComma = () => {

  currentValue = display.innerHTML;
  const comma = ',';

  if (currentValue.includes(comma)) {
    return true
  } else {
    return false
  }

};

const invertNumberDisplay = () => {

  currentValue = display.innerHTML;

  if (currentValue !== '0' && currentValue !== '0,') {
    if (currentValue.startsWith('-')) {
      currentValue = currentValue.slice(1);

    } else {
      currentValue = '-' + currentValue;

    }
    setDisplay(currentValue);

  }
};

const seleccionarOperador = (op) => {

  console.log('Pre-Funcion Memoria: ' + firstOperator)
  if (isRecentlyPutAOperator === false){
    if (firstOperator !== null) {
      
      toOperate();

      if (result !== null) {
        console.log('result en memoria: ' + result)
        firstOperator = result;
      }
    
    }

    operator = op;
    addInDisplayFirstOperator()
    
  }
  else operator = op

  isRecentlyPutAOperator = true
  isNumberMemory = true
  console.log('Post-Funcion Memoria: ' + firstOperator)
}

const toOperate = () => {

  console.log('Display: ' + display.innerHTML)
  
  var secondOperator = display.innerHTML;
  secondOperator = secondOperator.replace(DIGITO_COMA, '.')
  secondOperator = parseFloat(secondOperator)

  if (firstOperator === 9999999999 || secondOperator === 9999999999 || secondOperator === 0) {
    isAnError()
    
  } else {
    if (operator === '+') {
      result = firstOperator + secondOperator

    } else if (operator === '-') {
      result = firstOperator - secondOperator

    } else if (operator === '*') {
      result = firstOperator * secondOperator

    } else if (operator === '/') {
      result = firstOperator / secondOperator

    } else {
      result = secondOperator
    }

    if (secondOperator === 0 && operator === '/' || secondOperator === 0) {
      isAnError()
    }

    var numTotalBeforeComma = numberBeforeComma(result);

    if (result < 0) {
      result = roundToDecimalPlaces(result, MAX_DIGITS_IN_DISPLAY + 2 - numTotalBeforeComma);

    } else {
      result = roundToDecimalPlaces(result, MAX_DIGITS_IN_DISPLAY - numTotalBeforeComma);

    }
    console.log('Memoria: ' + firstOperator + " + Display: " + secondOperator + " = " + result)
    setDisplay(result);

    firstOperator = result;
    isTheOperationFinished = true;
    operator = null;

  }
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

const isAnError = () => {

setDisplay('ERROR');

}

const addInDisplayFirstOperator = () => {

  firstOperator = display.innerHTML;
  firstOperator = firstOperator.replace(DIGITO_COMA, '.')
  firstOperator = parseFloat(firstOperator)

}

const enableButtons = () => {

  if (display.innerHTML == 0 ) {
    document.getElementsByName('zero')[0].disabled = true
    document.getElementsByName('negate')[0].disabled = true

  } else if (isMaxLength()) {
    document.getElementsByName('zero')[0].disabled = true
    document.getElementsByName('one')[0].disabled = true
    document.getElementsByName('two')[0].disabled = true
    document.getElementsByName('three')[0].disabled = true
    document.getElementsByName('four')[0].disabled = true
    document.getElementsByName('five')[0].disabled = true
    document.getElementsByName('six')[0].disabled = true
    document.getElementsByName('seven')[0].disabled = true
    document.getElementsByName('eight')[0].disabled = true
    document.getElementsByName('nine')[0].disabled = true
    document.getElementsByName('point')[0].disabled = true

  } else if (isComma()) {
    document.getElementsByName('point')[0].disabled = true

  } else if (display.innerHTML === 'ERROR') {
    document.getElementsByName('zero')[0].disabled = true
    document.getElementsByName('one')[0].disabled = true
    document.getElementsByName('two')[0].disabled = true
    document.getElementsByName('three')[0].disabled = true
    document.getElementsByName('four')[0].disabled = true
    document.getElementsByName('five')[0].disabled = true
    document.getElementsByName('six')[0].disabled = true
    document.getElementsByName('seven')[0].disabled = true
    document.getElementsByName('eight')[0].disabled = true
    document.getElementsByName('nine')[0].disabled = true

    document.getElementsByName('divide')[0].disabled = true
    document.getElementsByName('multiply')[0].disabled = true
    document.getElementsByName('subtract')[0].disabled = true
    document.getElementsByName('sum')[0].disabled = true
    document.getElementsByName('negate')[0].disabled = true
    document.getElementsByName('point')[0].disabled = true
    document.getElementsByName('clean')[0].disabled = false
    document.getElementsByName('equal')[0].disabled = true

  } else {
    document.getElementsByName('zero')[0].disabled = false
    document.getElementsByName('one')[0].disabled = false
    document.getElementsByName('two')[0].disabled = false
    document.getElementsByName('three')[0].disabled = false
    document.getElementsByName('four')[0].disabled = false
    document.getElementsByName('five')[0].disabled = false
    document.getElementsByName('six')[0].disabled = false
    document.getElementsByName('seven')[0].disabled = false
    document.getElementsByName('eight')[0].disabled = false
    document.getElementsByName('nine')[0].disabled = false

    document.getElementsByName('divide')[0].disabled = false
    document.getElementsByName('multiply')[0].disabled = false
    document.getElementsByName('subtract')[0].disabled = false
    document.getElementsByName('sum')[0].disabled = false
    document.getElementsByName('negate')[0].disabled = false
    document.getElementsByName('point')[0].disabled = false
  }

}

reset()