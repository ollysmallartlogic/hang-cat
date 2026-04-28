# Hang Cat — Technical Specification

> Companion to `design.md` (look & feel) and `research.md` (game rules & implementation patterns).
> This document covers *how we build it*: stack, architecture, data model, modules, and milestones.

---

## 1. Scope

### In scope (v1)

- Single-player, single-device web game.
- Curated word list shipped with the bundle (no backend).
- Six wrong guesses → loss; full word revealed → win.
- Full visual fidelity to `design.md`: sumi-e cat, *kinari* paper, Mincho/Plex typography, *shu-iro* accent.
- Keyboard + on-screen-keyboard input.
- WCAG AA contrast, `prefers-reduced-motion`, ARIA live announcements.
- Optional, off-by-default ambient + SFX.

### Out of scope (v1)

- Accounts, persistence beyond `localStorage`, multiplayer, daily-puzzle backend.
- Adversarial / "evil" hangman mode.
- Localisation beyond the existing English/Japanese typographic accents.
- Native mobile builds (responsive web only).

---

## 2. Stack

| Concern         | Choice                              | Why                                                                 |
|-----------------|-------------------------------------|---------------------------------------------------------------------|
| Language        | **TypeScript** (strict)             | Catches state-shape mistakes; the game is small and benefits from typed reducers. |
| Framework       | **React 18** + **Vite**             | Component model fits the screen-by-screen design; Vite gives instant HMR for tuning motion timings. |
| State           | **`useReducer`** + React context    | Game state is a small, serialisable object; a reducer is the natural shape and matches the "pure functions" pattern from `research.md` §Architecture. |
| Styling         | **CSS Modules** + **CSS custom properties** for the palette | The palette is load-bearing (vermilion is semantic) — CSS variables make it auditable. Avoids Tailwind's utility soup, which fights the typographic restraint. |
| Cat / branch    | **Inline SVG**, hand-authored       | Each pose is a single frame. SVG keeps the brushstroke crisp at any size and lets us animate stroke-dashoffset for the leaf detach. |
| Fonts           | `@fontsource/shippori-mincho`, `@fontsource/inter`, `@fontsource/jetbrains-mono` | Self-hosted. No FOUT-on-the-Mincho-wordmark via `font-display: optional`. |
| Audio           | **Howler.js**                       | Tiny, handles iOS unlock, easy mute. Sounds preloaded but never auto-play. |
| Testing (unit)  | **Vitest** + **@testing-library/react** | Vitest shares Vite config; pure-reducer tests are fast. |
| Testing (E2E)   | **Playwright**                      | Win/lose flows, keyboard input, reduced-motion check.               |
| Lint / format   | **ESLint** (typescript-eslint, react-hooks) + **Prettier**. | Standard. |
| Deploy          | Static host (Netlify / Vercel / GH Pages). No server. | The game has no server-side secrets — the word list is local. (See §10 on cheating.) |

**Node:** ≥ 20. **Package manager:** `pnpm`.

---

## 3. Architecture

The cardinal rule from `research.md` §Architecture: **pure game logic is separate from rendering.**

```
src/
  game/                  ← pure, framework-free
    types.ts             ← GameState, GameStatus, GuessResult
    reducer.ts           ← (state, action) → state
    selectors.ts         ← maskedWord(state), remainingGuesses(state), poseIndex(state)
    words.ts             ← WORD_LIST, BONUS_WORDS, pickWord()
    validate.ts          ← isValidLetter(input)

  ui/
    App.tsx
    screens/
      TitleScreen.tsx
      GameScreen.tsx
      WinScreen.tsx
      LossScreen.tsx
    components/
      Wordmark.tsx       ← "HANG CAT / 吊り猫"
      WordSlots.tsx      ← dashed underlines, fades letters in
      Keyboard.tsx       ← on-screen tiles + physical key listener
      UsedLetters.tsx
      CatScene.tsx       ← <svg> with branch + cat-pose switcher
      LeafFall.tsx       ← detached momiji animation
      LiveRegion.tsx     ← ARIA announcements
    hooks/
      useGame.ts         ← wraps useReducer, exposes guess(letter)
      useKeyboard.ts     ← maps physical keys → guess()
      useReducedMotion.ts
      useAudio.ts

  audio/
    sfx.ts               ← Howl instances + mute state
    assets/              ← *.webm + *.mp3 fallbacks

  styles/
    tokens.css           ← :root { --kinari, --sumi, --shu-iro, ... }
    typography.css
    reset.css

  data/
    words.standard.json
    words.bonus.json

  main.tsx
  index.html
```

**Rendering rule:** components read from `useGame()` and dispatch actions. They never own game state. This makes screenshot tests and "replay this game from a seed" trivial later.

---

## 4. Data Model

### `GameState`

```ts
type GameStatus = 'in_progress' | 'won' | 'lost';

interface GameState {
  targetWord: string;          // uppercase, A–Z only, length 4–9
  guessedLetters: Set<string>; // every letter tried (correct + wrong)
  wrongLetters: string[];      // ordered, for the "used:" line
  maxWrong: 6;                 // constant for v1, but kept in state for future variants
  status: GameStatus;
  isBonusWord: boolean;        // for the silent 1-in-8 cat-flavoured words
  startedAt: number;           // for the "win (fast)" / "win (by a whisker)" copy variants
  endedAt: number | null;
}
```

`correctLetters`, `remainingGuesses`, `maskedWord`, and `poseIndex` are **selectors** computed from the above (per `research.md` §Core Data Model — "derived values should be computed, not stored, to avoid state drift").

### Actions

```ts
type Action =
  | { type: 'NEW_GAME'; word: string; isBonus: boolean }
  | { type: 'GUESS'; letter: string };  // letter is single A–Z
```

### Reducer contract

- `GUESS` with a non-letter or already-guessed letter → **no-op** (state returned identical). The UI shows the *"Already tried. The cat remembers."* copy without decrementing.
- `GUESS` after `won` / `lost` → no-op.
- A guess that empties `remainingGuesses` flips status to `lost` and stamps `endedAt`.
- A guess that fully reveals the word flips status to `won` and stamps `endedAt`.

### Selectors

```ts
maskedWord(state): string             // "_ A _ _ _ N"
remainingGuesses(state): number       // maxWrong - wrongLetters.length
poseIndex(state): 0..6                // 0 = confident hang, 6 = landed (loss)
hasOneGuessLeft(state): boolean       // gates the vermilion pulse
copyVariant(state): 'win' | 'win-fast' | 'win-by-a-whisker' | 'loss' | 'loss-zero'
```

`poseIndex` maps `wrongLetters.length` (0–6) directly to the seven cat states in `design.md` §3.

---

## 5. Word List

### Source

Bundle two JSON files, hand-curated as `design.md` §6 demands:

- `words.standard.json` — ~600 common 4–9 letter words. Seeded from `dwyl/english-words` filtered by length, then **manually pruned** to remove proper nouns, archaic/obscure words, and anything requiring cultural knowledge.
- `words.bonus.json` — the cat-flavoured list from §6 verbatim, plus reasonable extensions.

Both files: `string[]`, uppercase, A–Z only, validated at build time by a script.

### Build-time validation

`scripts/validate-words.ts` runs in `pnpm prebuild` and asserts:

- Length 4–9.
- `^[A-Z]+$`.
- No duplicates within a list, no overlap between lists.
- No words on a small embarrassment denylist.

Failing the script fails the build.

### Selection

`pickWord()`:

1. Roll a uniform random; with **p = 1/8** pick from `words.bonus.json`, else `words.standard.json`.
2. Avoid the most recently played word (single-slot history in `localStorage`).
3. Return `{ word, isBonus }`.

The bonus draw is silent — `isBonusWord` exists in state only for telemetry/debug, never surfaced.

---

## 6. Input Handling

Per `research.md` §Edge Cases:

- Normalise everything to uppercase A–Z at the boundary (`useKeyboard`, `Keyboard.tsx` clicks). The reducer trusts its inputs are single uppercase letters.
- Reject digits, punctuation, multi-character paste — silently in `useKeyboard`; with the *"Letters only, if you'd be so claw-nd."* line if a user types into a future text-entry mode.
- Repeat guesses → no-op + the *"Already tried"* copy; ARIA live region also announces "already guessed".
- Tab order on the on-screen keyboard is alphabetical (matches `design.md` §9). Each tile is a real `<button>`.

**No physical-key chord listening on modifier keys** — `Cmd/Ctrl/Alt + letter` falls through to the browser. We only consume bare letter keys when no modal/menu is open.

---

## 7. UI Behaviour

### Screens & state machine

```
TitleScreen ──BEGIN──▶ GameScreen ──win──▶ WinScreen ──again?──▶ GameScreen
                          │
                          └──loss──▶ LossScreen ──again?──▶ GameScreen
```

A trivial `useState<'title' | 'game' | 'win' | 'loss'>` at `App.tsx`. Game state is reset on transition into `GameScreen` (new word picked).

### Motion (per `design.md` §7)

All durations live as CSS custom properties so they can be diffed in code review:

```css
:root {
  --t-letter-reveal: 240ms;
  --t-cat-pose: 320ms;
  --t-leaf-fall: 1800ms;
  --t-cat-fall: 600ms;
  --pulse-hz: 0.5;
}
```

- `LeafFall` runs on a real-time timer independent of guesses. Prior leaves keep falling when the next guess comes in. Implemented as a `<g>` per leaf with `animation: leaf-drift 1.8s ease-out forwards;` and `onAnimationEnd → unmount`.
- `prefers-reduced-motion: reduce` — `useReducedMotion()` swaps a body class; CSS sets all durations to `0ms` and disables the pulse.

### Vermilion pulse

Single guess remaining → `WordSlots` adds `data-thin-paws` → CSS animates a 1px `--shu-iro` underline at 0.5 Hz. Disabled under reduced motion (a static underline remains, satisfying the colour-blind requirement).

### Cat scene

`CatScene.tsx` renders one of seven inline SVG poses keyed by `poseIndex(state)`. Pose swap is a 320 ms cross-fade — no morphing. Branch and leaves are sibling SVG groups, not part of the cat group.

### Copy

`ui/copy.ts` exports the lexicon from `design.md` §5 as typed records keyed by event. The wrong-guess flavour line rotates through three values without repeating consecutively — pick from a shuffled deck, reshuffle when exhausted.

---

## 8. Audio

- `useAudio()` exposes `play('tok' | 'fmm' | 'koto' | 'furin')` and a global mute toggle persisted in `localStorage`.
- **Off by default.** A small speaker icon in the title-screen corner toggles it. We do not auto-play.
- Files are short (≤ 1.2 s), shipped as `.webm` with `.mp3` fallback. Total audio payload < 200 KB.
- The cat itself is silent (per `design.md` §8).

---

## 9. Accessibility

Concrete acceptance criteria, mapping `design.md` §9 to tests:

- All foreground/background pairs ≥ 4.5:1 against `--kinari`. Asserted by a build-time script (`scripts/check-contrast.ts` reading `tokens.css`).
- `LiveRegion` is `aria-live="polite"`. On every guess: announce *"E — correct, four guesses remaining"* / *"Z — not in the word, three guesses remaining"* in plain English. Win/loss announce the full word.
- Cat poses include `<title>` text inside the SVG — *"a cat dangling from a branch by both paws"*, etc. — used by screen readers as the alt for the pose.
- `prefers-reduced-motion` paths tested by Playwright with `reducedMotion: 'reduce'`.
- The "one guess left" state communicates via three independent channels: vermilion (colour), underline (shape), single-paw cat pose (illustration). Removing any one still leaves the warning legible — satisfies the colour-blind clause.
- Focus ring on keyboard tiles is *sumi* outline, 2 px, never red.

---

## 10. Cheating, and Why We Don't Care (Yet)

The word list and target word live in the client bundle. Anyone determined enough can read the DOM or sources and find the word. **For v1 this is fine** — the game is single-player, cosy, and has no leaderboard.

If a future variant adds a daily puzzle or shared score, the target moves server-side behind a small API. Documenting now so we don't accidentally bake assumptions that block that path: keep `pickWord` and the reducer pure and fed by props/dispatch — never let UI components read `WORD_LIST` directly.

---

## 11. Testing Strategy

### Unit (Vitest) — the load-bearing layer

Reducer + selectors must be exhaustively tested. Cases (per `research.md` §Testing Considerations, adapted):

- Correct guess: reveals letter, attempts unchanged, status `in_progress`.
- Incorrect guess: appends to `wrongLetters`, status `in_progress` until 6th miss.
- Repeat guess (correct or wrong): no state change.
- Win transition: last masked slot filled → `status = 'won'`, `endedAt` set.
- Loss transition: 6th wrong → `status = 'lost'`, `endedAt` set.
- Guesses after end-of-game: ignored.
- Invalid letter (lowercase, digit, multi-char): *the reducer is not the validation point* — assert callers normalise; assert reducer rejects with a clear error in dev only.
- Snapshot tests for `maskedWord` across a representative word set.

`pickWord` is tested with a seeded RNG injected via parameter (so the 1/8 ratio is verifiable).

### Component (Testing Library)

- `Keyboard` disables tiles for used letters, fires `GUESS` on click.
- `WordSlots` renders the right number of slots, fades letters in (assert class, not animation timing).
- `CatScene` renders pose 0..6 keyed by `poseIndex`.
- `LiveRegion` emits the expected ARIA text on guess.

### E2E (Playwright)

- **Golden win path:** type the letters of a word forced via a `?seed=` query param, assert `WinScreen` renders.
- **Golden loss path:** type six wrong letters, assert `LossScreen` reveals the answer.
- **Reduced motion:** browser context with `reducedMotion: 'reduce'`; assert no leaves fall, no pulse.
- **Keyboard parity:** physical keypress and on-screen click produce identical state.

CI runs unit + component on every push; E2E on PRs to `main`.

---

## 12. Performance Budget

- Initial JS ≤ 80 KB gzipped (excluding fonts).
- Fonts subsetted to A–Z, 0–9, punctuation, plus the 3 Japanese characters used (`吊`, `り`, `猫`) and the win/loss kanji (`完`, `璧`, `大`, `惨`, `事`). Each subset < 30 KB.
- Time-to-interactive on mid-tier mobile < 2 s on a warm cache.
- The cat SVGs are inlined (one per pose, ~2 KB each) — no network round-trip on pose change.

---

## 13. Milestones

A workshop-friendly path. Each milestone is independently demoable.

1. **Skeleton** — Vite + React + TS scaffold, palette tokens, font loading, the wordmark on a paper background. *No game yet.*
2. **Pure core** — `game/` module with reducer, selectors, word list, full unit-test coverage. *No UI yet — verified via tests.*
3. **Playable game (ugly)** — wire reducer to a minimal `GameScreen` with plain `<button>` keys and underscores. End-to-end win/loss works.
4. **Cat & motion** — drop in the seven SVG poses, the branch, leaf fall, letter fade. Reduced-motion path.
5. **Polish & copy** — title, win, loss screens; full lexicon; vermilion pulse; ARIA live region.
6. **Audio (optional)** — wire Howler with mute toggle.
7. **Accessibility & perf pass** — contrast script, Playwright suite, font subsetting, bundle audit.

A workshop participant should be able to ship M1–M3 in a session and take M4+ as homework.

---

## 14. Open Questions

- **Word list size.** 600 is a guess — should grow with playtesting. The 1/8 bonus rate is also a feel decision; consider exposing as a `?bonus=` query param during the workshop for tuning.
- **Mobile keyboard layout.** On touch, do we use a 7-wide compact grid or the QWERTY layout from desktop? `design.md` doesn't specify. Default to QWERTY for muscle memory; revisit after first device test.
- **Hint button?** Out of scope, but if added it should cost a guess and the cat should disapprove visibly. Not in v1.
- **Daily puzzle / shareable result.** Tempting but pulls in a backend or a date-seeded RNG + spoiler-safe share string. Defer.

---

*— tech spec, v0.1, paired with design v0.1*
