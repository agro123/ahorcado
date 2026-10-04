import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import { useHangman } from '../hooks/useHangman';

describe('useHangman', () => {
  it('inicia correctamente', () => {
    const { result } = renderHook(() => useHangman());

    expect(result.current.guessed).toEqual([]);
    expect(result.current.mistakes).toBe(0);
    expect(result.current.isWinner).toBe(false);
    expect(result.current.isLoser).toBe(false);
    expect(result.current.isGameOver).toBe(false);
    expect(result.current.hint).toEqual(expect.any(String));
    expect(result.current.isHintVisible).toBe(false);
  });

  it('muestra la pista después de 3 fallos', () => {
    const { result } = renderHook(() => useHangman());
    const wrong = [...'bcdfghjklmnpqrstvwxyz'].filter((l) => !result.current.word.includes(l));

    act(() => {
      result.current.guess(wrong[0]);
    });
    expect(result.current.isHintVisible).toBe(false);

    act(() => {
      result.current.guess(wrong[1]);
    });
    expect(result.current.isHintVisible).toBe(false);

    act(() => {
      result.current.guess(wrong[2]);
    });
    expect(result.current.isHintVisible).toBe(true);
  });

  it('muestra la pista al terminar la partida', () => {
    const { result } = renderHook(() => useHangman());

    act(() => {
      [...new Set(result.current.word)].forEach((letter) => result.current.guess(letter));
    });

    expect(result.current.mistakes).toBe(0);
    expect(result.current.isHintVisible).toBe(true);
  });

  it('registra una letra correcta', () => {
    const { result } = renderHook(() => useHangman());

    const letter = result.current.word[0];

    act(() => {
      result.current.guess(letter);
    });

    expect(result.current.guessed).toContain(letter);
    expect(result.current.correctLetters).toContain(letter);
    expect(result.current.mistakes).toBe(0);
  });

  it('registra una letra incorrecta', () => {
    const { result } = renderHook(() => useHangman());

    const wrongLetter = result.current.word.includes('z') ? 'x' : 'z';

    act(() => {
      result.current.guess(wrongLetter);
    });

    expect(result.current.guessed).toContain(wrongLetter);
    expect(result.current.wrongLetters).toContain(wrongLetter);
    expect(result.current.mistakes).toBe(1);
  });

  it('no penaliza una letra repetida', () => {
    const { result } = renderHook(() => useHangman());

    const letter = result.current.word[0];

    act(() => {
      result.current.guess(letter);
      result.current.guess(letter);
    });

    expect(result.current.guessed).toHaveLength(1);
    expect(result.current.mistakes).toBe(0);
  });

  it('detecta la victoria al descubrir todas las letras', () => {
    const { result } = renderHook(() => useHangman());

    const uniqueLetters = [...new Set(result.current.word)];

    act(() => {
      uniqueLetters.forEach((letter) => {
        result.current.guess(letter);
      });
    });

    expect(result.current.isWinner).toBe(true);
    expect(result.current.isGameOver).toBe(true);
  });

  it('detecta la derrota al alcanzar el máximo de errores', () => {
    const { result } = renderHook(() => useHangman());

    const wrongLetters = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'];

    act(() => {
      wrongLetters.forEach((letter) => {
        if (!result.current.word.includes(letter)) {
          result.current.guess(letter);
        }
      });
    });

    expect(result.current.isLoser).toBe(true);
    expect(result.current.isGameOver).toBe(true);
  });

  it('elige palabras dentro del rango de letras seleccionado', () => {
    const { result } = renderHook(() => useHangman());

    expect(result.current.wordLength).toBe('short');
    expect(result.current.word.length).toBeGreaterThanOrEqual(3);
    expect(result.current.word.length).toBeLessThanOrEqual(6);

    act(() => {
      result.current.guess(result.current.word[0]);
      result.current.setWordLength('long');
    });

    expect(result.current.wordLength).toBe('long');
    expect(result.current.word.length).toBeGreaterThanOrEqual(7);
    expect(result.current.guessed).toEqual([]);
  });

  it('reinicia la partida', () => {
    const { result } = renderHook(() => useHangman());

    act(() => {
      result.current.guess(result.current.word[0]);
    });

    expect(result.current.guessed.length).toBeGreaterThan(0);

    act(() => {
      result.current.restart();
    });

    expect(result.current.guessed).toEqual([]);
    expect(result.current.mistakes).toBe(0);
    expect(result.current.isGameOver).toBe(false);
  });
});