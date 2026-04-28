# 03 — Typography & font loading

- **Milestone:** M1 — Skeleton
- **Status:** done
- **Depends on:** 01
- **Spec refs:** design.md §2 (Typography), tech-spec.md §2 (Stack), §12 (Performance)

## Goal

Load the three type families and define type roles so headings, body, and the puzzle tiles look right from the first commit.

## Deliverables

- Add `@fontsource/shippori-mincho`, `@fontsource/inter`, `@fontsource/jetbrains-mono` to `package.json`.
- Import the chosen weights in `src/main.tsx` (or a small `src/styles/typography.css` that imports them).
- `src/styles/typography.css` defining:
  - `--font-display: 'Shippori Mincho', serif;`
  - `--font-body: 'Inter', system-ui, sans-serif;`
  - `--font-mono: 'JetBrains Mono', ui-monospace, monospace;`
  - Body line-height ≥ 1.6.
- `font-display: optional` on the Mincho face to avoid FOUT on the wordmark.

## Acceptance criteria

- [ ] All three families render in `pnpm dev` (verify via DevTools "rendered fonts").
- [ ] Mincho is used by `h1`/`h2`; Inter is the body default; JetBrains Mono is opt-in via `var(--font-mono)`.
- [ ] No layout shift when fonts load on a cold cache (`font-display: optional` in effect).
- [ ] Self-hosted via `@fontsource` — no requests to Google Fonts.

## Notes

- Do not subset here — that's task 27, and it's easier to subset once the actual glyphs in use are known.
- IBM Plex Sans JP and IBM Plex Mono are listed as alternatives in the design doc; we're picking Inter + JetBrains Mono for v1 because they're tighter bundles. If the workshop wants Plex JP, swap the import.
