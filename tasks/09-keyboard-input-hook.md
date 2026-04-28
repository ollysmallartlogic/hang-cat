# 09 — `useKeyboard` physical-key hook

- **Milestone:** M3 — Playable game
- **Status:** done
- **Depends on:** 08
- **Spec refs:** tech-spec.md §6 (Input Handling)

## Goal

Map physical keypresses to guesses without stealing keys the browser or future modals need.

## Deliverables

- `src/ui/hooks/useKeyboard.ts`:
  - Listens on `window` for `keydown`.
  - Forwards single A–Z keys to `useGame().guess(letter)`.
  - **Ignores** events when `event.metaKey || event.ctrlKey || event.altKey` is true (so `Cmd+R` etc. fall through).
  - Ignores events while `document.activeElement` is an `<input>` or `<textarea>` (forward-compat).
  - Cleans up its listener on unmount.
- Hook is enabled only on the `GameScreen` — title and end screens do not consume letter keys.

## Acceptance criteria

- [ ] Pressing `e` on the GameScreen dispatches a guess for `E`.
- [ ] Pressing `Cmd+R` reloads the page (not consumed).
- [ ] Pressing `Shift+E` still dispatches `E` — Shift alone does not gate the listener.
- [ ] Pressing `1`, `Enter`, arrow keys, etc., is a no-op.
- [ ] Listener is removed when the hook's component unmounts (verify in DevTools / a test).

## Notes

- `event.repeat` should also be ignored — held keys should not spam the reducer.
- This hook is the *only* place we listen on `window`. Don't sprinkle key listeners across components.
