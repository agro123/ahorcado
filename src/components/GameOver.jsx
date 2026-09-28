/**
 * Panel de fin de partida: indica si el jugador ganó o perdió,
 * revela la palabra secreta y permite empezar de nuevo.
 */
export default function GameOver({ isWinner, word, onRestart }) {
  return (
    <div className={`gameover ${isWinner ? 'gameover--win' : 'gameover--lose'}`} role="alert">
      <h2>{isWinner ? '¡Ganaste! 🎉' : '¡Ahorcado! 💀'}</h2>
      <p>
        La palabra secreta era <strong>{word.toUpperCase()}</strong>.
      </p>
      <button type="button" onClick={onRestart} autoFocus>
        Jugar de nuevo
      </button>
    </div>
  );
}
