/** Mensaje del último intento (acierto, fallo, letra repetida o inválida). */
export default function Feedback({ feedback }) {
  return (
    <p className={`feedback ${feedback ? `feedback--${feedback.type}` : ''}`} role="status" aria-live="polite">
      {feedback?.text ?? '¡Adivina la palabra letra por letra!'}
    </p>
  );
}
