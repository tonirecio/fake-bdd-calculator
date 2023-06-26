# fake-bdd-calculator

# Scenario: Default display screen
Ha pasado correctamente el parámetro de la función para que en el Display aparezca 0

# Scenario Outline: Pressing non-operators screen buttons
Yo los numeros los hubiera metido directamente en un array, para no tener que generar todo el rato la estructura de:
document.getElementsByName('seven')[0].addEventListener('click', () => {
  setDisplay("7")
})

# Scenario Outline: Pressing non-operators screen buttons(keys)
Me parece que todo esta correcto a simple vista, lo has optimizado mucho más que yo.

# Scenario Outline: Writing numbers
Haces correcto el ir teniendo en cuenta las comas y los puntos, y usando el replace, haces el juego para que se muestre en el display lo que te interesa, también esta muy bien la forma en la que haces el que aparezca la coma.

# Scenario Outline: Performing two number operations
Una opcion también muy correcta el jugar con el tamaño máximo de digitos, dependiendo de si hay coma o no, en general bien empleado el tamaño de los digitos.

# Todos los demas escenarios

Creo que el numero 10 que pones en la condición es el valor de la constante MAX_DIGITS_IN_DISPLAY, pero es un detallito.
<!-- const setInputValue = (input) => {
  if(valueDisplay.replace(",", "").length + 1 >= 10 && input != '.'){
    disableNumericAndPointButtons()
  } else {
    changeStateAllButtons(false)
    if(pointDisabled === true){
      changeButtonState(true, 'point')
    }
  } -->
lo mismo aqui en el lengthOfResult:
<!-- const controlDecimalsResult = () => {
  if(valueDisplay.includes(".")){
    valueDisplay.replace(".", "")
    lengthOfResult = valueDisplay.length 
    if(lengthOfResult > 10){
        lengthOfResult = 10
    }      
    result = result.toPrecision(lengthOfResult) * 1
    return
  } else if(valueDisplay.length > MAX_DIGITS_IN_DISPLAY){
    showMessageError()
    return
  }
} -->

No he encontrado mucha cosa mas, ya que desconozco mucha de la sintaxis de js