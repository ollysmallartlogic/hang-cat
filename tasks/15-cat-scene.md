# 15 — `CatScene` component

- **Milestone:** M4 — Cat & motion
- **Status:** done
- **Depends on:** 04, 14
- **Spec refs:** design.md §3, §4.2, tech-spec.md §7 (Motion → Cat scene)

## Goal

Compose the branch + current cat pose + (later) falling leaves into one stable scene the GameScreen drops into the placeholder slot.

## Deliverables

- `src/ui/components/CatScene.tsx`:
  - Reads `poseIndex(state)` via `useGame()`.
  - Renders one `<svg>` containing:
    - The **branch**: a single horizontal sumi stroke in `var(--matcha)` with two or three momiji leaves attached.
    - The **cat**: the pose component for the current `poseIndex`.
    - A slot/container for `<LeafFall>` to mount detached leaves into (task 16).
  - Pose changes are a 320 ms cross-fade (`var(--t-cat-pose)`), no morphing. Two poses overlap during the fade.
- `CatScene.module.css`.

## Acceptance criteria

- [ ] Pose changes when `wrongLetters.length` changes; pose 6 shows on `state.status === 'lost'`.
- [ ] Pose 0 returns when a new game begins.
- [ ] Cross-fade duration honours `--t-cat-pose`; setting it to `0ms` (reduced motion) makes pose changes instant — ready for task 17.
- [ ] Branch and leaves are *siblings* of the cat group, not children — leaves detach independently.

## Notes

- Cross-fade implementation: keep the previous pose in the DOM with `opacity: 0` for one frame, then unmount on `transitionend`. Avoids the flicker of switching `<svg>` content mid-transition.
- The 2–3 attached leaves on the branch are static here. Detaching is task 16.
