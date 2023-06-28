# fake-bdd-calculator

Scenario Outline: Pressing non-operators screen buttons
Comentarios: El valor 0 tiene la posibilidad de ser una string, todo depende de preferencias


Feedback Secenario Outline:  Pressing non-operators screen buttons

- Line 29/30/34: Variables que no se utilizan por el momento.
- Line 32: Codigo comentado.
- Line 3: El nombre de la variable 'digits' lo cambiaria a 'countDigits' ya su funcionalidad es la de un contador.
- Line 27: El nombre de la constante 'buttons' lo cambiaria a 'numberButtons' ya que hay mas tipos de botones. Si en un futuro los utilizas es conveniente diferenciarlos.
- Line 42: Se puede reducir el codigo a currentNumber += button.textContent.

Feedback Scenario Outline: Pressing non-operators keys

- Line 18: Se utiliza una expresión regular para remplazar la coma por un punto.Realmente no haria falta.
- Line 29:  El nombre del parametro no seria correcto.
- Line 29-38: En esta funcion no haria falta nada o casi nada mas que la linea "operandFloat = operandFloat * -1" y pasar este por el display. Se convierte el valor a String para despues convertirlo a Float y despues de la condicion vuelve a ser un String.
- Line 57: El dom
- Line 93: El if de esta linea no haria falta, utilizando la condicion de la linea 99 seria suficiente. El Escape y Control no haria falta añadirlo al array creado en la linea 86.
  
Feedback Scenario Outline: Writing numbers

Se ha hecho refactorización del codigo y pasa los tests. El codigo esta mas organizado y ha separado las funcionalidades, aunque el dom de los keyEvent considero que podria simplificarse. Mejoraria el nombre de algunas de las funciones y variables.
- Line 17-18: Estas dos lineas se puede reducir a una sola.
- 
