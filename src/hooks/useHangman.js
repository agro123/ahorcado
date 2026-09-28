import { useCallback, useMemo, useReducer } from 'react';
import { WORDS } from '../data/words';
import { DEFAULT_DIFFICULTY, DIFFICULTIES, isValidLetter, normalizeLetter, pickRandomWord } from '../utils/letters';

/* ------------------------------------------------------------------ *
 * Estado del juego
 * ------------------------------------------------------------------ *
 * - word:     palabra secreta elegida por la computadora
 * - guessed:  letras intentadas por el jugador, en orden
 * - feedback: último mensaje para el jugador ({ type, text } o null)
 * - difficulty: 'easy' (10 fallos) o 'hard' (6 fallos)
 * Todo lo demás (errores, victoria, derrota…) se DERIVA de estos datos,
 * así evitamos estados duplicados que se puedan desincronizar.
 * ------------------------------------------------------------------ */

function createInitialState(difficulty = DEFAULT_DIFFICULTY, previousWord = null) {
  return {
    difficulty,
    word: pickRandomWord(WORDS, previousWord),
    guessed: [],
    feedback: null,
  };
}

/** Letras únicas de la palabra, ignorando tildes (p. ej. "pingüino" → p,i,n,g,u,o). */
function lettersOf(word) {
  return new Set([...word].map(normalizeLetter));
}

/* ------------------------------------------------------------------ *
 * Reducer: toda la lógica de transición del juego en un solo lugar.
 * ------------------------------------------------------------------ */
function hangmanReducer(state, action) {
  switch (action.type) {
    case 'GUESS': {
      const raw = action.letter.trim();

      // Validación 1: solo se permite una letra (no números, símbolos ni vacíos).
      if (!isValidLetter(raw)) {
        return {
          ...state,
          feedback: { type: 'error', text: 'Solo puedes ingresar una letra (sin números ni símbolos).' },
        };
      }

      const letter = normalizeLetter(raw);

      // Validación 2: letra repetida → se avisa y NO se resta intento.
      if (state.guessed.includes(letter)) {
        return {
          ...state,
          feedback: { type: 'warning', text: `Ya habías intentado la letra "${letter.toUpperCase()}". ¡Prueba otra!` },
        };
      }

      const isHit = lettersOf(state.word).has(letter);
      return {
        ...state,
        guessed: [...state.guessed, letter],
        feedback: isHit
          ? { type: 'success', text: `¡Bien! La letra "${letter.toUpperCase()}" está en la palabra.` }
          : { type: 'error', text: `La letra "${letter.toUpperCase()}" no está en la palabra.` },
      };
    }

    case 'RESTART':
      // Nueva partida con otra palabra al azar (distinta de la anterior).
      return createInitialState(state.difficulty, state.word);

    case 'SET_DIFFICULTY':
      // Cambiar la dificultad inicia una partida nueva con ese nivel.
      return createInitialState(action.difficulty, state.word);

    default:
      return state;
  }
}

/* ------------------------------------------------------------------ *
 * Hook público: expone el estado derivado y las acciones del juego.
 * Los componentes no necesitan conocer el reducer.
 * ------------------------------------------------------------------ */
export function useHangman() {
  const [state, dispatch] = useReducer(hangmanReducer, null, () => createInitialState());
  const { word, guessed, feedback, difficulty } = state;
  const { maxMistakes, strokeSteps } = DIFFICULTIES[difficulty];

  const derived = useMemo(() => {
    const wordLetters = lettersOf(word);
    const wrongLetters = guessed.filter((l) => !wordLetters.has(l));
    const correctLetters = guessed.filter((l) => wordLetters.has(l));
    const mistakes = wrongLetters.length;
    const isWinner = [...wordLetters].every((l) => guessed.includes(l));
    const isLoser = mistakes >= maxMistakes;

    return {
      wrongLetters,
      correctLetters,
      mistakes,
      remaining: maxMistakes - mistakes,
      isWinner,
      isLoser,
      isGameOver: isWinner || isLoser,
    };
  }, [word, guessed, maxMistakes]);

  const guess = useCallback(
    (letter) => {
      // Si la partida terminó, se ignoran nuevos intentos.
      if (derived.isGameOver) return;
      dispatch({ type: 'GUESS', letter });
    },
    [derived.isGameOver],
  );

  const restart = useCallback(() => dispatch({ type: 'RESTART' }), []);

  const setDifficulty = useCallback(
    (value) => dispatch({ type: 'SET_DIFFICULTY', difficulty: value }),
    [],
  );

  return {
    word,
    guessed,
    feedback,
    difficulty,
    maxMistakes,
    strokeSteps,
    ...derived,
    guess,
    restart,
    setDifficulty,
  };
}
