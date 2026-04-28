# 22 — Vermilion pulse for one-guess-left

- **Milestone:** M5 — Polish & copy
- **Status:** done
- **Depends on:** 11, 17
- **Spec refs:** design.md §7 (Vermilion pulse), §9 (Accessibility), tech-spec.md §7

## Goal

Communicate "the cat is on thin paws" without the UI itself panicking.

## Deliverables

- `WordSlots`:
  - When `hasOneGuessLeft(state)` is true, set `data-thin-paws="true"` on the slot row.
  - CSS rule: `[data-thin-paws] .slot { border-bottom-color: var(--shu-iro); animation: pulse 2s ease-in-out infinite; }` (0.5 Hz = 2 s period).
- Reduced motion (task 17) disables the `animation` but keeps `border-bottom-color` static — the warning still reads.
- The cat, independently, has reached pose 4 (single-paw) by this point — three independent channels (colour + shape change + pose) carry the warning, satisfying the colour-blind clause from design.md §9.

## Acceptance criteria

- [ ] At 5 wrong guesses, no pulse. At 5 wrong guesses with `maxWrong=6`, the pulse begins (one guess remaining).
- [ ] Pulse frequency is 0.5 Hz (one full cycle every 2 s).
- [ ] Pulse is the *only* place `--shu-iro` appears on the GameScreen during normal play.
- [ ] With reduced motion: the underline turns vermilion but does not pulse.
- [ ] No other element on the screen turns red simultaneously.

## Notes

- Per design.md §2: "if the screen has more than one red element, something is wrong." Hold the line on this.
- Don't use `box-shadow` for the pulse — it bleeds. A `border-bottom` colour shift is cleaner.
