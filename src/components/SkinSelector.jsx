import { SKINS } from './skins';

/** Selector de skin del muñeco (solo cambia el aspecto, no la partida). */
export default function SkinSelector({ value, onChange }) {
  return (
    <div className="difficulty" role="radiogroup" aria-label="Skin del muñeco">
      {Object.entries(SKINS).map(([key, { icon, name }]) => (
        <button
          key={key}
          type="button"
          role="radio"
          aria-checked={value === key}
          aria-label={name}
          title={name}
          className={`difficulty__option ${value === key ? 'difficulty__option--active' : ''}`}
          onClick={() => value !== key && onChange(key)}
        >
          <span aria-hidden="true">{icon}</span>
        </button>
      ))}
    </div>
  );
}
