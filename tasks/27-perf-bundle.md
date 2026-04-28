# 27 — Font subsetting & bundle audit

- **Milestone:** M7 — Accessibility & perf pass
- **Status:** todo
- **Depends on:** 03
- **Spec refs:** tech-spec.md §12 (Performance Budget)

## Goal

Hit the budget: ≤ 80 KB JS gzipped (excl. fonts), each font subset < 30 KB, time-to-interactive < 2 s on warm cache.

## Deliverables

- Font subsetting:
  - Replace the full `@fontsource` imports with subset variants (or pre-subset the WOFF2 with `glyphhanger` / `subset-font` and host locally).
  - Each subset includes: `A–Z`, `a–z`, `0–9`, basic punctuation, plus the exact Japanese characters in use:
    - Wordmark: `吊`, `り`, `猫`.
    - Win/loss kanji: `完`, `璧`, `大`, `惨`, `事`.
    - Title-screen parentheticals: `新`, `し`, `い`, `遊`, `戯`, `び`, `方` (verify against final copy).
- Bundle audit:
  - Run `pnpm build` and inspect `dist/assets/`.
  - JS bundle (excluding fonts) ≤ 80 KB gzipped.
  - Each font file < 30 KB.
  - Total initial payload (HTML + critical CSS + JS + critical font) < 250 KB gzipped.
- Optional: Lighthouse run scripted in CI (`@lhci/cli`) with score thresholds documented but not yet gating.

## Acceptance criteria

- [ ] Subset font files committed to `public/fonts/` (or generated at build time).
- [ ] No `@fontsource/*` imports remain — all fonts are explicitly subset.
- [ ] `pnpm build && du -sh dist/assets/*.js | gzip` shows ≤ 80 KB gzipped per chunk.
- [ ] Performance section of a Lighthouse run on the built site scores ≥ 95.
- [ ] No glyph fallbacks in the rendered Japanese text (no `tofu` boxes for the listed characters).

## Notes

- This is the last task. Resist the temptation to "just add one more thing". Anything beyond the budget is a v2 conversation.
- The set of Japanese glyphs is small and stable — generating subsets manually is reasonable. If it grows, switch to `glyphhanger --whitelist` driven by the actual rendered HTML.
