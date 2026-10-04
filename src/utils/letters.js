/**
 * Niveles de dificultad.
 * - maxMistakes: fallos permitidos antes de perder.
 * - strokeSteps: trazos visibles (de los 10 del dibujo completo) tras cada
 *   número de fallos; el índice es la cantidad de fallos.
 *   En fácil cada fallo agrega 1 trazo desde la base; en difícil la horca
 *   (base, postes y cuerda) ya está dibujada y cada fallo agrega una parte
 *   del cuerpo: cabeza, tronco, brazo izq., brazo der., pierna izq., pierna der.
 */
export const DIFFICULTIES = {
  easy: { label: 'Fácil', maxMistakes: 10, strokeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  hard: { label: 'Difícil', maxMistakes: 6, strokeSteps: [4, 5, 6, 7, 8, 9, 10] },
};

export const DEFAULT_DIFFICULTY = 'hard';

/**
 * Rangos de longitud de la palabra secreta (cantidad de letras, inclusive).
 */
export const WORD_LENGTHS = {
  short: { label: 'Corta', min: 3, max: 6, description: '3–6 letras' },
  long: { label: 'Larga', min: 7, max: Infinity, description: '7+ letras' },
};

export const DEFAULT_WORD_LENGTH = 'short';

/** Filtra las entradas del banco cuya palabra está dentro del rango de longitud. */
export function filterByLength(entries, lengthKey) {
  const { min, max } = WORD_LENGTHS[lengthKey];
  return entries.filter(({ word }) => word.length >= min && word.length <= max);
}

/** Fallos necesarios para que se muestre la pista (también se muestra al terminar la partida). */
export const HINT_AFTER_MISTAKES = 3;

/** Expresión regular que acepta exactamente UNA letra (incluye la ñ). */
const SINGLE_LETTER_REGEX = /^[a-zñ]$/;

/**
 * Normaliza una letra: la pasa a minúscula y le quita tildes/diéresis
 * (á → a, ü → u), pero conserva la "ñ".
 */
export function normalizeLetter(char) {
  const lower = char.toLowerCase();
  if (lower === 'ñ') return lower;
  return lower.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/** Devuelve true si el texto es una única letra válida (sin números ni símbolos). */
export function isValidLetter(char) {
  return SINGLE_LETTER_REGEX.test(normalizeLetter(char));
}

/**
 * Selecciona una palabra completamente al azar del banco.
 * Si se pasa `previous`, evita repetir la misma palabra dos partidas seguidas.
 */
export function pickRandomWord(words, previous = null) {
  const candidates = words.length > 1 ? words.filter((w) => w !== previous) : words;
  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index];
}
