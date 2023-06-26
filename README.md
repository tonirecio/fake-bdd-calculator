# fake-bdd-calculator
# Scenario: Default display screen
    Esta todo correcto pero yo usaria el valor por parametro "value" para que el parametro tenga mas sentido.

# Scenario Outline: Pressing non-operators screen buttons
    Cuando se pone una ',' solo se llega a 9 digitos y cuando se niega un numero no deja seguir escribiendo otro, quitando eso todo parece correcto.

# Scenario Outline: Pressing non-operators keys
    Todo funciona correctamente pero la sintaxis empleada es complicada de entender y esta escrito de forma mas díficil de lo que en realdiad es (no hacia falta un diccionario).

# Scenario Outline: Writing numbers 
    Pasa el test correctamente y todo parece funcionar bien, la sintaxis de alguna funcion es complicada de entender pero todo funciona correctamente segun los tests

# Scenario Outline: Writing numbers of more than 10 digits
    Ha pasado el test correctamente, es una solucion interesante la de sustituir momentaneamente la coma con un espacio vacio para controlar los digitos maximos

# Scenario Outline: Performing two number operations
    Todo parece funcionar perfectamente, despues dle refactor del codigo es mas claro todo, hay muchos parsers, yo podnria dos variables, una que sea una string y otra que sea un number y de esta forma te ahorras muchos parsers, hay un par de expresiones regulares y el 'diccionario' que has hecho para las teclas sigue pareciendome mas complejo de lo que en realidad es :p

# Scenario Outline: Performing two number operations with a result number with more than 10 nondecimal digits
    Parece que todo funcione, los test no dan errores y has manejado el error de una forma muy sencilla. Hay alguna que ptra expresion regular que no entiendo pero por lo demas todo correcto