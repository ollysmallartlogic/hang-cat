# 10 — On-screen `Keyboard` component

- **Milestone:** M3 — Playable game
- **Status:** done
- **Depends on:** 08
- **Spec refs:** design.md §4.2 (Game Screen), §9 (Accessibility), tech-spec.md §6 (Input Handling)

## Goal

A clickable A–Z keyboard mirroring the physical keyboard, accessible by tab and screen reader.

## Deliverables

- `src/ui/components/Keyboard.tsx`:
  - Renders 26 `<button>` tiles, one per letter.
  - Tab order is alphabetical (DOM order is alphabetical).
  - Each tile shows its letter; uses `var(--font-mono)`, generous tracking.
  - Used letters are rendered as outline-only (no fill), `aria-disabled="true"`, and not focusable (`tabindex="-1"`).
  - Hover lifts the tile by 2px with a faint shadow.
  - Click → `useGame().guess(letter)`.
- `Keyboard.module.css` for the tile grid and the lifted-on-hover state.
- Component reads `state.guessedLetters` to decide which tiles are disabled.

## Acceptance criteria

- [ ] Clicking a fresh tile dispatches a guess.
- [ ] Clicking a used tile is a no-op (the reducer would no-op anyway, but the disabled style + `aria-disabled` carries the message).
- [ ] Each `<button>` has an accessible name equal to its letter.
- [ ] Tab navigation visits A then B then C … in order.
- [ ] Focus ring is `--sumi`, 2px, never red. Visible on keyboard focus.
- [ ] Used letters are visually distinguishable without colour alone (outline vs filled).

## Notes

- This task ships an ugly grid; layout polish (paper-tile feel, exact spacing) can land alongside motion polish in task 18.
- Don't try to do QWERTY layout yet — alphabetical is the spec for v1. The mobile-keyboard layout question is an open issue noted in tech-spec.md §14.
