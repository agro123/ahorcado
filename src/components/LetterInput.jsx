import { useEffect, useRef, useState } from 'react';
import { isValidLetter } from '../utils/letters';

/**
 * Formulario donde el jugador escribe una letra.
 * Validación en dos capas:
 *  1) Mientras escribe: se rechazan números/símbolos y se muestra un aviso.
 *  2) Al enviar: el hook vuelve a validar (nunca confiamos solo en la UI).
 */
export default function LetterInput({ onGuess, disabled }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  // Mantiene el foco en el campo para que se pueda jugar solo con el teclado.
  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  const handleChange = (event) => {
    // Nos quedamos solo con el último carácter tecleado.
    const char = event.target.value.slice(-1);

    if (char === '') {
      setValue('');
      setError('');
      return;
    }

    if (!isValidLetter(char)) {
      setError('Solo se permiten letras (A-Z, Ñ). No números ni símbolos.');
      return; // No se actualiza el valor: el carácter inválido no entra.
    }

    setError('');
    setValue(char.toUpperCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value) {
      setError('Escribe una letra antes de intentar.');
      return;
    }
    onGuess(value);
    setValue('');
    inputRef.current?.focus();
  };

  return (
    <form className="input" onSubmit={handleSubmit} noValidate>
      <label htmlFor="letter" className="input__label">
        Escribe una letra
      </label>
      <div className="input__row">
        <input
          id="letter"
          ref={inputRef}
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCapitalize="characters"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby="letter-error"
        />
        <button type="submit" disabled={disabled}>
          Probar
        </button>
      </div>
      <p id="letter-error" className="input__error" role="alert">
        {error}
      </p>
    </form>
  );
}
