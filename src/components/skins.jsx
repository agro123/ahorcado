/**
 * Skins del muñeco. Todos mantienen el estilo de muñeco de palo; cada uno
 * define las 6 partes del cuerpo (trazos 5 a 10 del dibujo). Cada parte es una
 * función ({ isLoser }) => JSX dentro de un viewBox de 210x240, con la cabeza
 * centrada en (150, 75), colgando de la cuerda.
 */

const INK = 'currentColor';
const BLACK = '#111';
const PINK = '#ec4899';
const PINK_TINT = 'rgba(236, 72, 153, 0.25)';
const HAIR = '#a0522d';
const HAIR_TINT = 'rgba(160, 82, 45, 0.35)';

export const LINE = { stroke: INK, strokeWidth: 4, strokeLinecap: 'round', fill: 'none' };

/** Ojos, nariz y boca: alegres mientras juegas, en X y tristes al perder. */
function Face({ isLoser, color = INK, lashes = false, lips = color }) {
  const eye = { stroke: color, strokeWidth: 2.5, strokeLinecap: 'round', fill: 'none' };
  const eyeX = 8;
  return (
    <g>
      {isLoser ? (
        <g {...eye}>
          <path d={`M${150 - eyeX - 4} 70 l7 7 M${150 - eyeX + 3} 70 l-7 7`} />
          <path d={`M${150 + eyeX - 3} 70 l7 7 M${150 + eyeX + 4} 70 l-7 7`} />
        </g>
      ) : (
        <g fill={color}>
          <circle cx={150 - eyeX} cy="73" r="2.5" />
          <circle cx={150 + eyeX} cy="73" r="2.5" />
        </g>
      )}
      {lashes && !isLoser && (
        <path
          d={`M${150 - eyeX - 3} 71 l-3 -2 M${150 + eyeX + 3} 71 l3 -2`}
          {...eye}
          strokeWidth={1.8}
        />
      )}
      <path d="M150 76 l-2 7 h4" {...eye} strokeWidth={1.5} />
      <path
        d={isLoser ? 'M143 91 q7 -6 14 0' : 'M143 88 q7 6 14 0'}
        {...eye}
        stroke={lips}
      />
    </g>
  );
}

function Shoe({ x, side, color = INK }) {
  const d =
    side === 'left'
      ? `M${x + 3} 196 h-16 q-4 0 -3 6 h20 z`
      : `M${x - 3} 196 h16 q4 0 3 6 h-20 z`;
  return <path d={d} fill={color} stroke={color} strokeWidth={1.5} strokeLinejoin="round" />;
}

function Hand({ cx, cy, r = 5, color = INK, filled = false }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      stroke={color}
      strokeWidth={3}
      fill={filled ? color : 'none'}
    />
  );
}

/* ------------------------------------------------------------------ *
 * Clásico
 * ------------------------------------------------------------------ */
const classic = {
  icon: '🙂', name: 'Muñeco clásico',
  parts: {
    head: ({ isLoser }) => (
      <>
        <circle cx="150" cy="75" r="20" {...LINE} />
        <path d="M133 66 q4 -14 17 -14 q13 0 17 14" {...LINE} strokeWidth={3} />
        <Face isLoser={isLoser} />
      </>
    ),
    torso: () => (
      <>
        <line x1="150" y1="95" x2="150" y2="150" {...LINE} />
        <path d="M138 100 q12 8 24 0" {...LINE} strokeWidth={2.5} />
        <path d="M141 100 l-3 50 h24 l-3 -50" {...LINE} strokeWidth={2.5} className="shirt" />
        <g fill={INK}>
          <circle cx="150" cy="112" r="1.6" />
          <circle cx="150" cy="124" r="1.6" />
          <circle cx="150" cy="136" r="1.6" />
        </g>
      </>
    ),
    armL: () => (
      <>
        <path d="M148 105 L120 132" {...LINE} />
        <Hand cx={118} cy={135} />
      </>
    ),
    armR: () => (
      <>
        <path d="M152 105 L180 132" {...LINE} />
        <Hand cx={182} cy={135} />
      </>
    ),
    legL: () => (
      <>
        <path d="M148 150 L130 195" {...LINE} />
        <Shoe x={130} side="left" />
      </>
    ),
    legR: () => (
      <>
        <path d="M152 150 L170 195" {...LINE} />
        <Shoe x={170} side="right" />
      </>
    ),
  },
};

/* ------------------------------------------------------------------ *
 * Sólido: muñeco relleno de negro (con contorno claro en tema oscuro).
 * ------------------------------------------------------------------ */
const solid = {
  icon: '⚫', name: 'Muñeco sólido',
  figureClass: 'skin-solid',
  parts: {
    head: ({ isLoser }) => (
      <>
        <circle cx="150" cy="75" r="20" fill={BLACK} stroke={BLACK} strokeWidth={4} />
        <Face isLoser={isLoser} color="#fff" />
      </>
    ),
    torso: () => <line x1="150" y1="95" x2="150" y2="150" stroke={BLACK} strokeWidth={9} strokeLinecap="round" />,
    armL: () => (
      <>
        <path d="M148 106 L120 132" stroke={BLACK} strokeWidth={6} strokeLinecap="round" fill="none" />
        <Hand cx={118} cy={135} color={BLACK} filled />
      </>
    ),
    armR: () => (
      <>
        <path d="M152 106 L180 132" stroke={BLACK} strokeWidth={6} strokeLinecap="round" fill="none" />
        <Hand cx={182} cy={135} color={BLACK} filled />
      </>
    ),
    legL: () => (
      <>
        <path d="M148 150 L130 195" stroke={BLACK} strokeWidth={6} strokeLinecap="round" fill="none" />
        <Shoe x={130} side="left" color={BLACK} />
      </>
    ),
    legR: () => (
      <>
        <path d="M152 150 L170 195" stroke={BLACK} strokeWidth={6} strokeLinecap="round" fill="none" />
        <Shoe x={170} side="right" color={BLACK} />
      </>
    ),
  },
};

/* ------------------------------------------------------------------ *
 * Niña con coletas: moños rosados, vestido triangular.
 * ------------------------------------------------------------------ */
const pigtails = {
  icon: '👧', name: 'Niña con coletas',
  parts: {
    head: ({ isLoser }) => (
      <>
        <ellipse cx="124" cy="86" rx="5" ry="11" stroke={HAIR} strokeWidth={2.5} fill={HAIR_TINT} />
        <ellipse cx="176" cy="86" rx="5" ry="11" stroke={HAIR} strokeWidth={2.5} fill={HAIR_TINT} />
        <circle cx="150" cy="75" r="20" {...LINE} />
        <path d="M133 66 q4 -14 17 -14 q13 0 17 14" {...LINE} strokeWidth={3} />
        <path d="M131 68 l-7 -4 v8 z M169 68 l7 -4 v8 z" fill={PINK} stroke={PINK} strokeWidth={1.5} strokeLinejoin="round" />
        <Face isLoser={isLoser} lashes lips={PINK} />
      </>
    ),
    torso: () => (
      <>
        <line x1="150" y1="95" x2="150" y2="102" {...LINE} />
        <path d="M150 100 L130 160 H170 Z" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" fill={PINK_TINT} />
        <path d="M142 125 h16" {...LINE} stroke={PINK} strokeWidth={3} />
      </>
    ),
    armL: () => (
      <>
        <path d="M146 108 L122 132" {...LINE} />
        <Hand cx={120} cy={135} />
      </>
    ),
    armR: () => (
      <>
        <path d="M154 108 L178 132" {...LINE} />
        <Hand cx={180} cy={135} />
      </>
    ),
    legL: () => (
      <>
        <path d="M142 160 L138 195" {...LINE} />
        <Shoe x={138} side="left" color={PINK} />
      </>
    ),
    legR: () => (
      <>
        <path d="M158 160 L162 195" {...LINE} />
        <Shoe x={162} side="right" color={PINK} />
      </>
    ),
  },
};

/* ------------------------------------------------------------------ *
 * Niña de pelo largo: melena castaña, moño lateral y falda con vuelo.
 * ------------------------------------------------------------------ */
const longHair = {
  icon: '👩', name: 'Niña con pelo largo',
  parts: {
    head: ({ isLoser }) => (
      <>
        <path d="M130 70 q-8 30 -3 62 q9 -6 13 -2 q-4 -30 -1 -55 z" fill={HAIR_TINT} stroke={HAIR} strokeWidth={2.5} strokeLinejoin="round" />
        <path d="M170 70 q8 30 3 62 q-9 -6 -13 -2 q4 -30 1 -55 z" fill={HAIR_TINT} stroke={HAIR} strokeWidth={2.5} strokeLinejoin="round" />
        <circle cx="150" cy="75" r="20" {...LINE} />
        <path d="M131 68 q19 -24 38 0" {...LINE} stroke={HAIR} strokeWidth={3} />
        <path d="M168 60 l-9 -6 v12 z M168 60 l9 -6 v12 z" fill={PINK} stroke={PINK} strokeWidth={1.5} strokeLinejoin="round" />
        <Face isLoser={isLoser} lashes lips="#e11d48" />
      </>
    ),
    torso: () => (
      <>
        <line x1="150" y1="95" x2="150" y2="102" {...LINE} />
        <path d="M144 102 h12 l-2 22 L176 160 H124 L146 124 z" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" fill={PINK_TINT} />
        <path d="M146 124 h8" {...LINE} stroke={PINK} strokeWidth={3} />
      </>
    ),
    armL: () => (
      <>
        <path d="M146 108 L122 130" {...LINE} />
        <Hand cx={120} cy={133} />
      </>
    ),
    armR: () => (
      <>
        <path d="M154 108 L178 130" {...LINE} />
        <Hand cx={180} cy={133} />
      </>
    ),
    legL: () => (
      <>
        <path d="M140 160 L136 195" {...LINE} />
        <Shoe x={136} side="left" color={PINK} />
      </>
    ),
    legR: () => (
      <>
        <path d="M160 160 L164 195" {...LINE} />
        <Shoe x={164} side="right" color={PINK} />
      </>
    ),
  },
};

export const SKINS = { classic, solid, pigtails, longHair };
export const DEFAULT_SKIN = 'classic';
