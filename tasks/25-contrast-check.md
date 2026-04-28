# 25 — Build-time contrast check script

- **Milestone:** M7 — Accessibility & perf pass
- **Status:** todo
- **Depends on:** 02
- **Spec refs:** design.md §9 (Accessibility), tech-spec.md §9, §11

## Goal

Catch palette-related a11y regressions in CI, not in production.

## Deliverables

- `scripts/check-contrast.ts`:
  - Reads `src/styles/tokens.css` and extracts the palette custom properties.
  - For each foreground/background pair we use in practice (defined as a small declarative table inside the script), computes WCAG contrast ratio.
  - Asserts:
    - `--sumi` on `--kinari` ≥ 4.5:1.
    - `--usu-zumi` on `--kinari` ≥ 4.5:1 at body size.
    - `--shu-iro` on `--kinari` ≥ 3:1 (large text / decorative — the design uses it for the underline + accents, not body copy).
    - `--matcha` on `--kinari` ≥ 3:1 for the branch / decorative.
    - Focus ring (`--sumi` 2px) on `--kinari` ≥ 3:1.
  - Exits non-zero with a clear table of failures.
- `package.json`: hooked into `prebuild` (alongside the word-list validator from task 06).

## Acceptance criteria

- [ ] Running the script on the current palette passes.
- [ ] Manually nudging `--sumi` to a lighter value causes the script to fail with the exact pair and ratio reported.
- [ ] Script runs in under 200 ms.
- [ ] No runtime dependencies — uses a single small npm package for contrast (e.g. `wcag-contrast`) or a hand-rolled formula.

## Notes

- The pair table is the audit. Keep it explicit, not derived — every pair we ship must appear by name.
- Don't try to scrape components for "what colours are in use". That's brittle and over-engineered.
