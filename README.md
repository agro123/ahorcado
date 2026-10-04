# El Ahorcado

Versión digital del clásico juego de papel, hecha con React + Vite.
La computadora elige una palabra al azar y dibuja el ahorcado; tú adivinas letra por letra.

## Reglas

- Dos niveles (por defecto **Difícil**; cambiar de nivel inicia una partida nueva):
  - **Fácil – 10 fallos**: cada fallo agrega un trazo, construyendo también la horca:
    base, poste vertical, poste horizontal, cuerda, cabeza, tronco, brazo izq., brazo der.,
    pierna izq., pierna der.
  - **Difícil – 6 fallos**: el dibujo también parte desde la base; cada fallo agrega un grupo:
    base + poste vertical, poste horizontal + cuerda, cabeza, tronco, brazos, piernas.
- Puedes elegir el skin del muñeco (4 opciones, identificadas solo por un icono);
  es solo visual y no reinicia la partida.
- Cada palabra viene con una **pista** que se muestra debajo de la palabra secreta.
- Solo se aceptan letras (A–Z y Ñ). Las tildes se ignoran (`á` cuenta como `a`).
- Repetir una letra muestra un aviso y **no** resta intentos.
- Ganas al completar la palabra; pierdes al agotar los fallos del nivel y se revela la palabra.

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # compila a dist/
```

## Estructura

```
src/
├── data/words.js           # Banco de palabras con pistas
├── utils/letters.js        # Validación, normalización y selección aleatoria
├── hooks/useHangman.js     # Lógica del juego (useReducer + estado derivado)
├── components/
│   ├── HangmanDrawing.jsx  # Dibujo SVG según los fallos
│   ├── skins.jsx           # Skins del muñeco (partes del cuerpo por skin)
│   ├── SkinSelector.jsx    # Selector de skin
│   ├── WordDisplay.jsx     # Palabra con guiones bajos
│   ├── LetterInput.jsx     # Entrada con validación
│   ├── GuessedLetters.jsx  # Historial de aciertos y fallos
│   ├── Feedback.jsx        # Mensaje del último intento
│   └── GameOver.jsx        # Panel de victoria / derrota
├── App.jsx
└── main.jsx
```

## Despliegue en Vercel

1. Sube el proyecto a un repositorio de GitHub.
2. En [vercel.com](https://vercel.com) → **Add New Project** → importa el repositorio.
3. Vercel detecta Vite automáticamente (`npm run build`, salida `dist`). Pulsa **Deploy**.

O desde la terminal: `npx vercel` (y `npx vercel --prod` para producción).
