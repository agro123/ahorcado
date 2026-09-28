Actúa como un desarrollador de software experto. Necesito que programes una versión digital del clásico juego de papel "El Ahorcado".

Dinámica principal:
El juego debe seguir la misma dinámica que la versión tradicional de papel, pero la computadora asumirá el rol del "otro jugador" (el que piensa la palabra y dibuja el ahorcado), mientras que el usuario será quien adivine.

Requisitos y Reglas del Juego:

Selección de la palabra: La computadora debe contar con un arreglo o conjunto de palabras predefinidas (por ejemplo: "colegio", "programacion", "teclado", "algoritmo", etc.) y seleccionar una completamente al azar al inicio de cada partida.

Visualización de la palabra: Se debe mostrar la palabra oculta utilizando guiones bajos (_) por cada letra. Si el usuario adivina una letra, los guiones correspondientes deben revelarse en su posición correcta.

Sistema de fallos y dibujo:

Siguiendo las reglas tradicionales, el jugador tendrá un máximo de 10 fallos permitidos.

Estos 10 fallos representan los trazos del dibujo: 1) Base, 2) Poste vertical, 3) Poste horizontal, 4) Cuerda, 5) Cabeza, 6) Tronco, 7) Brazo izquierdo, 8) Brazo derecho, 9) Pierna izquierda, 10) Pierna derecha.

Por cada letra incorrecta que diga el usuario, debes dibujar (usando arte ASCII si es en consola) el avance de la horca y el muñeco.

Historial de letras: El sistema debe llevar un registro visual de las letras que el jugador ya ha intentado para que no las repita. Si el jugador ingresa una letra repetida, debes avisarle sin restarle un intento.

Fin del juego:

Ganar: El jugador gana si completa la palabra antes de agotar sus 10 intentos.

Perder: El jugador pierde si llega a los 10 errores. El muñeco se "ahorca" y el sistema debe revelar cuál era la palabra secreta.

Por favor, escribe el código completo en React, estructúralo con buenas prácticas, incluye validaciones para que el usuario solo pueda ingresar letras (no números) y añade comentarios explicando cada bloque importante.

listo para desplegar en vercel.