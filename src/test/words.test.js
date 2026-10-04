import { describe, expect, it } from 'vitest';
import { WORDS } from '../data/words';
import { WORD_LENGTHS, filterByLength } from '../utils/letters';

describe('banco de palabras', () => {
  it('no tiene palabras repetidas', () => {
    const words = WORDS.map((e) => e.word);
    expect(new Set(words).size).toBe(words.length);
  });

  it('cada palabra solo usa letras válidas y tiene una pista', () => {
    WORDS.forEach(({ word, hint }) => {
      expect(word).toMatch(/^[a-zñ]+$/);
      expect(hint.trim().length).toBeGreaterThan(0);
    });
  });

  it('cada palabra pertenece a algún rango de letras', () => {
    const total = Object.keys(WORD_LENGTHS).reduce((sum, key) => sum + filterByLength(WORDS, key).length, 0);
    expect(total).toBe(WORDS.length);
  });
});
