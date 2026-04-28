import { describe, expect, it } from 'vitest';
import { initialState, reducer } from './reducer';
import type { GameState } from './types';

const start = (word: string, isBonus = false, now = 1_000): GameState =>
  initialState(word, isBonus, now);

const guesses = (state: GameState, letters: string, now?: number): GameState =>
  [...letters].reduce(
    (s, letter) => reducer(s, { type: 'GUESS', letter, now }),
    state,
  );

describe('initialState', () => {
  it('builds an in-progress state with empty guess sets', () => {
    const s = start('CAT');
    expect(s.targetWord).toBe('CAT');
    expect(s.status).toBe('in_progress');
    expect(s.guessedLetters.size).toBe(0);
    expect(s.wrongLetters).toEqual([]);
    expect(s.maxWrong).toBe(6);
    expect(s.endedAt).toBeNull();
    expect(s.startedAt).toBe(1_000);
  });
});

describe('GUESS — correct letter', () => {
  it('records the letter without touching wrongLetters', () => {
    const s = start('CABIN');
    const next = reducer(s, { type: 'GUESS', letter: 'A' });
    expect(next.guessedLetters.has('A')).toBe(true);
    expect(next.wrongLetters).toEqual([]);
    expect(next.status).toBe('in_progress');
  });

  it('does not mutate the previous state', () => {
    const s = start('CABIN');
    const next = reducer(s, { type: 'GUESS', letter: 'A' });
    expect(s.guessedLetters.has('A')).toBe(false);
    expect(s).not.toBe(next);
  });
});

describe('GUESS — wrong letter', () => {
  it('appends to wrongLetters in order', () => {
    let s = start('CABIN');
    s = reducer(s, { type: 'GUESS', letter: 'Z' });
    s = reducer(s, { type: 'GUESS', letter: 'Q' });
    expect(s.wrongLetters).toEqual(['Z', 'Q']);
    expect(s.status).toBe('in_progress');
  });
});

describe('GUESS — repeats', () => {
  it('returns the same state reference for a repeated correct guess', () => {
    const s = reducer(start('CABIN'), { type: 'GUESS', letter: 'A' });
    const again = reducer(s, { type: 'GUESS', letter: 'A' });
    expect(again).toBe(s);
  });

  it('returns the same state reference for a repeated wrong guess', () => {
    const s = reducer(start('CABIN'), { type: 'GUESS', letter: 'Z' });
    const again = reducer(s, { type: 'GUESS', letter: 'Z' });
    expect(again).toBe(s);
    expect(s.wrongLetters).toEqual(['Z']);
  });
});

describe('GUESS — win transition', () => {
  it('flips to won when every letter is revealed and stamps endedAt', () => {
    let s = start('CAT', false, 1_000);
    s = reducer(s, { type: 'GUESS', letter: 'C', now: 2_000 });
    s = reducer(s, { type: 'GUESS', letter: 'A', now: 3_000 });
    expect(s.status).toBe('in_progress');
    s = reducer(s, { type: 'GUESS', letter: 'T', now: 4_000 });
    expect(s.status).toBe('won');
    expect(s.endedAt).toBe(4_000);
  });
});

describe('GUESS — loss transition', () => {
  it('flips to lost on the sixth wrong guess and stamps endedAt', () => {
    let s = start('CAT', false, 1_000);
    s = guesses(s, 'BDEFG', 5_000);
    expect(s.status).toBe('in_progress');
    expect(s.wrongLetters).toHaveLength(5);
    s = reducer(s, { type: 'GUESS', letter: 'H', now: 6_000 });
    expect(s.status).toBe('lost');
    expect(s.endedAt).toBe(6_000);
    expect(s.wrongLetters).toEqual(['B', 'D', 'E', 'F', 'G', 'H']);
  });
});

describe('GUESS — after game over', () => {
  it('ignores guesses after a win (returns same state reference)', () => {
    let s = start('CAT');
    s = guesses(s, 'CAT');
    expect(s.status).toBe('won');
    const again = reducer(s, { type: 'GUESS', letter: 'B' });
    expect(again).toBe(s);
  });

  it('ignores guesses after a loss', () => {
    let s = start('CAT');
    s = guesses(s, 'BDEFGH');
    expect(s.status).toBe('lost');
    const again = reducer(s, { type: 'GUESS', letter: 'C' });
    expect(again).toBe(s);
    expect(again.wrongLetters).toHaveLength(6);
  });
});

describe('NEW_GAME', () => {
  it('returns a fresh state regardless of prior state', () => {
    let s = start('CAT', false, 100);
    s = guesses(s, 'XYZ');
    const fresh = reducer(s, { type: 'NEW_GAME', word: 'PURR', isBonus: true, now: 9_999 });
    expect(fresh.targetWord).toBe('PURR');
    expect(fresh.isBonusWord).toBe(true);
    expect(fresh.status).toBe('in_progress');
    expect(fresh.wrongLetters).toEqual([]);
    expect(fresh.guessedLetters.size).toBe(0);
    expect(fresh.startedAt).toBe(9_999);
    expect(fresh.endedAt).toBeNull();
  });
});

describe('GUESS — invalid letters in dev', () => {
  it('throws when given a non-A-Z letter', () => {
    const s = start('CAT');
    expect(() => reducer(s, { type: 'GUESS', letter: 'a' })).toThrow();
    expect(() => reducer(s, { type: 'GUESS', letter: '1' })).toThrow();
    expect(() => reducer(s, { type: 'GUESS', letter: 'AB' })).toThrow();
  });
});
