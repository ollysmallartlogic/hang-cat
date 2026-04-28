import type { GameState } from './types';

const FAST_WIN_MS = 20_000;

export function maskedWord(state: GameState): string {
  return [...state.targetWord]
    .map((ch) => (state.guessedLetters.has(ch) ? ch : '_'))
    .join(' ');
}

export function correctLetters(state: GameState): Set<string> {
  const out = new Set<string>();
  for (const ch of state.targetWord) {
    if (state.guessedLetters.has(ch)) out.add(ch);
  }
  return out;
}

export function remainingGuesses(state: GameState): number {
  return state.maxWrong - state.wrongLetters.length;
}

export type PoseIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export function poseIndex(state: GameState): PoseIndex {
  const n = state.wrongLetters.length;
  const clamped = Math.max(0, Math.min(6, n));
  return clamped as PoseIndex;
}

export function hasOneGuessLeft(state: GameState): boolean {
  return state.status === 'in_progress' && remainingGuesses(state) === 1;
}

export type CopyVariant =
  | 'win'
  | 'win-fast'
  | 'win-by-a-whisker'
  | 'loss'
  | 'loss-zero';

export function copyVariant(state: GameState): CopyVariant {
  if (state.status === 'won') {
    if (remainingGuesses(state) === 1) return 'win-by-a-whisker';
    if (state.endedAt !== null && state.endedAt - state.startedAt < FAST_WIN_MS) {
      return 'win-fast';
    }
    return 'win';
  }
  if (state.status === 'lost') {
    return correctLetters(state).size === 0 ? 'loss-zero' : 'loss';
  }
  return 'loss';
}
