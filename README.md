# fake-bdd-calculator

## @sc_DisplayScreen:   
 Ha passat el test!  
Comentaris: 
* El valor (0) està hardcoded a dins de la funció setDisplay, quan aquesta hauria de posar el valor rebut per paràmetre.
* No ha passat el lint 

## @sc_NonOpScreenBtn:   
 Ha passat el test!  
Comentaris: 
* Ha resolt el comentari de l'escenari anterior
* Algunes vegades utilitza moltes variables quan podria reduir/comprimir el codi
* A dins de la funcionalitat del botó "clean" podria cridar reset() en comptes de fer setDisplay(0)
* Ha passat el lint 

## @sc_NonOpKeys:
Ha passat el test!  
Comentaris:
* Molt ben separat el codi en funcions (tot i que es podria fer amb "const" en comptes de "function")
* Ha passat el lint

## @sc_NumberCheck
Ha passat el test!  
Comentaris:
* No ha passat el lint