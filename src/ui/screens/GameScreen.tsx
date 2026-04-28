import { useGame } from '../hooks/useGame';
import { useKeyboard } from '../hooks/useKeyboard';
import { CatScene } from '../components/CatScene';
import { Keyboard } from '../components/Keyboard';
import { UsedLetters } from '../components/UsedLetters';
import { WordSlots } from '../components/WordSlots';
import styles from './GameScreen.module.css';

export function GameScreen() {
  const { state } = useGame();
  useKeyboard();

  return (
    <main className={styles.screen}>
      <CatScene />
      <WordSlots state={state} />
      <Keyboard />
      <UsedLetters />
    </main>
  );
}
