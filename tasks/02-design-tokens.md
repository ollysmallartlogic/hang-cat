# 02 — Design tokens (palette + motion vars)

- **Milestone:** M1 — Skeleton
- **Status:** done
- **Depends on:** 01
- **Spec refs:** design.md §2 (Visual Identity), tech-spec.md §7 (Motion)

## Goal

Define the colour palette and motion durations as CSS custom properties, so every later task pulls from one source of truth and the contrast script (task 25) has something to read.

## Deliverables

- `src/styles/tokens.css` with `:root` declarations:
  - Colours: `--kinari`, `--sumi`, `--usu-zumi`, `--matcha`, `--shu-iro`, `--nezumi` (hex values from design.md §2).
  - Motion: `--t-letter-reveal: 240ms`, `--t-cat-pose: 320ms`, `--t-leaf-fall: 1800ms`, `--t-cat-fall: 600ms`, `--pulse-hz: 0.5`.
- `src/styles/reset.css` — minimal CSS reset (margins, box-sizing, font inheritance).
- Both imported from `src/main.tsx`.
- Page background set to `--kinari`, default text colour `--sumi`.

## Acceptance criteria

- [ ] All six palette variables declared with the exact hex values from design.md §2.
- [ ] All five motion variables declared.
- [ ] Page renders with the *kinari* paper background visible in `pnpm dev`.
- [ ] No pure black or pure white anywhere in the rendered DOM.
- [ ] No inline hex values in any later task's CSS — they read `var(--…)`.

## Notes

- These variables are load-bearing for accessibility (task 25 reads them) and for the "vermilion is semantic" rule. Keep them in one file; do not duplicate.
- Resist adding extra "convenience" tokens (`--text-primary` etc.) until a real need shows up — the named palette is the design language.
