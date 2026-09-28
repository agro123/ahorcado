/**
 * Niveles de dificultad.
 * - maxMistakes:  fallos permitidos antes de perder.
 * - prebuiltStrokes: trazos del dibujo que ya aparecen al iniciar
 *   (en difícil la horca completa ya está construida).
 * En ambos casos maxMistakes + prebuiltStrokes = 10 trazos totales.
 */
export const DIFFICULTIES = {
  easy: { label: 'Fácil', maxMistakes: 10, prebuiltStrokes: 0 },
  hard: { label: 'Difícil', maxMistakes: 6, prebuiltStrokes: 4 },
};

export const DEFAULT_DIFFICULTY = 'hard';

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
