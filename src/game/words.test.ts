import { describe, expect, it } from 'vitest';
import { BONUS_PROBABILITY, BONUS_WORDS, WORD_LIST, pickWord } from './words';

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe('word list shape', () => {
  it('exposes the curated standard list', () => {
    expect(WORD_LIST.length).toBeGreaterThanOrEqual(400);
    expect(WORD_LIST.length).toBeLessThanOrEqual(800);
  });

  it('exposes a non-empty bonus list', () => {
    expect(BONUS_WORDS.length).toBeGreaterThan(0);
  });
});

describe('pickWord', () => {
  it('is deterministic given a seeded rng', () => {
    const rngA = mulberry32(42);
    const rngB = mulberry32(42);
    const draws = Array.from({ length: 20 }, () => pickWord({ rng: rngA }));
    const echoes = Array.from({ length: 20 }, () => pickWord({ rng: rngB }));
    expect(draws).toEqual(echoes);
  });

  it('returns words that belong to the picked list', () => {
    const rng = mulberry32(7);
    const standardSet = new Set(WORD_LIST);
    const bonusSet = new Set(BONUS_WORDS);
    for (let i = 0; i < 200; i++) {
      const { word, isBonus } = pickWord({ rng });
      if (isBonus) expect(bonusSet.has(word)).toBe(true);
      else expect(standardSet.has(word)).toBe(true);
    }
  });

  it('hits bonus draws within tolerance of 1/8 over 8000 calls', () => {
    const rng = mulberry32(2026);
    let bonus = 0;
    const N = 8000;
    for (let i = 0; i < N; i++) {
      if (pickWord({ rng }).isBonus) bonus++;
    }
    const rate = bonus / N;
    expect(BONUS_PROBABILITY).toBe(0.125);
    expect(rate).toBeGreaterThanOrEqual(0.11);
    expect(rate).toBeLessThanOrEqual(0.14);
  });

  it('re-rolls once when the first draw matches `recent`', () => {
    // rng call 1: 0.5 ≥ 1/8 → standard list.
    // rng call 2: 0   → idx 0 (recent) → reroll.
    // rng call 3: 0.5 → idx ≈ middle, not recent.
    const seq = [0.5, 0.0, 0.5];
    const rng = () => seq.shift() ?? 0.5;
    const first = WORD_LIST[0];
    const result = pickWord({ rng, recent: first });
    expect(result.word).not.toBe(first);
    expect(result.isBonus).toBe(false);
  });

  it('only re-rolls once — accepts the second draw even if it also matches', () => {
    // Make pickFrom always hit index 0 (recent); after one reroll, function returns index 0 again.
    const rng = () => 0.5; // > 1/8 so standard, and Math.floor(0.5 * len) = mid → not necessarily 0
    // To force collisions we need a custom rng that always picks the same idx:
    let calls = 0;
    const fixedIdxRng = () => {
      calls++;
      // first call: < 1/8? we want standard, so return 0.5
      if (calls === 1) return 0.5;
      // Subsequent calls return 0 → idx 0 every time
      return 0;
    };
    const target = WORD_LIST[0];
    const result = pickWord({ rng: fixedIdxRng, recent: target });
    expect(result.word).toBe(target);
    expect(result.isBonus).toBe(false);
    void rng;
  });
});
