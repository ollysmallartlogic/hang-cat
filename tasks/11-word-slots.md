# 11 — `WordSlots` component

- **Milestone:** M3 — Playable game
- **Status:** done
- **Depends on:** 04
- **Spec refs:** design.md §4.2 (Game Screen), tech-spec.md §7 (Motion → Letter reveal)

## Goal

Render the dashed underline + revealed-letter row that is the centre of attention on the game screen.

## Deliverables

- `src/ui/components/WordSlots.tsx`:
  - Renders one slot per letter in `state.targetWord`.
  - Each slot has a 1px dashed underline in `--nezumi`.
  - If the letter is in `correctLetters(state)`, render it in `var(--font-mono)`, `--sumi`. Otherwise the slot is empty.
  - Equal spacing per slot; the row is centred on the screen.
- `WordSlots.module.css` with the slot grid + underline.
- Letter reveal animation is **not** implemented here — task 18 adds the fade-in.

## Acceptance criteria

- [ ] Number of slots matches `state.targetWord.length`.
- [ ] Slots stay aligned regardless of which letters are revealed (no layout jump).
- [ ] Underline colour is `var(--nezumi)`.
- [ ] Letters use the mono family and the *sumi* ink colour.
- [ ] Component re-renders only when `correctLetters` or `targetWord` change (no accidental over-rendering).

## Notes

- Use a CSS grid with `grid-auto-flow: column` and `grid-auto-columns: 1ch` (or a fixed em width) for clean alignment.
- The vermilion pulse for "one guess left" is **task 22**, not this one — but leave a stable hook (e.g. a wrapping `<div data-state="…">`) that task 22 can target.
