# 04 — Game core: types, reducer, selectors

- **Milestone:** M2 — Pure core
- **Status:** done
- **Depends on:** 01
- **Spec refs:** tech-spec.md §3 (Architecture), §4 (Data Model), §11 (Testing)

## Goal

Ship the framework-free heart of the game: a typed `GameState`, a pure reducer, and the selectors every UI component will read from. Fully unit-tested.

## Deliverables

- `src/game/types.ts`:
  - `GameStatus = 'in_progress' | 'won' | 'lost'`.
  - `GameState` matching tech-spec.md §4 exactly.
  - `Action = { type: 'NEW_GAME'; word; isBonus } | { type: 'GUESS'; letter }`.
- `src/game/reducer.ts`:
  - `initialState(word, isBonus): GameState`.
  - `reducer(state, action): GameState` honouring the contract from §4.
- `src/game/selectors.ts`:
  - `maskedWord(state): string`
  - `correctLetters(state): Set<string>`
  - `remainingGuesses(state): number`
  - `poseIndex(state): 0 | 1 | 2 | 3 | 4 | 5 | 6`
  - `hasOneGuessLeft(state): boolean`
  - `copyVariant(state): 'win' | 'win-fast' | 'win-by-a-whisker' | 'loss' | 'loss-zero'`
- `src/game/reducer.test.ts` covering every case in §11 (Unit).
- `src/game/selectors.test.ts` with snapshot tests for `maskedWord` over a representative word set.

## Acceptance criteria

- [ ] No imports from `react`, `vite`, or anything UI-side in `src/game/`.
- [ ] Reducer is referentially transparent: same input → same output, never mutates `state`.
- [ ] Repeat guess (correct or wrong) returns the same state reference is OK, but must not append to `wrongLetters` or change `guessedLetters`.
- [ ] Guesses after `won` / `lost` are no-ops.
- [ ] All tests pass under `pnpm test`.
- [ ] `poseIndex` returns `wrongLetters.length` clamped to `0..6`.

## Notes

- Decide explicitly: does `correctLetters` belong in state or as a selector? Spec §4 says **selector** — keep it that way.
- `copyVariant` thresholds: "fast" if `endedAt - startedAt < 20s`; "by-a-whisker" if won with 1 guess remaining. Tune later, but commit to a definition now.
- The reducer trusts its input is a single uppercase A–Z letter. Validation lives at the call site (task 09 / 10).
