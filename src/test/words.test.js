import { describe, expect, it } from 'vitest';
import { WORDS } from '../data/words';

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
});
