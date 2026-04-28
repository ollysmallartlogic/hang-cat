import { useEffect, useRef } from 'react';
import type { GameState } from '../../game/types';
import { announce } from '../announce';

function newlyGuessedLetter(prev: GameState, next: GameState): string | null {
  if (next.guessedLetters.size <= prev.guessedLetters.size) return null;
  for (const letter of next.guessedLetters) {
    if (!prev.guessedLetters.has(letter)) return letter;
  }
  return null;
}

function remainingPhrase(remaining: number): string {
  return `${remaining} ${remaining === 1 ? 'guess' : 'guesses'} remaining`;
}

function buildMessage(prev: GameState, next: GameState): string | null {
  // Win / loss take precedence over the per-letter announcement.
  if (prev.status !== next.status) {
    if (next.status === 'won') {
      return `You won. The word was ${next.targetWord}.`;
    }
    if (next.status === 'lost') {
      return `You lost. The word was ${next.targetWord}.`;
    }
    // status flipped to in_progress (new game) — silent.
    return null;
  }

  if (next.status !== 'in_progress') return null;

  const letter = newlyGuessedLetter(prev, next);
  if (!letter) return null;

  const isCorrect = next.targetWord.includes(letter);
  const remaining = next.maxWrong - next.wrongLetters.length;
  if (isCorrect) {
    return `${letter} — correct, ${remainingPhrase(remaining)}`;
  }
  return `${letter} — not in the word, ${remainingPhrase(remaining)}`;
}

export function useAnnouncer(state: GameState): void {
  const prevRef = useRef<GameState>(state);

  useEffect(() => {
    const prev = prevRef.current;
    prevRef.current = state;
    if (prev === state) return;
    const message = buildMessage(prev, state);
    if (message) announce(message);
  }, [state]);
}
