import { MAX_MISTAKES } from '../utils/letters';

/**
 * Construye el dibujo ASCII según el número de fallos.
 * Cada fallo agrega un trazo, en el orden tradicional:
 *  1) Base  2) Poste vertical  3) Poste horizontal  4) Cuerda  5) Cabeza
 *  6) Tronco  7) Brazo izq.  8) Brazo der.  9) Pierna izq.  10) Pierna der.
 */
function buildAsciiArt(mistakes) {
  const has = (step) => mistakes >= step;

  const post = has(2) ? '  |' : '   ';

  const lines = [
    has(3) ? '  +------+' : has(2) ? '  +' : '',
    post + (has(4) ? '      |' : ''),
    post + (has(5) ? '      O' : ''),
    post + '     ' + (has(7) ? '/' : ' ') + (has(6) ? '|' : ' ') + (has(8) ? '\\' : ''),
    post + '     ' + (has(9) ? '/' : ' ') + ' ' + (has(10) ? '\\' : ''),
    has(2) ? '  |' : '',
    has(1) ? '=========' : '',
  ];

  return lines.join('\n');
}

/** Nombre del último trazo dibujado (para lectores de pantalla y la leyenda). */
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

export default function HangmanDrawing({ mistakes, isLoser }) {
  const lastStroke = mistakes > 0 ? STROKES[mistakes - 1] : 'Nada dibujado aún';

  return (
    <figure className={`drawing ${isLoser ? 'drawing--lost' : ''}`}>
      <pre aria-label={`Dibujo del ahorcado: ${mistakes} de ${MAX_MISTAKES} trazos`}>
        {buildAsciiArt(mistakes)}
      </pre>
      <figcaption>
        Fallos: <strong>{mistakes}</strong> / {MAX_MISTAKES}
        <span className="drawing__stroke"> · Último trazo: {lastStroke}</span>
      </figcaption>
    </figure>
  );
}
