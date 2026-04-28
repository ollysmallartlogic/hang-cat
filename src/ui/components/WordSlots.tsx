import { memo, useEffect, useRef } from 'react';
import type { GameState } from '../../game/types';
import { correctLetters, hasOneGuessLeft } from '../../game/selectors';
import { useAudio } from '../hooks/useAudio';
import styles from './WordSlots.module.css';

interface Props {
  state: GameState;
}

function WordSlotsImpl({ state }: Props) {
  const revealed = correctLetters(state);
  const thinPaws = hasOneGuessLeft(state) || undefined;
  const { play } = useAudio();

  // Track which slot indices have ever been revealed so each slot animates
  // exactly once — on the render that first shows it.
  const revealedRef = useRef<Set<number>>(new Set());
  const wordRef = useRef<string | null>(null);
  if (wordRef.current !== state.targetWord) {
    wordRef.current = state.targetWord;
    const initial = new Set<number>();
    [...state.targetWord].forEach((ch, i) => {
      if (revealed.has(ch)) initial.add(i);
    });
    revealedRef.current = initial;
  }

  // Play one `tok` per correct guess that reveals at least one new slot.
  // Multiple slots from the same guess collapse into a single sound — design
  // calls for "a single soft tok," not a chord.
  const lastRevealedCountRef = useRef<number>(revealed.size);
  useEffect(() => {
    const prev = lastRevealedCountRef.current;
    lastRevealedCountRef.current = revealed.size;
    if (revealed.size > prev) play('tok');
  }, [revealed, play]);

  return (
    <div className={styles.row} data-thin-paws={thinPaws} aria-label="Word">
      {[...state.targetWord].map((ch, i) => {
        const shown = revealed.has(ch);
        const justRevealed = shown && !revealedRef.current.has(i);
        if (justRevealed) revealedRef.current.add(i);
        const cls = [
          styles.slot,
          shown ? '' : styles.empty,
          justRevealed ? styles.reveal : '',
        ]
          .filter(Boolean)
          .join(' ');
        return (
          <span key={i} className={cls} aria-hidden={!shown}>
            {shown ? ch : '·'}
          </span>
        );
      })}
    </div>
  );
}

function areEqual(prev: Props, next: Props): boolean {
  if (prev.state.targetWord !== next.state.targetWord) return false;
  if (prev.state.guessedLetters === next.state.guessedLetters) return true;
  // The interesting subset is the *correct* letters; if the new guess was wrong, slots haven't changed.
  for (const ch of next.state.targetWord) {
    if (prev.state.guessedLetters.has(ch) !== next.state.guessedLetters.has(ch)) return false;
  }
  // Also re-render when the one-guess-left edge flips (data-state hook for task 22).
  return hasOneGuessLeft(prev.state) === hasOneGuessLeft(next.state);
}

export const WordSlots = memo(WordSlotsImpl, areEqual);
