import { useState } from 'react';
import { useHangman } from './hooks/useHangman';
import HangmanDrawing from './components/HangmanDrawing';
import WordDisplay from './components/WordDisplay';
import LetterInput from './components/LetterInput';
import GuessedLetters from './components/GuessedLetters';
import Feedback from './components/Feedback';
import GameOver from './components/GameOver';
import DifficultySelector from './components/DifficultySelector';
import SkinSelector from './components/SkinSelector';
import { DEFAULT_SKIN } from './components/skins';

/**
 * Componente raíz. La computadora (el hook useHangman) piensa la palabra
 * y lleva la cuenta de fallos; el usuario adivina desde la interfaz.
 * App solo compone las piezas: la lógica vive en el hook.
 */
export default function App() {
  const {
    word,
    guessed,
    feedback,
    correctLetters,
    wrongLetters,
    difficulty,
    maxMistakes,
    strokeSteps,
    mistakes,
    remaining,
    isWinner,
    isLoser,
    isGameOver,
    guess,
    restart,
    setDifficulty,
  } = useHangman();
  // El skin es solo visual: cambiarlo no reinicia la partida.
  const [skin, setSkin] = useState(DEFAULT_SKIN);

  return (
    <main className="app">
      <header className="app__header">
        <h1>El Ahorcado</h1>
        <p>La computadora pensó una palabra de {word.length} letras. ¿Puedes adivinarla?</p>
        <div className="app__options">
          <DifficultySelector value={difficulty} onChange={setDifficulty} />
          <SkinSelector value={skin} onChange={setSkin} />
        </div>
      </header>

      <div className="app__board">
        {/* Columna izquierda: el dibujo que avanza con cada fallo */}
        <HangmanDrawing
          mistakes={mistakes}
          maxMistakes={maxMistakes}
          strokeSteps={strokeSteps}
          skin={skin}
          isLoser={isLoser}
        />

        {/* Columna derecha: palabra, entrada, mensajes e historial */}
        <section className="app__play">
          <WordDisplay word={word} guessed={guessed} reveal={isLoser} />

          {isGameOver ? (
            <GameOver isWinner={isWinner} word={word} onRestart={restart} />
          ) : (
            <>
              <p className="app__remaining">
                Intentos restantes: <strong>{remaining}</strong>
              </p>
              <LetterInput onGuess={guess} disabled={isGameOver} />
              <Feedback feedback={feedback} />
            </>
          )}

          <GuessedLetters correctLetters={correctLetters} wrongLetters={wrongLetters} />
        </section>
      </div>

      <footer className="app__footer">
        <button type="button" className="link" onClick={restart}>
          Nueva palabra
        </button>
      </footer>
    </main>
  );
}
