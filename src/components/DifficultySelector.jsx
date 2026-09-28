import { DIFFICULTIES } from '../utils/letters';

/**
 * Selector de dificultad (botones tipo "segmented control").
 * Cambiar de nivel reinicia la partida con una palabra nueva.
 */
export default function DifficultySelector({ value, onChange }) {
  return (
    <div className="difficulty" role="radiogroup" aria-label="Dificultad">
      {Object.entries(DIFFICULTIES).map(([key, { label, maxMistakes }]) => (
        <button
          key={key}
          type="button"
          role="radio"
          aria-checked={value === key}
          className={`difficulty__option ${value === key ? 'difficulty__option--active' : ''}`}
          onClick={() => value !== key && onChange(key)}
        >
          {label} <span className="difficulty__hint">({maxMistakes} intentos)</span>
        </button>
      ))}
    </div>
  );
}
