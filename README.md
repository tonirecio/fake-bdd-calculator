# fake-bdd-calculator

Feedback Antonio Gordillo:
______________________________________
//Pressing non-operators screen buttons

En setDisplay() estas recogiendo el valor del innerHTML para que sea tu "currentValue". Deberiamos trabajar en números y siempre desde nuestro codigo de forma interna,
el display solo debería ser un "output" que el usuario ve. 

Trabajar como haremos uso de las comas directamente desde la funcion que gestiona los botones no es la forma mas idónea. Te recomiendo una funcion "addComa()" donde soluciones todos los problemas que añadir una coma te puede dar. 

Niegas los numeros desde la funcion de botones y lo tienes que convertir a float. Rellenar cada seccion de cada boton con todas las funciones que van a derivar de este va a complicar el codigo. Te recomiendo una función propia para negar que reciba un parametro que sea un numero real.

El 0 esta mal gestionado. Como escriberemos el numero 10, si al ser 0 se resetea todo? Otra vez estas concatenando directamente desde el boton y se va a complicar.

Es buena idea la funcion de Handle buttons, pero deberia hacer funcion de puerto por el cual se deriva cada funcion especifica y no hacer todo ahí mismo.

______________________________________
//Pressing non-operators keys 

Muy bien que en este commit has añadido la funcion Negate. Facilitara mucho todo. 
Igualmente la funcion clean, que podras utilitzar en mas ocasiones.

______________________________________

//Writing numbers 

Mismo problemas de los botones pero ahora con teclas. Te recomiendo lo mismo. Muy bien que handlePressKeys sea otra funcion, pero tiene las mismas debilidades que la otra.

______________________________________

//Writing numbers of more than 10 digit

const addNumber = (number) => {
  if (addingComma) {
    currentNumber = parseFloat(currentNumber.toString() + '.' + number.toString())
    addingComma = false
    setDisplay()
  } else {
    currentNumber = parseFloat(currentNumber.toString() + number.toString())
    setDisplay()
  }
}

Si los dos casos acaban en setDisplay() solo es necesario ponerlo una vez al final.

______________________________________

//Before clicking the equal button 

  return number.toString().replace(/[^0-9]/g, '').length  Es dificil de entender. No estoy seguro de si es la manera mas facil.
  
  const clean = () => {
  currentNumber = 0
  operator = ''
  hasComma = false
  previousNumber = 0
  setDisplay()
}

Pon previous y current juntos para limpiarlos ( cuestíon de estetica visual)


const negate = () => {
  currentNumber = -currentNumber
  setDisplay()
}

Mejor multiplicar por -1, no estoy seguro de que esto vaya a funcionar siempre.


let hasComma = false

Esta variable puede ser confusa, yo la llamaria "addingComma"

______________________________________


