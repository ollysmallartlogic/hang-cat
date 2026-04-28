export type GameStatus = 'in_progress' | 'won' | 'lost';

export interface GameState {
  targetWord: string;
  guessedLetters: Set<string>;
  wrongLetters: string[];
  maxWrong: 6;
  status: GameStatus;
  isBonusWord: boolean;
  startedAt: number;
  endedAt: number | null;
}

export type Action =
  | { type: 'NEW_GAME'; word: string; isBonus: boolean; now?: number }
  | { type: 'GUESS'; letter: string; now?: number };
