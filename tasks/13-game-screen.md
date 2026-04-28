# 13 — Minimal `GameScreen` wiring

- **Milestone:** M3 — Playable game
- **Status:** done
- **Depends on:** 09, 10, 11, 12
- **Spec refs:** design.md §4.2 (Game Screen), tech-spec.md §13 (Milestones M3)

## Goal

Wire the M3 components into a screen you can win and lose. **No cat yet.** This is the "playable but ugly" milestone gate.

## Deliverables

- `src/ui/screens/GameScreen.tsx`:
  - Mounts `useKeyboard()` (hook from task 09).
  - Lays out, top-to-bottom: a placeholder for the cat scene (a `<div>` is fine), `<WordSlots />`, `<Keyboard />`, `<UsedLetters />`.
  - Reacts to `state.status === 'won' | 'lost'` by transitioning to the corresponding screen via the simple `useState<'title' | 'game' | 'win' | 'loss'>` machine in `App.tsx`.
- `src/ui/App.tsx` updated with the screen-level state machine described in tech-spec.md §7. Title/win/loss can be stub components for now (task 20, 21 fill them in).

## Acceptance criteria

- [ ] You can play a complete game: type letters → either win or lose.
- [ ] On win/loss, the screen transitions away from the GameScreen.
- [ ] `again?` link (or temporary button) on the stub end-screens returns to a fresh GameScreen with a new word.
- [ ] No console errors over a full play-through.
- [ ] M3 milestone-demo: a fresh checkout + `pnpm dev` produces a working game in under 5 minutes.

## Notes

- This task is the *integration* — resist adding new components or styles. If something feels missing, it probably belongs in a later task.
- The placeholder cat-scene `<div>` should be roughly the right size so layout doesn't jump when task 15 plugs in the real scene.
