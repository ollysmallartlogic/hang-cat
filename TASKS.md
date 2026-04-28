# Hang Cat — Task Tracker

State of work for the build described in [`tech-spec.md`](tech-spec.md). Each row links to a per-task file in [`tasks/`](tasks/) with full detail. Update the **Status** column as you go.

**Status legend:** `todo` · `wip` · `blocked` · `done`

---

## M1 — Skeleton

| # | Task | Status | Depends |
|----|------|--------|---------|
| 01 | [Vite + TypeScript scaffold](tasks/01-scaffold.md) | done | — |
| 02 | [Design tokens (palette + motion vars)](tasks/02-design-tokens.md) | done | 01 |
| 03 | [Typography & font loading](tasks/03-typography.md) | done | 01 |

## M2 — Pure core

| # | Task | Status | Depends |
|----|------|--------|---------|
| 04 | [Game core: types, reducer, selectors](tasks/04-game-core.md) | done | 01 |
| 05 | [Word list data files](tasks/05-word-list-data.md) | done | 01 |
| 06 | [Word list build-time validation](tasks/06-word-list-validation.md) | done | 05 |
| 07 | [pickWord with seeded RNG + recent memory](tasks/07-pick-word.md) | done | 05 |

## M3 — Playable game (ugly)

| # | Task | Status | Depends |
|----|------|--------|---------|
| 08 | [`useGame` hook + provider](tasks/08-use-game-hook.md) | done | 04, 07 |
| 09 | [`useKeyboard` physical-key hook](tasks/09-keyboard-input-hook.md) | done | 08 |
| 10 | [On-screen `Keyboard` component](tasks/10-keyboard-component.md) | done | 08 |
| 11 | [`WordSlots` component](tasks/11-word-slots.md) | done | 04 |
| 12 | [`UsedLetters` component](tasks/12-used-letters.md) | done | 08 |
| 13 | [Minimal `GameScreen` wiring](tasks/13-game-screen.md) | done | 09, 10, 11, 12 |

## M4 — Cat & motion

| # | Task | Status | Depends |
|----|------|--------|---------|
| 14 | [Seven cat SVG poses](tasks/14-cat-poses-svg.md) | done | 02 |
| 15 | [`CatScene` component](tasks/15-cat-scene.md) | done | 04, 14 |
| 16 | [`LeafFall` component](tasks/16-leaf-fall.md) | done | 02 |
| 17 | [`useReducedMotion` hook](tasks/17-reduced-motion.md) | done | 01 |
| 18 | [Letter reveal & cat-pose motion polish](tasks/18-motion-polish.md) | done | 11, 15, 17 |

## M5 — Polish & copy

| # | Task | Status | Depends |
|----|------|--------|---------|
| 19 | [Copy lexicon module](tasks/19-copy-lexicon.md) | done | 01 |
| 20 | [`TitleScreen` + `Wordmark`](tasks/20-title-screen.md) | done | 03 |
| 21 | [`WinScreen` + `LossScreen`](tasks/21-end-screens.md) | done | 19 |
| 22 | [Vermilion pulse for one-guess-left](tasks/22-vermilion-pulse.md) | done | 11, 17 |
| 23 | [`LiveRegion` + ARIA announcements](tasks/23-live-region.md) | done | 08, 19 |

## M6 — Audio (optional)

| # | Task | Status | Depends |
|----|------|--------|---------|
| 24 | [`useAudio` + Howler integration](tasks/24-audio.md) | done | 08 |

## M7 — Accessibility & perf pass

| # | Task | Status | Depends |
|----|------|--------|---------|
| 25 | [Build-time contrast check script](tasks/25-contrast-check.md) | todo | 02 |
| 26 | [Playwright E2E suite](tasks/26-e2e-playwright.md) | todo | 13 |
| 27 | [Font subsetting & bundle audit](tasks/27-perf-bundle.md) | todo | 03 |

---

## How to use this tracker

1. Pick the lowest-numbered `todo` task whose dependencies are all `done`.
2. Open its file in `tasks/`, change its **Status** to `wip`, and update this row to match.
3. When done, flip both to `done`. If you hit something unresolvable, set `blocked` and note why in the task file.
4. Anything outside the listed acceptance criteria is out of scope for that task — capture it as a follow-up rather than expanding the task in flight.
