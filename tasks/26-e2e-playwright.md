# 26 — Playwright E2E suite

- **Milestone:** M7 — Accessibility & perf pass
- **Status:** todo
- **Depends on:** 13
- **Spec refs:** tech-spec.md §11 (Testing → E2E)

## Goal

Lock the golden paths in tests so a bad refactor surfaces immediately.

## Deliverables

- `playwright.config.ts` — single project, Chromium, baseURL pointing at `vite preview`.
- `e2e/win.spec.ts`:
  - Visit `/?seed=ELEPHANT`.
  - Type `E L P H A N T` (any order).
  - Assert `WinScreen` is visible and the word is shown.
- `e2e/loss.spec.ts`:
  - Visit `/?seed=JAZZ`.
  - Type six wrong letters.
  - Assert `LossScreen` is visible and reveals the answer.
- `e2e/reduced-motion.spec.ts`:
  - Run with browser context `reducedMotion: 'reduce'`.
  - Make a wrong guess.
  - Assert no leaf elements mount in the DOM.
  - Assert no element has an active CSS animation (computed `animation-name: none` or `animation-duration: 0s`).
- `e2e/keyboard-parity.spec.ts`:
  - Visit `/?seed=APPLE`.
  - Type `A` via keyboard, then click `P` via the on-screen keyboard.
  - Assert state matches what would be expected after both inputs.
- CI: runs E2E on PRs to `main`. Unit + component still run on every push.

## Acceptance criteria

- [ ] All four specs pass against a fresh build.
- [ ] Specs run in under 30 s total on a developer laptop.
- [ ] Each spec has a single, clear assertion expressing the user-visible outcome — no DOM-internals snooping where a screen-reader-style query works.
- [ ] CI workflow file (`.github/workflows/e2e.yml` or equivalent) added.

## Notes

- The `?seed=` query-param hook lives in `useGame` (task 08). If that hook was removed for prod, expose it under `import.meta.env.DEV` or via an explicit Playwright-only flag.
- Use `getByRole('button', { name: 'A' })` for tile clicks, not test-ids — the accessible-name path is the same one screen readers use.
