# 21 — `WinScreen` + `LossScreen`

- **Milestone:** M5 — Polish & copy
- **Status:** todo
- **Depends on:** 19
- **Spec refs:** design.md §4.3, §4.4, tech-spec.md §7 (Copy)

## Goal

The two end-of-game screens, both quiet, neither shouting.

## Deliverables

- `src/ui/screens/WinScreen.tsx`:
  - Cat back on the branch, tail high (use pose 0 or a dedicated victory pose if authored).
  - **Purr-fect.** as the headline (`copy.win`). Variants for fast/whisker per `copyVariant(state)`.
  - The completed word in full, in Mincho.
  - A single `--shu-iro` dot beneath, like a hanko stamp.
  - Small `again?` link (lowercase, `--usu-zumi`) in the corner that resets to a fresh GameScreen.
- `src/ui/screens/LossScreen.tsx`:
  - Cat in the leaves grooming (pose 6 from task 14).
  - **Cat-astrophe.** as the headline (`copy.loss` / `copy.lossNoLetters`).
  - "The word was: ___________" with the actual word revealed.
  - Small `again?` link in the corner.
- Both screens import strings from `copy.ts` — no inline literals.
- Both screens use `var(--font-display)` for the headline.

## Acceptance criteria

- [ ] No "TRY AGAIN" buttons, no exclamation marks, no all-caps shouting.
- [ ] The hanko-dot on the win screen is the only `--shu-iro` element on that screen.
- [ ] `again?` is small, in the corner, and rewires `App.tsx` state to `'game'` with a fresh `newGame()`.
- [ ] Loss-with-no-correct-letters shows `copy.lossNoLetters` (*"Furr-givable. Possibly."*).
- [ ] Both screens are `aria-live="polite"` regions or otherwise announced — see task 23.

## Notes

- The "again?" lowercase styling is intentional. Don't capitalise it.
- Resist the urge to celebrate the win. The cat does not celebrate. The cat goes back to the branch.
