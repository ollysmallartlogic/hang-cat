# 18 — Letter reveal & cat-pose motion polish

- **Milestone:** M4 — Cat & motion
- **Status:** done
- **Depends on:** 11, 15, 17
- **Spec refs:** design.md §7 (Motion), tech-spec.md §7 (Motion)

## Goal

Make the game *feel* like the design doc says it should: nothing pops, nothing wiggles for attention, things settle.

## Deliverables

- `WordSlots` letter reveal:
  - Newly revealed letters fade in over `var(--t-letter-reveal)` with a 4 px upward drift, ease-out.
  - Use CSS keyframes triggered by a class added on first render of the letter (a small `useEffect` or a CSS-only `:has` solution).
  - Already-revealed letters do not re-animate on subsequent state changes.
- `CatScene` cross-fade timing tightened to honour `var(--t-cat-pose)` and behave correctly under reduced motion (instant swap).
- `CatScene` loss animation:
  - On transition to `lost`, pose 5 → pose 6 over `var(--t-cat-fall)` (600 ms).
- `CatScene` win animation:
  - On transition to `won`, the cat hops up in **two frames** with a hard cut (no easing), per design.md §7.
- No screen shake. Ever.

## Acceptance criteria

- [ ] First letter reveal animates; subsequent re-renders of the same letter do not re-animate.
- [ ] Reduced motion makes all of the above instant.
- [ ] Win animation is a hard cut between two frames — not a tween.
- [ ] No `requestAnimationFrame` loops; CSS handles all of these.
- [ ] Frame rate stays at 60 fps in DevTools across full play-through on a mid-tier laptop.

## Notes

- The "letter settles like it was always there" feel comes from the ease-out + slight drift. Don't overshoot or bounce.
- Don't add a "cat blink" or other ambient idle animation. The cat is composed. The cat is still.
