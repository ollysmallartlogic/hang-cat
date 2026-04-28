import { describe, expect, it } from 'vitest';
import { initialState, reducer } from './reducer';
import {
  copyVariant,
  correctLetters,
  hasOneGuessLeft,
  maskedWord,
  poseIndex,
  remainingGuesses,
} from './selectors';
import type { GameState } from './types';

const start = (word: string, now = 0): GameState => initialState(word, false, now);

const guess = (state: GameState, letters: string, now?: number): GameState =>
  [...letters].reduce(
    (s, letter) => reducer(s, { type: 'GUESS', letter, now }),
    state,
  );

describe('maskedWord', () => {
  const samples: Array<[string, string, string]> = [
    ['CAT', '', '_ _ _'],
    ['CAT', 'A', '_ A _'],
    ['CAT', 'CT', 'C _ T'],
    ['CABIN', 'AN', '_ A _ _ N'],
    ['BANANA', 'AN', '_ A N A N A'],
    ['WHISKER', 'WHISKER', 'W H I S K E R'],
  ];

  it.each(samples)('mask of %s with guesses %s = %s', (word, letters, expected) => {
    const s = guess(start(word), letters);
    expect(maskedWord(s)).toBe(expected);
  });

  it('matches snapshot across a representative word set', () => {
    const words = ['CAT', 'CABIN', 'WHISKER', 'PURR', 'POUNCE', 'BANANA', 'KITTEN'];
    const out = words.map((w) => {
      const s = guess(start(w), 'AEIOU');
      return [w, maskedWord(s)];
    });
    expect(out).toMatchSnapshot();
  });
});

describe('correctLetters', () => {
  it('contains only letters present in the target', () => {
    const s = guess(start('CAT'), 'ACZ');
    expect(correctLetters(s)).toEqual(new Set(['A', 'C']));
  });
});

describe('remainingGuesses', () => {
  it('decrements on each wrong guess', () => {
    let s = start('CAT');
    expect(remainingGuesses(s)).toBe(6);
    s = guess(s, 'B');
    expect(remainingGuesses(s)).toBe(5);
    s = guess(s, 'D');
    expect(remainingGuesses(s)).toBe(4);
  });
});

describe('poseIndex', () => {
  it('equals wrongLetters.length clamped to 0..6', () => {
    let s = start('CAT');
    expect(poseIndex(s)).toBe(0);
    s = guess(s, 'BDEFGH');
    expect(s.wrongLetters).toHaveLength(6);
    expect(poseIndex(s)).toBe(6);
  });
});

describe('hasOneGuessLeft', () => {
  it('is true only when remainingGuesses === 1 mid-game', () => {
    let s = start('CAT');
    expect(hasOneGuessLeft(s)).toBe(false);
    s = guess(s, 'BDEFG');
    expect(hasOneGuessLeft(s)).toBe(true);
    s = guess(s, 'H');
    expect(s.status).toBe('lost');
    expect(hasOneGuessLeft(s)).toBe(false);
  });
});

describe('copyVariant', () => {
  it('returns "win" for a normal win', () => {
    let s = start('CAT', 0);
    s = guess(s, 'CAT', 30_000);
    expect(copyVariant(s)).toBe('win');
  });

  it('returns "win-fast" for a sub-20s win', () => {
    let s = start('CAT', 0);
    s = guess(s, 'CAT', 5_000);
    expect(copyVariant(s)).toBe('win-fast');
  });

  it('returns "win-by-a-whisker" when won with one guess remaining', () => {
    let s = start('CAT', 0);
    s = guess(s, 'BDEFG', 5_000);
    s = guess(s, 'CAT', 50_000);
    expect(s.status).toBe('won');
    expect(copyVariant(s)).toBe('win-by-a-whisker');
  });

  it('returns "loss-zero" when no correct letters were ever found', () => {
    let s = start('CAT', 0);
    s = guess(s, 'BDEFGH');
    expect(copyVariant(s)).toBe('loss-zero');
  });

  it('returns "loss" for a partial-progress loss', () => {
    let s = start('CABIN', 0);
    s = guess(s, 'A');
    s = guess(s, 'DEFGHJ');
    expect(s.status).toBe('lost');
    expect(copyVariant(s)).toBe('loss');
  });
});
