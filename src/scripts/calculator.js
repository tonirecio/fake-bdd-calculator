////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////   Aqui voy a poner todas las variables globales de la calculadora   //////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const MAX_DIGITS_IN_DISPLAY = 10 // El numero de digitos en numero que podemos llegar a tener en el display de la calculadora
const DIGITO_DE_LA_COMA = ',' 
const display = document.querySelector('div[name="display"] span') // El div del display de la calculadora para poder modificarla
var numeroGuardadoEnMemoria = 0 //El numero que se queda en memoria para poder hacer calculos
var operacionGuardada = '' 


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Aqui voy a poner todas las funciones de la caluladora tocando Inputs  ////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Esta funcion lo que hace es mostrar el display pasando un valor

const setDisplay = (value) => {
  display.innerHTML = value
}

const getDisplay = () => {
  return display.innerHTML
}

const getDisplayNumber = () => {

  var numero = getDisplay() 
  numero = numero.replace(/,/g, '.')
  numero = parseFloat(numero)
  return numero

}

//Funcion en desuso que muestra por ventana emergente un hello world con JavaScript

const sayHello = () => {
  window.alert('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '. Number saved = ' + numeroGuardadoEnMemoria)
}

//Esta funcion hace que el valor que hay por el display si es negativo pase a ser positivo y viceversa

const invertNumberDisplay = () => {
  
  if (isOnDisplayZero() == false && isOnDisplayZeroWithDot() == false) {
    var numeroDelDisplay = getDisplay() 

    if (isANegativeNumberDisplay()) numeroDelDisplay = numeroDelDisplay.slice(1) 
    else numeroDelDisplay = '-' + numeroDelDisplay 

    setDisplay(numeroDelDisplay) 
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
      else setDisplay(value) 

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
/////////////////////////             Aqui voy a poner todas las operaciones                  //////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Esta funcion coge dos numeros y lo que hace es conseguir el numero de decimales que tenga mayor longuitud

const calculoNumerosAntesDelDecmial = (value) => {

  var numero = value.toString().split('.')[0]
  return numero.length;

}

//Esta funcion coge dos numeros y lo que hace es conseguir el numero de decimales que tenga mayor longuitud

const calculoNumerosDelDecmial = (value) => {

  var numero = value.toString().split('.')[1]
  return numero.length;

}

//Esta funcion nos permite truncar un numero a partir del decimal pasado por parametros

const truncarNumero = (value, decimal) => {

  console.log(value)
  var multiple = 1

  for (var i = 0; i < decimal; i++) {

    
    multiple *= 10

  }

  var numero = value * multiple
  numero = Math.trunc(numero)
  numero /= multiple

console.log(numero)

  return numero

}

//enseña el resultado de la operacion y cambia el valor de display

const showResults = (value) => {

  var resultado = value.toString();

  if (isADotOnThis(value) == false) {
    
    if (isOnRangeOfNotError(value)) setDisplay(resultado)
    else setDisplay("ERROR") 


  }
  else {

    if(isOnRangeOfNotError(value)) {

      var longuitudDecimal = calculoNumerosDelDecmial(value)
      var longuitudAntesDecimal = calculoNumerosAntesDelDecmial(value)
      
      if (resultado.length > MAX_DIGITS_IN_DISPLAY) {

        if (isANegativeNumber(value)) {

          var loguitudARestarAlDecimal = MAX_DIGITS_IN_DISPLAY + 2 - longuitudDecimal - longuitudAntesDecimal
          longuitudDecimal = longuitudDecimal - loguitudARestarAlDecimal
          value = value.toFixed(longuitudDecimal)

        }
        else{

          var loguitudARestarAlDecimal = MAX_DIGITS_IN_DISPLAY + 1 - longuitudDecimal - longuitudAntesDecimal
          longuitudDecimal = longuitudDecimal - loguitudARestarAlDecimal
          value = value.toFixed(longuitudDecimal)

        }
        value = value.truncarNumero(longuitudDecimal)
      }
      var resultado = value.toString();
      resultado = resultado.replace('.', DIGITO_DE_LA_COMA);
      setDisplay(resultado)

    }
    else setDisplay("ERROR")

  }


}

//Esta funcion guarda a la memoria el numero del display y le hace un reset pero solo del display

const vaciarDisplayCargandoMemoria = () => {

  numeroGuardadoEnMemoria = getDisplayNumber()
  setDisplay(0)

}

//Esta  funcion lo que hace es seleccionar un operador si es que no habia sido seleccionado

const seleccionarOperador = (value) => {
  
  if (operationUnselected()) {
    operacionGuardada = value 
    vaciarDisplayCargandoMemoria()
  }

}
const operar = () => {

  if (operacionGuardada == '+') ejecutarSuma()
  else if (operacionGuardada == '-') ejecutarResta()
  else if (operacionGuardada == '*') ejecutarMultiplicacion()
  else if (operacionGuardada == '/') ejecutarDivision()
  operacionGuardada = '' 

}

//Simplemente ejecuta una suma

const ejecutarSuma = () => {

  var total = numeroGuardadoEnMemoria + getDisplayNumber()
  showResults(total)

}

//Simplemente ejecuta una resta

const ejecutarResta = () => {

  var total = numeroGuardadoEnMemoria - getDisplayNumber()
  showResults(total)

}

//Ejecuta una multiplicacion

const ejecutarMultiplicacion = () => {

  var total = numeroGuardadoEnMemoria * getDisplayNumber()
  showResults(total)

}

//Ejecuta una division

const ejecutarDivision = () => {

  var total = numeroGuardadoEnMemoria / getDisplayNumber()
  showResults(total)

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
  else if (event.key === "+") seleccionarOperador('+')
  else if (event.key === "-") seleccionarOperador('-')
  else if (event.key === "*") seleccionarOperador('*')
  else if (event.key === "/") seleccionarOperador('/')
  else if (event.key === DIGITO_DE_LA_COMA) addToTheDisplay(DIGITO_DE_LA_COMA)
})

//botones

document.getElementsByName('point')[0].addEventListener('click', () => {
  addToTheDisplay(DIGITO_DE_LA_COMA)
})
document.getElementsByName('negate')[0].addEventListener('click', () => {
  invertNumberDisplay() 
})
document.getElementsByName('clean')[0].addEventListener('click', () => {
  reset() 
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
  operar()
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

  if (textoDelDisplay.includes(DIGITO_DE_LA_COMA)) return true
  else return false

}

const isADotOnThis = (value) => {

  var textoDelDisplay = value.toString() 

  if (textoDelDisplay.includes('.')) return true
  else return false

}

//Esta funcion te devluevle true si en el display el numero es negativo

const isANegativeNumberDisplay = () => {

  var textoDelDisplay = display.innerHTML

  if (textoDelDisplay.includes('-')) return true
  else return false

}

//Esta funcion te devluevle true si en el display el numero es negativo

const isANegativeNumber = (value) => {

  var numeroPasadoPorParametros = value 

  if (numeroPasadoPorParametros < 0) return true
  else return false

}

//Esta funcion te devluevle true si el texto que hay en el display es un 0 con ','

const isOnDisplayZeroWithDot = () => {

  var textoDelDisplay = display.innerHTML

  if (textoDelDisplay == '0' + DIGITO_DE_LA_COMA ) return true
  else return false

}

//Esta funcion mira si no se ha seleccionado ninguna operacion antes de dar al '='

const operationUnselected = () => {

  if (operacionGuardada == '') return true
  else return false

}

//Mira que el numero este dentro de un rango de limites, en el caso de que no este devuelve false

const isOnRangeOfNotError = (value) => {

  var numeroLimite = '' 

  for (var i = 0 ; i < MAX_DIGITS_IN_DISPLAY ; i++) numeroLimite = numeroLimite + 9

  numeroLimite = parseInt(numeroLimite) 

  if (numeroLimite >= value && value >= -numeroLimite) return true 
  else return false 

}