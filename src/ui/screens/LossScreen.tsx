import { useEffect } from 'react';
import { copyVariant } from '../../game/selectors';
import { Pose6_Landed } from '../components/cat-poses';
import { copy } from '../copy';
import { pickWrongFlavour } from '../copy';
import { useAudio } from '../hooks/useAudio';
import { useGame } from '../hooks/useGame';
import styles from './LossScreen.module.css';

interface Props {
  onAgain: () => void;
}

function headlineFor(state: ReturnType<typeof useGame>['state']): string {
  return copyVariant(state) === 'loss-zero' ? copy.lossNoLetters : copy.loss;
}

export function LossScreen({ onAgain }: Props) {
  const { state } = useGame();
  const { play } = useAudio();
  const headline = headlineFor(state);

  useEffect(() => {
    pickWrongFlavour.reset();
    play('furin');
  }, [play]);

  return (
    <main className={styles.screen}>
      <div className={styles.cat} aria-hidden="true">
        <Pose6_Landed width="100%" height="100%" />
      </div>
      <h1 className={styles.headline}>{headline}</h1>
      <p className={styles.kanji} aria-hidden="true">
        (大惨事)
      </p>
      <p className={styles.reveal}>
        The word was:
        <span className={styles.word}>{state.targetWord}</span>
      </p>
      <button type="button" className={styles.again} onClick={onAgain}>
        again?
      </button>
    </main>
  );
}
