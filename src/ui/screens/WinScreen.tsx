import { useEffect } from 'react';
import { copyVariant } from '../../game/selectors';
import { Pose0_HangingConfidently } from '../components/cat-poses';
import { copy } from '../copy';
import { pickWrongFlavour } from '../copy';
import { useAudio } from '../hooks/useAudio';
import { useGame } from '../hooks/useGame';
import styles from './WinScreen.module.css';

interface Props {
  onAgain: () => void;
}

function headlineFor(state: ReturnType<typeof useGame>['state']): string {
  switch (copyVariant(state)) {
    case 'win-fast':
      return copy.winFast;
    case 'win-by-a-whisker':
      return copy.winByAWhisker;
    default:
      return copy.win;
  }
}

export function WinScreen({ onAgain }: Props) {
  const { state } = useGame();
  const { play } = useAudio();
  const headline = headlineFor(state);

  // Reset the wrong-flavour deck so the next game starts fresh.
  useEffect(() => {
    pickWrongFlavour.reset();
    play('koto');
  }, [play]);

  return (
    <main className={styles.screen}>
      <div className={styles.cat} aria-hidden="true">
        <Pose0_HangingConfidently width="100%" height="100%" />
      </div>
      <h1 className={styles.headline}>{headline}</h1>
      <p className={styles.kanji} aria-hidden="true">
        (完璧)
      </p>
      <p className={styles.word}>{state.targetWord}</p>
      <span className={styles.hanko} aria-hidden="true" />
      <button type="button" className={styles.again} onClick={onAgain}>
        again?
      </button>
    </main>
  );
}
