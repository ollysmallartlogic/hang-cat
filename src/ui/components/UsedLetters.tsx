import { useGame } from '../hooks/useGame';
import styles from './UsedLetters.module.css';

export function UsedLetters() {
  const { state } = useGame();
  if (state.wrongLetters.length === 0) return null;

  return (
    <p className={styles.line}>
      <span className={styles.label}>used:</span>
      {state.wrongLetters.map((letter) => (
        <span key={letter} className={styles.letter}>
          {letter}
        </span>
      ))}
    </p>
  );
}
