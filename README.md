# fake-bdd-calculator

Scenario: The display show the value: "0" 
Comentario: El valor 0 tiene la posiblidad de ser un string.  

Scenario Outline: Pressing non-operator screen buttons.
Comentarios: 
-Linea 5/8: La variable currentValue es aconsejable inciarla con el valor 0 y no un '', pese a que no afecta a ningun caso contemplado.
-linea 7/23/26: Funciones de más, no contempladas en ningun caso
-linea 41: Codigo comentado que tendrá que borrarse una vez no se le tenga uso
-Es preferible tener las constante 'negateButton' y el EventListener de 'Negate' junto a las otras contatntes y EventListeners
