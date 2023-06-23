# fake-bdd-calculator

## FEEDBACK (Elna Ballesta)

*Scenario: Default display screen*: Bona resolució de l'escenari.

*Scenario Outline: Pressing non-operators screen buttons*: Crec que els listeners dels botons es podrien haver agrupat en una funció genèrica per no haver de fer-ne un per cada botó. D'altra banda, crec que estan molt ben fetes les funcions de addNumber, addPoint i negateNumber perquè fan el codi molt net.

*Scenario Outline: Pressing non-operators keys*: No funcionen les tecles de control i escape perquè els codis no estan bé, caldira canviar 'keypress' per 'keyup'. 

*Scenario Outline: Writing numbers*: Crec que el codi està bé.

*Scenario Outline: Writing numbers of more than 10 digits*: A la funció tenNumbers en comptes de posar un 10 manualment, podries haver utilitzat la variable global MAX_DIGITS_IN_DISPLAY.

*Scenario Outline: Performing two number operations*: Falla la guia d'estil, caldria arreglar els erros que surten amb la comanda yarn lint. El codi està correcte.

*Scenario Outline: Before clicking the equal button*: Ja estan arreglats els erros d'estil. El codi és el mateix que a l'anterior escenari.

*Scenario Outline: Performing two number operations with a result number with more than 10 nondecimal digits*: Correcte.

*Scenario: Clicking the C button*: Correcte. 

*Scenario: Pressing the escape key*: Correcte.

*Scenario Outline: Clicking two different operation buttons*: Correcte.

*Scenario Outline: Doing a new operation*: Correcte.

*Scenario Outline: Using the previous result in a new operation*: Crec que la variable 'ans' podria tenir un nom més explicatiu. 

