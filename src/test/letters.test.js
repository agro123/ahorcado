import { describe, expect, it } from 'vitest';
import {
  normalizeLetter,
  isValidLetter,
  pickRandomWord,
} from '../utils/letters';

describe('normalizeLetter', () => {

  it('quita las tildes', () => {
    expect(normalizeLetter('Á')).toBe('a');
  });

  it('conserva la ñ', () => {
    expect(normalizeLetter('Ñ')).toBe('ñ');
  });
});


describe('isValidLetter', () => {
  it('acepta una letra válida', () => {
    expect(isValidLetter('a')).toBe(true);
  });

  it('acepta una letra mayúscula', () => {
    expect(isValidLetter('A')).toBe(true);
  });

  it('acepta la ñ', () => {
    expect(isValidLetter('ñ')).toBe(true);
  });

  it('rechaza números', () => {
    expect(isValidLetter('5')).toBe(false);
  });

  it('rechaza símbolos', () => {
    expect(isValidLetter('@')).toBe(false);
  });

  it('rechaza más de una letra', () => {
    expect(isValidLetter('ab')).toBe(false);
  });

  it('rechaza texto vacío', () => {
    expect(isValidLetter('')).toBe(false);
  });
});