# 16 — `LeafFall` component

- **Milestone:** M4 — Cat & motion
- **Status:** done
- **Depends on:** 02
- **Spec refs:** design.md §3 (Branch), tech-spec.md §7 (Motion → LeafFall)

## Goal

A single momiji leaf detaches from the branch on every wrong guess and drifts down across 1.8 s in real time, regardless of what else happens.

## Deliverables

- `src/ui/components/LeafFall.tsx`:
  - Subscribes to wrong-guess events (e.g. via an effect watching `state.wrongLetters.length`).
  - On each new wrong guess, mounts a new `<g class={leafClass}>` instance with a unique key.
  - Each leaf animates `transform: translate(...)` + `rotate(...)` over `var(--t-leaf-fall)` (1.8 s) with `ease-out`, then unmounts on `onAnimationEnd`.
  - Multiple leaves can be in flight at once (overlapping animations are fine and intentional).
  - Each leaf starts at one of the 2–3 branch attachment points (varied), drifts to a random x-offset (±30px) and y = floor of the scene.
- `LeafFall.module.css` with the keyframe animation.

## Acceptance criteria

- [ ] One wrong guess → one leaf falls.
- [ ] Six wrong guesses in quick succession → six leaves, all in flight, falling concurrently.
- [ ] Leaves keep falling even after the next guess is made.
- [ ] DOM is clean after the animation ends (no orphaned `<g>` elements).
- [ ] Honours `prefers-reduced-motion` — when reduced motion is active, no leaf is mounted at all (task 17 wires this).

## Notes

- Each leaf uses a single SVG path in `var(--matcha)`. A second highlight path in a slightly darker matcha is fine but not required.
- Don't cap the in-flight count — the real-time-independent quality is the spec.
- Reach for CSS `@keyframes`, not JS `requestAnimationFrame` — the browser will handle this fine.
