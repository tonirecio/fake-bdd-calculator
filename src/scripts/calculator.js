const MAX_DIGITS_IN_DISPLAY = 10;
const display = document.querySelector('div[name="display"] span')
var numeroGuardadoEnMemoria = 0;

//Esta funcion lo que hace es mostrar el display pasando un valor

const setDisplay = (value) => {
  display.innerHTML = value;
}

const getDisplay = () => {
  return display.innerHTML;
}

//Funcion en desuso que muestra por ventana emergente un hello world con JavaScript

const sayHello = () => {
  window.alert('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.' + isOnDisplayZero())
}


//Esta funcion cambia el valor que muestra la calculadora por pantalla a 0

const reset = () => {
  setDisplay(0)
}

const addToTheDisplay = (value) => {

  if (!isTheMaxLenght()) {
    var actualDisplay = getDisplay()

    if (isOnDisplayZero()){

      if (value == ',')setDisplay("0,")
      else setDisplay(value);

    }
    else {

      actualDisplay += value
      setDisplay(actualDisplay)

    }

  }

}

//simbolos

document.getElementsByName('multiply')[0].addEventListener('click', () => {
  sayHello()
})
document.getElementsByName('point')[0].addEventListener('click', () => {
  addToTheDisplay(",");
})

//Numeros

document.getElementsByName('zero')[0].addEventListener('click', () => {
  addToTheDisplay(0);
})

document.getElementsByName('one')[0].addEventListener('click', () => {
  addToTheDisplay(1);
})
document.getElementsByName('two')[0].addEventListener('click', () => {
  addToTheDisplay(2);
})
document.getElementsByName('three')[0].addEventListener('click', () => {
  addToTheDisplay(3);
})
document.getElementsByName('four')[0].addEventListener('click', () => {
  addToTheDisplay(4);
})
document.getElementsByName('five')[0].addEventListener('click', () => {
  addToTheDisplay(5);
})
document.getElementsByName('six')[0].addEventListener('click', () => {
  addToTheDisplay(6);
})
document.getElementsByName('seven')[0].addEventListener('click', () => {
  addToTheDisplay(7);
})
document.getElementsByName('eight')[0].addEventListener('click', () => {
  addToTheDisplay(8);
})
document.getElementsByName('nine')[0].addEventListener('click', () => {
  addToTheDisplay(9);
})
reset()

//Aqui voy a poner funciones de validacion de escenarios

const isTheMaxLenght = () => {

  var textoDelDisplay = display.innerHTML
  var longuitudTotal = textoDelDisplay.length

  if (textoDelDisplay.includes(",")) longuitudTotal -= 1
  if (longuitudTotal >= MAX_DIGITS_IN_DISPLAY) return true
  else return false

}

const isOnDisplayZero = () => {

  var textoDelDisplay = display.innerHTML

  if (textoDelDisplay == 0) return true
  else return false

}

const isADotOnDisplay = () => {

  var textoDelDisplay = display.innerHTML

  if (textoDelDisplay.includes(',')) return true
  else return false

}