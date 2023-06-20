# fake-bdd-calculator

## Scenario : Default display screen
* All OK

## Scenario Outline: Pressing non-operators screen buttons
* All numbers buttons could be stored in an array plus a simple for loop iteration.
* Negate and Clean buttons/keys code is repeated, extract to method.
* Coma management is too complex and hard to understand. Possible fix: treat the display value as a float and replace the dot to a coma when displayed instead of modifying a string with numbers. 
* Use the setDisplay to display items instead of repeating the setDisplay code to display items.