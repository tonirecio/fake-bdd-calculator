# fake-bdd-calculator

## Scenario : Default display screen
* All OK

## Scenario Outline: Pressing non-operators screen buttons
* All numbers buttons could be stored in an array plus a simple for loop iteration.
* Negate and Clean buttons/keys code is repeated, extract to method.
* Coma management is too complex and hard to understand. Possible fix: treat the display value as a float and replace the dot to a coma when displayed instead of modifying a string with numbers. 
* Use the setDisplay to display items instead of repeating the setDisplay code to display items.

## Scenario Outline: Pressing non-operators keys
* Keys input could be simplified by simply using the key value instead of linking it to a switch structure.
* In a switch structure, the default option must contain something, the code works but is not well coded.
* In the switch structure, there's code repetition. Possible fix: use a variable to store the key value and at then only print once.