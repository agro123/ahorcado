/**
 * Historial visual de letras intentadas, separado en aciertos y fallos,
 * para que el jugador no las repita.
 */
export default function GuessedLetters({ correctLetters, wrongLetters }) {
  const renderList = (letters, variant) =>
    letters.length === 0 ? (
      <span className="history__empty">—</span>
    ) : (
      letters.map((l) => (
        <span key={l} className={`chip chip--${variant}`}>
          {l.toUpperCase()}
        </span>
      ))
    );

  return (
    <section className="history" aria-label="Letras intentadas">
      <div className="history__group">
        <h2>Aciertos</h2>
        <div className="history__list">{renderList(correctLetters, 'hit')}</div>
      </div>
      <div className="history__group">
        <h2>Fallos</h2>
        <div className="history__list">{renderList(wrongLetters, 'miss')}</div>
      </div>
    </section>
  );
}
