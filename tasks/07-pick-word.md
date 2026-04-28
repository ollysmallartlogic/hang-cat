# 07 — pickWord with seeded RNG + recent memory

- **Milestone:** M2 — Pure core
- **Status:** done
- **Depends on:** 05
- **Spec refs:** tech-spec.md §5 (Selection), §11 (Testing → pickWord)

## Goal

The single function that hands the reducer its next word. Testable, no global RNG, no global storage.

## Deliverables

- `src/game/words.ts` exporting:
  - `WORD_LIST: readonly string[]` (imported from `words.standard.json`).
  - `BONUS_WORDS: readonly string[]` (imported from `words.bonus.json`).
  - `pickWord(opts?: { rng?: () => number; recent?: string | null }): { word: string; isBonus: boolean }`.
  - Default `rng = Math.random`. Default `recent = null` for tests; the UI layer (task 08) supplies `localStorage`-backed `recent`.
- Selection logic:
  1. With `p = 1/8` pick from `BONUS_WORDS`, else `WORD_LIST`.
  2. If chosen word equals `recent`, re-roll **once** within the same list. Don't loop forever.
  3. Return `{ word, isBonus }`.
- `src/game/words.test.ts`:
  - Seeded RNG ⇒ deterministic outputs.
  - Over 8000 calls, bonus draws fall in 11–14% (target 12.5%).
  - `recent` causes a re-roll when the first draw matches.

## Acceptance criteria

- [ ] `pickWord` is pure given an injected `rng`.
- [ ] No reads/writes to `localStorage`, `window`, or `Math.random` inside `src/game/words.ts` itself — those callers live in the UI layer.
- [ ] Tests assert the 1/8 bonus rate within tolerance.
- [ ] Re-roll on `recent` match is bounded (single retry, then accept).

## Notes

- The single re-roll is intentional: avoiding the last word matters once; avoiding it twice in a tight list could loop.
- A `?seed=` query-param hook for Playwright lives in task 08, not here. Keep `pickWord` a leaf.
