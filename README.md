# fake-bdd-calculator

## Scenario Default display screen

- Está todo correcto

## Scenario Pressing non-operators screen buttons

- Quizas se podría poner un nombre más pertinente a la funcion de appendSymbol, aunque no es un problema importante ni nada que vaya afectar en el futuro pero si que quizas se entendería mejor de está manera lo que hace.
- Aparte de lo anterior diría que está bastante bien el resto.

## Scenario Pressing non-operator keys

- El unico aspecto que creo que sería mejorable es primero los numeros podrían ponerse sin comillas ya que no se necesita que sean cadenas y que se podría haber optimizado más el codigo en la parte de definir las teclas que responden a los numeros si se hubiese usado una expresión regular, algo así: `\[0-9]\`.

## Scenario Writing numbers

- Lo veo todo correcto.

## Scenario Writing numbers of more than 10 digits

- Muy clean esta parte también lo unico que le veo es que en la funcion appendNumber quizas el segundo if `if (display.innerHTML == '0')` podría estar anidado en el primer if `if (digitCount >= MAX_DIGITS_IN_DISPLAY)`, poco más.
