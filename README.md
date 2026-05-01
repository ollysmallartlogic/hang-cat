# Hang Cat

> 吊り猫 *(tsuri neko)* — "the dangling cat"

A small, dignified cat is dangling from a branch. Each wrong guess loosens its
grip; the leaves drift down behind it. Guess the word and the cat hops back
onto the branch with a pleased little tail-flick.

**Live:** [ollysmallartlogic.github.io/hang-cat](https://ollysmallartlogic.github.io/hang-cat/)

## Preface

This is a **test project for a FSAD (Full Stack Agent Development) workshop** —
a sandbox for exercising AI-assisted development end-to-end, from a written
design doc through to a deployed static site. It is not a polished product.

The interesting artefacts are the planning documents (`design.md`,
`tech-spec.md`, `TASKS.md`) and the per-task briefs in `tasks/`, which were
the inputs an agent worked from. The code is the output, not the point.

## Stack

TypeScript · React 18 · Vite · CSS Modules · Howler · Vitest · Playwright (planned).
Deployed to GitHub Pages from `main` via the workflow in `.github/workflows/`.

## Run it locally

```bash
pnpm install
pnpm dev          # Vite dev server, HMR
pnpm test         # Vitest unit suite
pnpm build        # type-check, validate words, build to dist/
```

Node ≥ 20, pnpm 10. The `prebuild` hook validates the curated word list
(`scripts/validate-words.ts`) before each build.

## Layout

```
src/
  game/        pure reducer, selectors, word list — no React
  ui/          screens, components, hooks
  audio/       Howler instances + placeholder SFX (see CREDITS.md)
  styles/      tokens, typography, reset
  data/        curated word lists
```

The cardinal rule from `tech-spec.md` §3: **pure game logic is separate from
rendering.** Components read state via `useGame()` and dispatch actions; they
never own game state. That makes the reducer trivially testable and keeps the
door open for replay-from-seed later.

## Documents

- [`design.md`](design.md) — visual identity, voice, motion philosophy.
- [`tech-spec.md`](tech-spec.md) — stack, architecture, data model, milestones.
- [`research.md`](research.md) — game rules, edge cases, prior-art notes.
- [`TASKS.md`](TASKS.md) — milestone tracker pointing at per-task briefs in `tasks/`.

## Status

Milestones M1–M6 done (skeleton through audio). M7 (a11y/perf pass — contrast
script, Playwright suite, font subsetting) is still on the todo list. Audio
ships placeholder synthesised tones; see `src/audio/CREDITS.md` for the
sourcing checklist before any non-workshop release.
