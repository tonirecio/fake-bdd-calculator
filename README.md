# fake-bdd-calculator

Scenario: The display show the value: "0" 
Comentario: El valor 0 tiene la posiblidad de ser un string.  

Scenario Outline: Pressing non-operator screen buttons.
Comentarios: 
-Linea 5/8: La variable currentValue es aconsejable inciarla con el valor 0 y no un '', pese a que no afecta a ningun caso contemplado.
-linea 7/23/26: Funciones de más, no contempladas en ningun caso
-linea 41: Codigo comentado que tendrá que borrarse una vez no se le tenga uso
-Es preferible tener las constante 'negateButton' y el EventListener de 'Negate' junto a las otras contatntes y EventListeners

Scenario Outline Pressing non-operator keys.
Comentarios:
-Simple y entendible inciación de botones
-Linea 73: El nombre de la función podria ser más descriptivo, ya que no solo une numeros
-Linea 85: Pese a no estar contemplado, el signo de comparación no tendria que contener el "=" porque si no esta permitiendo un onceavo digito
-Linea 87: Si ya se ha hecho uso de este console.log, se tendria que quitar
-Linea 96: La window.alert deberia ser mas descriptva del fallo/error
-Linea 129: Se tendria que separar el caso de las teclas numericas de las otras para poder seguir trabajando en numeros y no cambiar nuestra variable de operador "currentValue" a String
-En esta version de codigo no es posible incluir numeros decimales, debido a que no hay una función que añada numeros decimales a el "currentValue"

Scenario Outline: Writing numbers + Writing numbers more than 10 digits
Comentarios:
-La variable CurrentValueToString sería mejor iniciarla como string como el nombre da a entender
-Linea 83/86/114/130: El console.log() no tendría que estar ahí
-Linea 116/117: El else llega a ser innecesario porque ya se comprueb acon anteriroidad la variable "isDecimal"
-Linea 145...: Pese a no estar contemplado, seria bueno controlar los digitos que entran por teclado (OPCIONAL) 
