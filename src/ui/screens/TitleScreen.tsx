import { useEffect, useState } from 'react';
import { Wordmark } from '../components/Wordmark';
import { copy } from '../copy';
import { useAudio } from '../hooks/useAudio';
import styles from './TitleScreen.module.css';

interface Props {
  onBegin: () => void;
}

export function TitleScreen({ onBegin }: Props) {
  const [howToOpen, setHowToOpen] = useState(false);
  const { muted, toggleMuted } = useAudio();

  return (
    <main className={styles.screen}>
      <button
        type="button"
        className={styles.audioToggle}
        onClick={toggleMuted}
        aria-pressed={!muted}
        aria-label={muted ? 'Sound off — turn on' : 'Sound on — turn off'}
        title={muted ? 'sound off' : 'sound on'}
      >
        <SpeakerIcon muted={muted} />
      </button>
      <div className={styles.wordmarkSlot}>
        <Wordmark />
      </div>
      <div className={styles.catSlot} aria-hidden="true">
        <PawWashingCat className={styles.cat} />
      </div>
      <div className={styles.options}>
        <button
          type="button"
          className={styles.option}
          onClick={onBegin}
          title={copy.titleHover}
        >
          <span className={styles.label}>Begin</span>
          <span className={styles.gloss} aria-hidden="true">
            (新しい遊戯)
          </span>
        </button>
        <button
          type="button"
          className={styles.option}
          onClick={() => setHowToOpen(true)}
        >
          <span className={styles.label}>How to play</span>
          <span className={styles.gloss} aria-hidden="true">
            (遊び方)
          </span>
        </button>
      </div>
      <Seigaiha />
      {howToOpen && (
        <HowToPlayDialog onClose={() => setHowToOpen(false)} />
      )}
    </main>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  // Sumi-stroke speaker; a single diagonal slash overlays it when muted.
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 9 H 8 L 13 5 V 19 L 8 15 H 4 Z" />
      {muted ? (
        <path d="M16 9 L 21 14 M 21 9 L 16 14" />
      ) : (
        <>
          <path d="M16 9 q 2 3 0 6" />
          <path d="M18.5 7 q 4 5 0 10" />
        </>
      )}
    </svg>
  );
}

function Seigaiha() {
  return (
    <svg
      className={styles.seigaiha}
      viewBox="0 0 200 100"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="seigaiha"
          x="0"
          y="0"
          width="20"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          {/* Three concentric arcs — the canonical seigaiha unit. */}
          <g
            fill="none"
            stroke="var(--nezumi)"
            strokeWidth="0.6"
            opacity="0.08"
          >
            <path d="M0 10 A 10 10 0 0 1 20 10" />
            <path d="M3 10 A 7 7 0 0 1 17 10" />
            <path d="M6 10 A 4 4 0 0 1 14 10" />
            {/* Offset half-units to interlock the rows */}
            <path d="M-10 10 A 10 10 0 0 1 10 10" transform="translate(10 -5)" />
            <path d="M-7 10 A 7 7 0 0 1 7 10" transform="translate(10 -5)" />
            <path d="M-4 10 A 4 4 0 0 1 4 10" transform="translate(10 -5)" />
          </g>
        </pattern>
      </defs>
      <rect width="200" height="100" fill="url(#seigaiha)" />
    </svg>
  );
}

function PawWashingCat({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="var(--sumi)"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>A small cat sitting upright, washing one paw.</title>
      <g strokeWidth="3.5">
        {/* Round seated body */}
        <path d="M72 162 C 58 152, 58 122, 78 110 C 72 92, 96 76, 116 80 C 138 84, 150 102, 144 122 C 156 132, 152 156, 138 164 C 118 172, 92 172, 72 162" />
        {/* Ears */}
        <path d="M84 92 L 78 74 L 96 88" />
        <path d="M128 88 L 138 72 L 120 84" />
        {/* Front paw on the ground */}
        <path d="M124 158 C 128 168, 128 174, 124 178" />
        {/* Raised paw — washing — curled up by the face */}
        <path d="M92 116 C 84 104, 80 90, 86 78" />
        <path d="M86 78 q -3 -4 0 -7" />
        {/* Tail wrapped around */}
        <path d="M148 148 C 164 138, 168 118, 154 104" />
        {/* Ground line */}
        <path d="M40 180 C 90 176, 140 180, 170 178" />
      </g>
      <g strokeWidth="2.4">
        {/* Closed contented eyes */}
        <path d="M92 112 q 5 -3 10 0" />
        <path d="M120 112 q -5 -3 -10 0" />
        {/* Nose */}
        <path d="M105 120 v 3" />
        {/* Mouth */}
        <path d="M102 126 q 3 3 6 0" />
        {/* Whiskers */}
        <path d="M84 122 l -10 -2" />
        <path d="M84 126 l -10 2" />
        <path d="M126 122 l 10 -2" />
        <path d="M126 126 l 10 2" />
      </g>
    </svg>
  );
}

function HowToPlayDialog({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-to-play-title"
      className={styles.dialogScrim}
      onClick={onClose}
    >
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <h2 id="how-to-play-title" className={styles.dialogTitle}>
          How to play
        </h2>
        <p className={styles.dialogPara}>
          A word is hidden. Guess letters to reveal it.
        </p>
        <p className={styles.dialogPara}>
          Six wrong guesses and the cat slips off the branch — gracefully, of
          course. The leaves on the branch are your remaining guesses.
        </p>
        <p className={styles.dialogPara}>
          Type with your keyboard, or tap the tiles. Repeat guesses are
          politely ignored — the cat remembers.
        </p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className={styles.dialogClose}
        >
          close
        </button>
      </div>
    </div>
  );
}
