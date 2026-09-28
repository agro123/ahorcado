import { normalizeLetter } from '../utils/letters';

/**
 * Muestra la palabra oculta con un guion bajo por letra.
 * - Las letras adivinadas se revelan en su posición.
 * - Si el jugador pierde (`reveal`), se muestra la palabra completa,
 *   resaltando las letras que no alcanzó a descubrir.
 */
export default function WordDisplay({ word, guessed, reveal }) {
  return (
    <div className="word" aria-label="Palabra secreta">
      {[...word].map((char, index) => {
        const isGuessed = guessed.includes(normalizeLetter(char));
        const show = isGuessed || reveal;
        const className = ['word__letter', !isGuessed && reveal ? 'word__letter--missed' : '']
          .join(' ')
          .trim();

        return (
          <span key={index} className={className}>
            {show ? char.toUpperCase() : '_'}
          </span>
        );
      })}
    </div>
  );
}
