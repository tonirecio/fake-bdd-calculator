# fake-bdd-calculator

## FEEDBACK (Jordi Marmi)

*Scenario: Default display screen* : Ben fet, pero en la funció "setDisplay()" podríes utilitzar la variable que es pasa per paràmetre, ja que en la funció de reset s'executa la funció "setDisplay(0)" i així pots utilitzar la mateixa funció per mostrar altres valors que no sigui només el numero 0.

*Scenario Outline: Pressing non-operators screen buttons* : Molt be, tot i que penso que les accions que fas dins la funció setDisplay, per exemple: setDisplay(display.innerHTML.concat(value)), penso que podríes crear una variable que obtingués aquests valors.

*Scenario Outline: Pressing non-operators keys* : Molt be. L'únic que veig, és que en la nova funció tens dobles cometes al comprovar si la tecla pitjada és ',' i que al final d'aquesta has deixat uns enters. Aixó ho he descobert al utilitzar la comanda yarn lint

*Scenario Outline: Writing numbers* : Molt be. Ara he vist que tens dos comps un event listener pel mateix botó de negate.