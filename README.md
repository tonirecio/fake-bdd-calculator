# fake-bdd-calculator

## @default_display 
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Sense errors
- [X] 🟩 **Sintaxis:** Correcta, utilitza les variables correctament.

## @press_non_operators
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Sense errors
- [X] 🟧 **Sintaxis:** Personalment, hagués evitat que tots els botons tinguessin el mateix event. Per exemple, que el "1" només tingues que posar 1 seguint les normes de la calculadora, no que tingues que comprobar el valor del botó a cada click. Evitaria també els switch.

## @press_non_operators_keys
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Sense errors
- [X] 🟩 **Sintaxis:** Correcta implementació del event de Keys, hagués possiblement també posat el "." per si acás, pero esta tot correcte.

## @writing_numbers
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Sense errors
- [X] 🟩 **Sintaxis:** Implementació correcta i solucionat el problema del negar amb números decimals.

## @writing_long_numbers
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Sense errors
- [X] 🔼 **Sintaxis:** Millor restructurat comparat amb els commits anteriors evitant fer "navalla suïssa" en els events dels buttons. Noves funcions ben implementades.

## @simple_operations
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Sense errors
- [X] 🟧 **Sintaxis:** Bona sintaxi pero a vegades acaba concatenant diferents funcions per a una variable (ex: result.toString().replace().replace() )

## @before_equal
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Sense errors
- [X] 🔼 **Sintaxis:** Codi refactoritzat i millorat la implementació del display (separant strings de integers). Escenari plantejat ben fet.

## @big_result
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Sense errors
- [X] 🟩 **Sintaxis:** Implementació del escenari d'errors ben fet.

## @clicking_clear
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Sense errors
- [X] 🟩 **Sintaxis:** Mateix codi que l'anteior commit, ben implementat amb futureproofing.

## @pressing_escape
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Sense errors
- [X] 🟩 **Sintaxis:** Mateix codi que l'anteior commit, ben implementat amb futureproofing.

## @clicking_two_operators
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Sense errors
- [X] 🟩 **Sintaxis:** Bona implementació del escenari sense molts canvis i mantenint la estructura del codi anterior.

## @new_operation
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Sense errors
- [X] 🟩 **Sintaxis:** Renomenclatura de variable amb un nom més especific del que fa, permet que d'aquesta manera es pugui reutilitzar y evitar tenir mes d'una variable amb el mateix valor en el moment de runtime amb noms diferents.

## @previous_result
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Sense errors
- [X] 🟩 **Sintaxis:** Sintaxis correcta i sense modificacions destacables.

## @previous_result_easier
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Error mínim de "Missing EOL"
- [X] 🟩 **Sintaxis:** Sense errors.

## @divide_by_zero
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟧 **Lint Test:** Error mínim de no-multiple-empty-lines
- [X] 🟧 **Sintaxis:** Sense errors, personalment hagués utilitzat la funció de isFinite()

## @operation_without_second_number
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Sense errors
- [X] 🟩 **Sintaxis:** Millorat amb el isFinite

## @operation_without_first_number
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Sense errors
- [X] 🟩 **Sintaxis:** Futureproofed correctament, sense canvis

## @showing_first_number
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Sense errors
- [X] 🟩 **Sintaxis:** Futureproofed correctament, sense canvis

## @equals_wo_operation
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Sense errors
- [X] 🟩 **Sintaxis:** Bona implementacio pero ho faria dins del if de sum/subtract/multiply/divide

## @enable_buttons_after_operator
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Sense errors
- [X] 🟩 **Sintaxis:** Millorada la implementació del escenari anterior, noms una mica llargs per al meu gust (handleButtonEnablingWhenClickingOperator)

## @enable_buttons_after_clean
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Un error en una linea extra
- [X] 🟩 **Sintaxis:** Codi ben implementat, intentaria reutilitzar una mica de codi

## @enable_buttons_after_equal
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Un error en una linea extra
- [X] 🟩 **Sintaxis:** Millorat respecte l'anterior commit

## @disable_buttons
- [X] 🟩 **Scenario Test:** Sense errors
- [X] 🟩 **Lint Test:** Sense errors
- [X] 🟩 **Sintaxis:** Refactoritzat part del codi, programació correcta