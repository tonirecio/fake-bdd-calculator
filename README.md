# fake-bdd-calculator

Scenario Outline: Pressing non-operators screen buttons
Comentarios: El valor 0 tiene la posibilidad de ser una string, todo depende de preferencias


Feedback Secenario Outline:  Pressing non-operators screen buttons

- Line 29/30/34: Variables que no se utilizan por el momento.
- Line 32: Codigo comentado.
- Line 3: El nombre de la variable 'digits' lo cambiaria a 'countDigits' ya su funcionalidad es la de un contador.
- Line 27: El nombre de la constante 'buttons' lo cambiaria a 'numberButtons' ya que hay mas tipos de botones. Si en un futuro los utilizas es conveniente diferenciarlos.
- Line 42: Se puede reducir el codigo a currentNumber += button.textContent.

