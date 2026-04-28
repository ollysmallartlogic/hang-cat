import standard from '../data/words.standard.json';
import bonus from '../data/words.bonus.json';

export const WORD_LIST: readonly string[] = standard as readonly string[];
export const BONUS_WORDS: readonly string[] = bonus as readonly string[];

export const BONUS_PROBABILITY = 1 / 8;

export interface PickWordOptions {
  rng?: () => number;
  recent?: string | null;
}

export interface PickedWord {
  word: string;
  isBonus: boolean;
}

function pickFrom(list: readonly string[], rng: () => number): string {
  const idx = Math.floor(rng() * list.length);
  return list[Math.min(idx, list.length - 1)];
}

export function pickWord(opts: PickWordOptions = {}): PickedWord {
  const rng = opts.rng ?? Math.random;
  const recent = opts.recent ?? null;

  const isBonus = rng() < BONUS_PROBABILITY;
  const list = isBonus ? BONUS_WORDS : WORD_LIST;

  let word = pickFrom(list, rng);
  if (recent !== null && word === recent) {
    word = pickFrom(list, rng);
  }

  return { word, isBonus };
}
