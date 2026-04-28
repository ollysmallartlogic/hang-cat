# 19 — Copy lexicon module

- **Milestone:** M5 — Polish & copy
- **Status:** done
- **Depends on:** 01
- **Spec refs:** design.md §5 (Voice & Copy), tech-spec.md §7 (Copy)

## Goal

A typed, single-source-of-truth module for every line of copy in the game. No string literals scattered across components.

## Deliverables

- `src/ui/copy.ts` exporting:
  - `copy.firstWrong: string`
  - `copy.halfway: string`
  - `copy.thinPaws: string`
  - `copy.win: string`
  - `copy.winFast: string`
  - `copy.winByAWhisker: string`
  - `copy.loss: string`
  - `copy.lossNoLetters: string`
  - `copy.repeat: string`
  - `copy.invalid: string`
  - `copy.titleHover: string`
  - `copy.quitConfirm: string`
  - `copy.wrongFlavours: readonly string[]` — `["Hmm.", "Hiss.", "(no comment.)"]`
- `pickWrongFlavour()`:
  - Shuffled-deck implementation: returns each entry once before re-shuffling, never the same line twice in a row.
  - Maintains its deck across calls (module-level state is fine; reset on `newGame()`).
- `pickWrongFlavour.reset()` for `newGame` and tests.

## Acceptance criteria

- [ ] All copy strings from design.md §5 appear verbatim.
- [ ] No exclamation marks, no all-caps "GAME OVER!!!", no kawaii overload.
- [ ] `pickWrongFlavour` over 100 calls never returns the same value twice consecutively.
- [ ] No string literals duplicated in screen components — they import from `copy.ts`.

## Notes

- Treat this file as the canonical voice of the game. PR review for changes here should ask "would the cat say it like this?"
- Japanese parenthetical translations (e.g. `*(完璧)*`) are used as-is in the win/loss screens (task 21), but they're part of the screen layout, not the copy module — they're typographic, not copy.
