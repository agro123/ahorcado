import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import WordDisplay from '../components/WordDisplay';

describe('WordDisplay', () => {
  it('oculta todas las letras al iniciar', () => {
    render(
      <WordDisplay
        word="gato"
        guessed={[]}
        reveal={false}
      />,
    );

    const letters = screen.getByLabelText('Palabra secreta').children;

    expect(letters).toHaveLength(4);
    expect([...letters].map((letter) => letter.textContent)).toEqual([
      '_',
      '_',
      '_',
      '_',
    ]);
  });

  it('muestra las letras que ya fueron adivinadas', () => {
    render(
      <WordDisplay
        word="gato"
        guessed={['a']}
        reveal={false}
      />,
    );

    const letters = screen.getByLabelText('Palabra secreta').children;

    expect([...letters].map((letter) => letter.textContent)).toEqual([
      '_',
      'A',
      '_',
      '_',
    ]);
  });

  it('mantiene ocultas las letras que no fueron adivinadas', () => {
    render(
      <WordDisplay
        word="gato"
        guessed={['g']}
        reveal={false}
      />,
    );

    const letters = screen.getByLabelText('Palabra secreta').children;

    expect([...letters].map((letter) => letter.textContent)).toEqual([
      'G',
      '_',
      '_',
      '_',
    ]);
  });

  it('revela toda la palabra cuando reveal es true', () => {
    render(
      <WordDisplay
        word="gato"
        guessed={[]}
        reveal={true}
      />,
    );

    const letters = screen.getByLabelText('Palabra secreta').children;

    expect([...letters].map((letter) => letter.textContent)).toEqual([
      'G',
      'A',
      'T',
      'O',
    ]);
  });

  it('marca como perdidas las letras no adivinadas al revelar la palabra', () => {
    render(
      <WordDisplay
        word="gato"
        guessed={['g']}
        reveal={true}
      />,
    );

    const letters = screen.getByLabelText('Palabra secreta').children;

    expect(letters[0]).not.toHaveClass('word__letter--missed');
    expect(letters[1]).toHaveClass('word__letter--missed');
    expect(letters[2]).toHaveClass('word__letter--missed');
    expect(letters[3]).toHaveClass('word__letter--missed');
  });
});