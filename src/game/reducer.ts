import type { Action, GameState, GameStatus } from './types';

const LETTER_RE = /^[A-Z]$/;

export function initialState(word: string, isBonus: boolean, now: number = Date.now()): GameState {
  return {
    targetWord: word,
    guessedLetters: new Set<string>(),
    wrongLetters: [],
    maxWrong: 6,
    status: 'in_progress',
    isBonusWord: isBonus,
    startedAt: now,
    endedAt: null,
  };
}

export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'NEW_GAME':
      return initialState(action.word, action.isBonus, action.now);

    case 'GUESS': {
      if (state.status !== 'in_progress') return state;

      const letter = action.letter;

      if (import.meta.env?.DEV && !LETTER_RE.test(letter)) {
        throw new Error(`reducer: GUESS letter must match /^[A-Z]$/, got ${JSON.stringify(letter)}`);
      }

      if (state.guessedLetters.has(letter)) return state;

      const guessedLetters = new Set(state.guessedLetters);
      guessedLetters.add(letter);

      const isCorrect = state.targetWord.includes(letter);
      const wrongLetters = isCorrect ? state.wrongLetters : [...state.wrongLetters, letter];

      const allRevealed = [...state.targetWord].every((ch) => guessedLetters.has(ch));
      const outOfGuesses = wrongLetters.length >= state.maxWrong;

      let status: GameStatus = state.status;
      let endedAt = state.endedAt;
      if (allRevealed) {
        status = 'won';
        endedAt = action.now ?? Date.now();
      } else if (outOfGuesses) {
        status = 'lost';
        endedAt = action.now ?? Date.now();
      }

      return {
        ...state,
        guessedLetters,
        wrongLetters,
        status,
        endedAt,
      };
    }
  }
}
