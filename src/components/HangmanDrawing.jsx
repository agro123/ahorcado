/**
 * Construye el dibujo ASCII según el número de trazos visibles (0 a 10),
 * en el orden tradicional:
 *  1) Base  2) Poste vertical  3) Poste horizontal  4) Cuerda  5) Cabeza
 *  6) Tronco  7) Brazo izq.  8) Brazo der.  9) Pierna izq.  10) Pierna der.
 */
function buildAsciiArt(strokes) {
  const has = (step) => strokes >= step;

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

/** Nombre de cada trazo (para la leyenda y lectores de pantalla). */
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

/**
 * - Fácil: se parte de 0 trazos y cada fallo construye también la horca.
 * - Difícil: la horca (4 trazos) ya está dibujada; los fallos arman el muñeco.
 */
export default function HangmanDrawing({ mistakes, maxMistakes, prebuiltStrokes, isLoser }) {
  const strokes = prebuiltStrokes + mistakes;
  const lastStroke = mistakes > 0 ? STROKES[strokes - 1] : 'Nada dibujado aún';

  return (
    <figure className={`drawing ${isLoser ? 'drawing--lost' : ''}`}>
      <pre aria-label={`Dibujo del ahorcado: ${mistakes} de ${maxMistakes} fallos`}>
        {buildAsciiArt(strokes)}
      </pre>
      <figcaption>
        Fallos: <strong>{mistakes}</strong> / {maxMistakes}
        <span className="drawing__stroke"> · Último trazo: {lastStroke}</span>
      </figcaption>
    </figure>
  );
}
