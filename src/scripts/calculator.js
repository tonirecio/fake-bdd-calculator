////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////   Aqui voy a poner todas las variables globales de la calculadora   //////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const MAX_DIGITS_IN_DISPLAY = 10 // El numero de digitos en numero que podemos llegar a tener en el display de la calculadora
const DIGITO_DE_LA_COMA = ',';
const display = document.querySelector('div[name="display"] span') // El div del display de la calculadora para poder modificarla
var numeroGuardadoEnMemoria = 0 //El numero que se queda en memoria para poder hacer calculos


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////        Aqui voy a poner todas las funciones de la caluladora        //////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//Esta funcion hace que el valor que hay por el display si es negativo pase a ser positivo y viceversa

const invertNumberDisplay = () => {
  
  if (isOnDisplayZero() == false && isOnDisplayZeroWithDot() == false) {
    var numeroDelDisplay = getDisplay();

    if (isANegativeNumberDisplay()) numeroDelDisplay = numeroDelDisplay.slice(1);
    else numeroDelDisplay = '-' + numeroDelDisplay;

    setDisplay(numeroDelDisplay);
  }

}

//Esta funcion cambia el valor que muestra la calculadora por pantalla a 0

const reset = () => {
  setDisplay(0)
  numeroGuardadoEnMemoria = 0
}

//Esta funcion añade al display el caracter que se le pasa por parametros

const addToTheDisplay = (value) => {

  if (!isTheMaxLenght()) {
    var actualDisplay = getDisplay()

    if (isOnDisplayZero()){

      if (value == DIGITO_DE_LA_COMA)setDisplay('0' + DIGITO_DE_LA_COMA)
      else setDisplay(value);

    }
    else {

      if (value == DIGITO_DE_LA_COMA){

        if (isADotOnDisplay() == false){

          actualDisplay += value
          setDisplay(actualDisplay)

        }

      }
      else{

        actualDisplay += value
        setDisplay(actualDisplay)

      }

    }

  }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////             Aqui voy a poner los inputs del usuario                 //////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//teclas en espacifico

document.addEventListener('keydown', () => {
  if (event.key === "Escape" || event.keyCode === 27) reset()
  else if (event.ctrlKey) invertNumberDisplay()
  else if (event.key === "0") addToTheDisplay(0)
  else if (event.key === "1") addToTheDisplay(1)
  else if (event.key === "2") addToTheDisplay(2)
  else if (event.key === "3") addToTheDisplay(3)
  else if (event.key === "4") addToTheDisplay(4)
  else if (event.key === "5") addToTheDisplay(5)
  else if (event.key === "6") addToTheDisplay(6)
  else if (event.key === "7") addToTheDisplay(7)
  else if (event.key === "8") addToTheDisplay(8)
  else if (event.key === "9") addToTheDisplay(9)
  else if (event.key === DIGITO_DE_LA_COMA) addToTheDisplay(DIGITO_DE_LA_COMA)
})

//botones

document.getElementsByName('multiply')[0].addEventListener('click', () => {
  sayHello()
})
document.getElementsByName('point')[0].addEventListener('click', () => {
  addToTheDisplay(DIGITO_DE_LA_COMA)
})
document.getElementsByName('negate')[0].addEventListener('click', () => {
  invertNumberDisplay();
})
document.getElementsByName('clean')[0].addEventListener('click', () => {
  reset();
})
document.getElementsByName('zero')[0].addEventListener('click', () => {
  addToTheDisplay(0)
})
document.getElementsByName('one')[0].addEventListener('click', () => {
  addToTheDisplay(1)
})
document.getElementsByName('two')[0].addEventListener('click', () => {
  addToTheDisplay(2)
})
document.getElementsByName('three')[0].addEventListener('click', () => {
  addToTheDisplay(3)
})
document.getElementsByName('four')[0].addEventListener('click', () => {
  addToTheDisplay(4)
})
document.getElementsByName('five')[0].addEventListener('click', () => {
  addToTheDisplay(5)
})
document.getElementsByName('six')[0].addEventListener('click', () => {
  addToTheDisplay(6)
})
document.getElementsByName('seven')[0].addEventListener('click', () => {
  addToTheDisplay(7)
})
document.getElementsByName('eight')[0].addEventListener('click', () => {
  addToTheDisplay(8)
})
document.getElementsByName('nine')[0].addEventListener('click', () => {
  addToTheDisplay(9)
})
reset()

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////          Aqui voy a poner funciones de validacion de escenarios     //////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Esta funcion te devuelve false si aun puedes seguir añadiendo digitos teniendo en cuenta el valor de MAX_DIGITS_IN_DISPLAY

const isTheMaxLenght = () => {

  var textoDelDisplay = display.innerHTML
  var longuitudTotal = textoDelDisplay.length

  if (textoDelDisplay.includes(",")) longuitudTotal -= 1
  if (longuitudTotal >= MAX_DIGITS_IN_DISPLAY) return true
  else return false

}

//Esta funcion te devluevle true si el texto que hay en el display es un 0

const isOnDisplayZero = () => {

  var textoDelDisplay = display.innerHTML

  if (textoDelDisplay == 0) return true
  else return false

}

//Esta funcion te devluevle true si en el display ya hemos colocado una coma

const isADotOnDisplay = () => {

  var textoDelDisplay = display.innerHTML

  if (textoDelDisplay.includes(',')) return true
  else return false

}

//Esta funcion te devluevle true si en el display el numero es negativo

const isANegativeNumberDisplay = () => {

  var textoDelDisplay = display.innerHTML

  if (textoDelDisplay.includes('-')) return true
  else return false

}

//Esta funcion te devluevle true si el texto que hay en el display es un 0 con ','

const isOnDisplayZeroWithDot = () => {

  var textoDelDisplay = display.innerHTML

  if (textoDelDisplay == '0' + DIGITO_DE_LA_COMA ) return true
  else return false

}