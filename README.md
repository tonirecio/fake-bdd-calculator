# fake-bdd-calculator

## FEEDBACK (Jordi Marmi)

*Scenario: Default display screen* : Ben fet, pero en la funció "setDisplay()" podríes utilitzar la variable que es pasa per paràmetre, ja que en la funció de reset s'executa la funció "setDisplay(0)" i així pots utilitzar la mateixa funció per mostrar altres valors que no sigui només el numero 0.

*Scenario Outline: Pressing non-operators screen buttons* : Molt be, tot i que penso que les accions que fas dins la funció setDisplay, per exemple: setDisplay(display.innerHTML.concat(value)), penso que podríes crear una variable que obtingués aquests valors.

*Scenario Outline: Pressing non-operators keys* : Molt be. L'únic que veig, és que en la nova funció tens dobles cometes al comprovar si la tecla pitjada és ',' i que al final d'aquesta has deixat uns enters. Aixó ho he descobert al utilitzar la comanda yarn lint

*Scenario Outline: Writing numbers* : Molt be. Ara he vist que tens dos comps un event listener pel mateix botó de negate.

*Scenario Outline: Writing numbers of more than 10 digits* : Perfecte

*Scenario Outline: Performing two number operations* : Està molt bé, pero el yarn lint m'ha informat d'alguns errors

*Scenario Outline: Before clicking the equal button* : Perfecte

*Scenario Outline: Performing two number operations with a result number with more than 10 nondecimal digits* : Molt bé. Penso que podríes comprovar si es passa del número de dígits avans de fer les operacions

*Scenario: Clicking the C button* : Perfecte

*Scenario: Pressing the escape key* : Perfecte