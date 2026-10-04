import { WORD_LENGTHS } from '../utils/letters';

/**
 * Selector del rango de letras de la palabra secreta.
 * Cambiar de rango reinicia la partida con una palabra nueva.
 */
export default function WordLengthSelector({ value, onChange }) {
  return (
    <div className="difficulty" role="radiogroup" aria-label="Cantidad de letras">
      {Object.entries(WORD_LENGTHS).map(([key, { label, description }]) => (
        <button
          key={key}
          type="button"
          role="radio"
          aria-checked={value === key}
          className={`difficulty__option ${value === key ? 'difficulty__option--active' : ''}`}
          onClick={() => value !== key && onChange(key)}
        >
          {label} <span className="difficulty__hint">({description})</span>
        </button>
      ))}
    </div>
  );
}
