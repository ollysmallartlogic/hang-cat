# 12 — `UsedLetters` component

- **Milestone:** M3 — Playable game
- **Status:** done
- **Depends on:** 08
- **Spec refs:** design.md §4.2 (Game Screen), tech-spec.md §3 (Architecture)

## Goal

Render the secondary "used: B G K Q" line at the bottom of the game screen — redundant with the keyboard tiles, but present for record-keeping (the cat appreciates it).

## Deliverables

- `src/ui/components/UsedLetters.tsx`:
  - Reads `state.wrongLetters` (ordered) and renders `used: ` followed by each letter, space-separated.
  - Empty when no wrong guesses have been made — render *nothing*, not "used: " with an empty list.
  - Uses `var(--font-body)` at small size, colour `--usu-zumi`.
- `UsedLetters.module.css`.

## Acceptance criteria

- [ ] Renders nothing on a fresh game.
- [ ] Letters appear in guess order, not alphabetical.
- [ ] Style is *usu-zumi* (soft ink), not the primary *sumi*.
- [ ] No correct letters appear here — only wrong guesses.

## Notes

- Decision point: do we list **all** guessed letters or only wrong ones? Spec example shows `used: B G K Q` (wrong letters only). Stick to wrong letters.
- This is intentionally redundant with the disabled keyboard tiles. That redundancy is the design.
