import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initialState, reducer } from '../../game/reducer';
import type { GameState } from '../../game/types';
import { _resetForTests, announce, subscribe } from '../announce';
import { useAnnouncer } from './useAnnouncer';

const ZWSP_TAIL = new RegExp('​+$');

function strip(s: string): string {
  return s.replace(ZWSP_TAIL, '');
}

function Probe({ state }: { state: GameState }) {
  useAnnouncer(state);
  return null;
}

function applyGuesses(state: GameState, letters: string[]): GameState {
  return letters.reduce(
    (s, letter) => reducer(s, { type: 'GUESS', letter, now: 1000 }),
    state,
  );
}

describe('useAnnouncer', () => {
  let messages: string[];
  let unsub: () => void;

  beforeEach(() => {
    _resetForTests();
    messages = [];
    unsub = subscribe((m) => {
      messages.push(strip(m));
    });
  });

  afterEach(() => {
    unsub();
    vi.restoreAllMocks();
  });

  it('announces a correct guess with remaining count', () => {
    const start = initialState('CAT', false, 0);
    const { rerender } = render(<Probe state={start} />);
    const next = reducer(start, { type: 'GUESS', letter: 'C', now: 1000 });
    act(() => {
      rerender(<Probe state={next} />);
    });
    expect(messages).toContain('C — correct, 6 guesses remaining');
  });

  it('announces a wrong guess with remaining count', () => {
    const start = initialState('CAT', false, 0);
    const { rerender } = render(<Probe state={start} />);
    const next = reducer(start, { type: 'GUESS', letter: 'Z', now: 1000 });
    act(() => {
      rerender(<Probe state={next} />);
    });
    expect(messages).toContain('Z — not in the word, 5 guesses remaining');
  });

  it('uses singular "guess" when one remaining', () => {
    const start = initialState('JAZZ', false, 0);
    const before = applyGuesses(start, ['B', 'C', 'D', 'F']);
    const next = applyGuesses(before, ['G']);
    const { rerender } = render(<Probe state={before} />);
    act(() => {
      rerender(<Probe state={next} />);
    });
    expect(messages.at(-1)).toBe('G — not in the word, 1 guess remaining');
  });

  it('announces a win with the full word, not the per-letter line', () => {
    const start = initialState('AT', false, 0);
    const next = applyGuesses(start, ['A', 'T']);
    expect(next.status).toBe('won');
    const { rerender } = render(<Probe state={start} />);
    act(() => {
      rerender(<Probe state={next} />);
    });
    expect(messages.at(-1)).toBe('You won. The word was AT.');
  });

  it('announces a loss with the full word, not the per-letter line', () => {
    const start = initialState('JAZZ', false, 0);
    const next = applyGuesses(start, ['B', 'C', 'D', 'F', 'G', 'H']);
    expect(next.status).toBe('lost');
    const { rerender } = render(<Probe state={start} />);
    act(() => {
      rerender(<Probe state={next} />);
    });
    expect(messages.at(-1)).toBe('You lost. The word was JAZZ.');
  });

  it('does not re-announce when state reference is unchanged', () => {
    const start = initialState('CAT', false, 0);
    const { rerender } = render(<Probe state={start} />);
    const before = messages.length;
    act(() => {
      rerender(<Probe state={start} />);
    });
    expect(messages.length).toBe(before);
  });

  it('appends a nonce so identical messages still trigger an update', () => {
    const stamps: string[] = [];
    const off = subscribe((m) => stamps.push(m));
    announce('hello');
    announce('hello');
    off();
    expect(stamps).toHaveLength(2);
    expect(stamps[0]).not.toBe(stamps[1]);
    expect(strip(stamps[0])).toBe('hello');
    expect(strip(stamps[1])).toBe('hello');
  });
});
