# 08 — `useGame` hook + provider

- **Milestone:** M3 — Playable game
- **Status:** done
- **Depends on:** 04, 07
- **Spec refs:** tech-spec.md §3 (Architecture), §10 (Cheating)

## Goal

Bridge the pure game core to React without leaking either side into the other.

## Deliverables

- `src/ui/hooks/useGame.ts`:
  - A `GameProvider` component wrapping `useReducer(reducer, initialState(...))`.
  - `useGame()` returns `{ state, guess(letter: string): void, newGame(): void }`.
  - `guess` normalises input to uppercase A–Z and drops anything else **before** dispatching `GUESS`.
  - `newGame()` calls `pickWord({ recent })`, persists the new word as `recent` in `localStorage` under a single key (e.g. `hang-cat:recent`), dispatches `NEW_GAME`.
  - On mount, picks the first word the same way.
- `?seed=<word>` query-param hook (for Playwright): if present and a valid word, the provider uses it as the initial target instead of `pickWord`. **Stripped from production builds via env check** — or at minimum, document that v1 leaves it in.
- `src/ui/App.tsx` wraps its tree in `<GameProvider>`.

## Acceptance criteria

- [ ] `useGame()` thrown outside `<GameProvider>` produces a clear runtime error in dev.
- [ ] `guess('a')` and `guess('A')` are equivalent.
- [ ] `guess('1')`, `guess('!')`, `guess('AB')`, `guess('')` are no-ops at the boundary.
- [ ] `newGame()` after a win/loss replaces state with a fresh `in_progress` game.
- [ ] `localStorage` records the most recently played word; refreshing the page does not produce the same word back-to-back (verifiable manually).
- [ ] No game logic lives in this file — the hook only normalises, dispatches, and persists.

## Notes

- Keep the hook thin. Anything substantive should be a reducer change, not a hook change.
- `?seed=` should accept only `^[A-Z]{4,9}$` after uppercasing; ignore otherwise.
