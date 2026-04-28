import { useGame } from '../hooks/useGame';
import styles from './Keyboard.module.css';

const LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export function Keyboard() {
  const { state, guess } = useGame();

  return (
    <div className={styles.grid} role="group" aria-label="On-screen keyboard">
      {LETTERS.map((letter) => {
        const used = state.guessedLetters.has(letter);
        return (
          <button
            key={letter}
            type="button"
            className={`${styles.tile}${used ? ` ${styles.used}` : ''}`}
            aria-disabled={used || undefined}
            tabIndex={used ? -1 : 0}
            onClick={() => {
              if (used) return;
              guess(letter);
            }}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
