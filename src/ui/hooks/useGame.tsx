import { createContext, useCallback, useContext, useMemo, useReducer, useRef, type ReactNode } from 'react';
import { initialState, reducer } from '../../game/reducer';
import type { GameState } from '../../game/types';
import { BONUS_WORDS, pickWord } from '../../game/words';
import { announce } from '../announce';

const RECENT_KEY = 'hang-cat:recent';
const SEED_RE = /^[A-Z]{4,9}$/;
const LETTER_RE = /^[A-Z]$/;

interface GameContextValue {
  state: GameState;
  guess: (letter: string) => void;
  newGame: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

function readRecent(): string | null {
  try {
    return localStorage.getItem(RECENT_KEY);
  } catch {
    return null;
  }
}

function writeRecent(word: string): void {
  try {
    localStorage.setItem(RECENT_KEY, word);
  } catch {
    // localStorage may be unavailable (quota, privacy mode) — recent memory is best-effort.
  }
}

function readSeed(): { word: string; isBonus: boolean } | null {
  if (typeof window === 'undefined') return null;
  const raw = new URLSearchParams(window.location.search).get('seed');
  if (!raw) return null;
  const candidate = raw.toUpperCase();
  if (!SEED_RE.test(candidate)) return null;
  return { word: candidate, isBonus: BONUS_WORDS.includes(candidate) };
}

function pickInitial(): { word: string; isBonus: boolean } {
  return readSeed() ?? pickWord({ recent: readRecent() });
}

function lazyInit(): GameState {
  const { word, isBonus } = pickInitial();
  writeRecent(word);
  return initialState(word, isBonus);
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, lazyInit);
  // Mirror state into a ref so `guess` can read the live value without
  // needing to re-create the callback on every keystroke.
  const stateRef = useRef(state);
  stateRef.current = state;

  const guess = useCallback((letter: string) => {
    if (typeof letter !== 'string' || letter.length !== 1) return;
    const upper = letter.toUpperCase();
    if (!LETTER_RE.test(upper)) return;
    const current = stateRef.current;
    if (current.status === 'in_progress' && current.guessedLetters.has(upper)) {
      announce('already guessed');
      return;
    }
    dispatch({ type: 'GUESS', letter: upper });
  }, []);

  const newGame = useCallback(() => {
    const { word, isBonus } = pickWord({ recent: readRecent() });
    writeRecent(word);
    dispatch({ type: 'NEW_GAME', word, isBonus });
  }, []);

  const value = useMemo<GameContextValue>(
    () => ({ state, guess, newGame }),
    [state, guess, newGame],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error('useGame() must be called inside <GameProvider>');
  }
  return ctx;
}
