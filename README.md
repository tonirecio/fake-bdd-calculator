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


## @sc_DigitExceedTest
Ha passat el test!  
Comentaris:
* Ha passat el lint
* Tot correcte, molt bé que no està hardcoded el valor de la coma/punt


## @sc_Operations
Ha passat el test!  
Comentaris:
* Ha passat el lint
* A la part de gestionar events de les operacions, hi ha codi repetit que es podria posar en una mateixa funció, i la part de 'equal' també es podria separar per no omplir més el bloc de codi dels botons


## @sc_BeforeEqual
Ha passat el test!  
Comentaris:
* Ha passat el lint
* Cap canvi visible en el codi, sense comentaris

## @sc_LongNumber
Ha passat el test!  
Comentaris:
* No ha passat el lint
* Codi ben implementat

## @sc_Reset
Ha passat el test!  
Comentaris:
* Ha passat el lint
* Codi ben implementat

## @sc_ResetKey
Ha passat el test!  
Comentaris:
* Ha passat el lint
* Codi ben implementat


## @sc_OverlapOps
Ha passat el test!  
Comentaris:
* No ha passat el lint
* Codi ben implementat

## @sc_NewOp
Ha passat el test!  
Comentaris:
* Ha passat el lint
* Funcionalitat ben implementada amb reutilització de variable booleana del codi anterior

## @sc_ConcatResult
Ha passat el test!  
Comentaris:
* Ha passat el lint
* Codi ben implementat

## @sc_ConcatResultPlus
Ha passat el test!  
Comentaris: 
* No ha passat el lint
* Codi ben implementat
* Respecte el codi anterior, ha refactoritzat cap a millor, amb codi més clar i més organitzat, i modificant el display a partir d'una variable i no al revés. 👏

## @sc_DivisionWith0
Ha passat el test!  
Comentaris:
* No ha passat el lint
* Codi ben refactoritzat, es nota que s'han canviat els noms de les funcions i variables concretant-les més. 
* Ben realitzat el canvi de variable amb la que es treballa, de tipus String a Number
* Sí que es podria canviar encara el tema de treure els trailing 0 del número

## @sc_OpMissingSecondValue
Ha passat el test!  
Comentaris:
* Ha passat el lint
* Codi ben implementat

## @sc_OpMissingFirstValue 
Ha passat el test!  
Comentaris:
* Ha passat el lint
* Codi ben implementat, ha canviat la forma de treure els trailing 0 👍


## @sc_KeepFirstNumber
Ha passat el test!  
Comentaris:
* Ha passat el lint
* Codi ben implementat

## @sc_EqualWithoutOp
Ha passat el test!  
Comentaris:
* No ha passat el lint
* Codi ben implementat

## @sc_ReenableButtonsNoError
Ha passat el test!  
Comentaris:
* Ha passat el lint
* Codi ben implementat

## @c_ReenableButtonsNoErrorPressC
Ha passat el test!  
Comentaris: 
* Ha passat el lint
* Codi ben implementat

## @sc_ReenableButtonsNoErrorPressEqual
Ha passat el test!  
Comentaris:
* Ha passat el lint
* Codi ben implementat

## @sc_DisableButtons
Ha passat el test!  
Comentaris:
* No ha passat el lint
* Codi ben implementat, amb una funció que gestiona les funcions d'activar/desactivar botons de forma entenedora