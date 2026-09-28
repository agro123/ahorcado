import { LINE, SKINS, DEFAULT_SKIN } from './skins';

/**
 * Nombre de cada trazo (para la leyenda y lectores de pantalla), en el orden
 * tradicional. Cada trazo del muñeco incluye además detalles según el skin.
 */
const STROKES = [
  'Base',
  'Poste vertical',
  'Poste horizontal',
  'Cuerda',
  'Cabeza',
  'Tronco',
  'Brazo izquierdo',
  'Brazo derecho',
  'Pierna izquierda',
  'Pierna derecha',
];

const BODY_PARTS = [
  ['head', 5],
  ['torso', 6],
  ['armL', 7],
  ['armR', 8],
  ['legL', 9],
  ['legR', 10],
];

/**
 * El dibujo completo son 10 trazos; `strokeSteps[fallos]` indica cuántos se
 * ven tras cada fallo (según la dificultad, siempre desde la base).
 */
export default function HangmanDrawing({ mistakes, maxMistakes, strokeSteps, skin = DEFAULT_SKIN, isLoser }) {
  const strokes = strokeSteps[mistakes];
  const has = (step) => strokes >= step;
  const { parts, figureClass = '' } = SKINS[skin] ?? SKINS[DEFAULT_SKIN];
  const lastStroke =
    mistakes > 0 ? STROKES.slice(strokeSteps[mistakes - 1], strokes).join(' y ') : 'Nada dibujado aún';

  return (
    <figure className={`drawing ${isLoser ? 'drawing--lost' : ''}`}>
      <svg
        className="drawing__svg"
        viewBox="0 0 210 240"
        role="img"
        aria-label={`Dibujo del ahorcado: ${mistakes} de ${maxMistakes} fallos`}
      >
        {/* 1) Base: suelo con pasto */}
        {has(1) && (
          <g className="part">
            <line x1="15" y1="225" x2="130" y2="225" {...LINE} strokeWidth={6} />
            <path d="M25 225 l3 -8 l3 8 M60 225 l3 -8 l3 8 M100 225 l3 -8 l3 8" {...LINE} strokeWidth={2} />
          </g>
        )}

        {/* 2) Poste vertical + refuerzo */}
        {has(2) && (
          <g className="part">
            <line x1="45" y1="225" x2="45" y2="20" {...LINE} strokeWidth={6} />
            <line x1="45" y1="70" x2="90" y2="20" {...LINE} strokeWidth={3} />
          </g>
        )}

        {/* 3) Poste horizontal */}
        {has(3) && (
          <g className="part">
            <line x1="42" y1="20" x2="150" y2="20" {...LINE} strokeWidth={6} />
          </g>
        )}

        {/* Cuerda y muñeco: cuelgan del poste y se balancean al perder */}
        <g className={isLoser ? 'sway' : ''}>
          {/* 4) Cuerda con nudo */}
          {has(4) && (
            <g className="part">
              <line x1="150" y1="20" x2="150" y2="50" {...LINE} strokeWidth={3} />
              <ellipse cx="150" cy="54" rx="7" ry="5" {...LINE} strokeWidth={3} />
            </g>
          )}

          {/* 5 a 10) Cuerpo según el skin */}
          <g className={figureClass}>
            {BODY_PARTS.map(([name, step]) => {
              const Part = parts[name];
              return has(step) && (
                <g className="part" key={name}>
                  <Part isLoser={isLoser} />
                </g>
              );
            })}
          </g>
        </g>
      </svg>
      <figcaption>
        Fallos: <strong>{mistakes}</strong> / {maxMistakes}
        <span className="drawing__stroke"> · Último trazo: {lastStroke}</span>
      </figcaption>
    </figure>
  );
}
