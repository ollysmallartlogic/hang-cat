# 23 — `LiveRegion` + ARIA announcements

- **Milestone:** M5 — Polish & copy
- **Status:** todo
- **Depends on:** 08, 19
- **Spec refs:** design.md §9, tech-spec.md §9 (Accessibility)

## Goal

Make the screen-reader experience calm and clear. The puns are visual flavour; the announcements are plain English.

## Deliverables

- `src/ui/components/LiveRegion.tsx`:
  - A visually hidden region with `aria-live="polite"` and `aria-atomic="true"`.
  - Renders the most recent announcement message; updating the message triggers an announcement.
- A small announcement service (an effect or store) producing messages on:
  - Correct guess: `"E — correct, four guesses remaining"`.
  - Wrong guess: `"Z — not in the word, three guesses remaining"`.
  - Repeat guess: `"already guessed"`.
  - Win: `"You won. The word was ELEPHANT."`.
  - Loss: `"You lost. The word was JAZZ."`.
- The visual-flavour copy from `copy.ts` (Hmm., Hiss., (no comment.)) is **not** read by the LiveRegion.

## Acceptance criteria

- [ ] LiveRegion is `position: absolute; clip: rect(0 0 0 0)` (or equivalent) so it's invisible but announced.
- [ ] VoiceOver / NVDA reads each guess outcome in plain English.
- [ ] Announcements don't pile up — only the most recent is in the region.
- [ ] No emojis in announcement text. No puns.
- [ ] Win/loss screens announce the full word.

## Notes

- Use `polite`, not `assertive`. The cat is calm; the screen reader is calm too.
- A common bug: announcements not firing for repeat-state updates. Append a non-printing nonce (e.g. zero-width space + counter) to force re-announcement of identical text.
