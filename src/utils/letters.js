/** Número máximo de fallos permitidos (uno por cada trazo del dibujo). */
export const MAX_MISTAKES = 10;

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
