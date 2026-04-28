# 20 — `TitleScreen` + `Wordmark`

- **Milestone:** M5 — Polish & copy
- **Status:** done
- **Depends on:** 03
- **Spec refs:** design.md §2 (Typography), §4.1 (Title Screen), tech-spec.md §7 (Screens)

## Goal

The first screen the player sees: wordmark, two quiet options, a cat washing its paw.

## Deliverables

- `src/ui/components/Wordmark.tsx`:
  - "HANG CAT" — 48pt Shippori Mincho, letter-spaced +40, in `--sumi`.
  - "吊り猫" — 18pt vertical, set to the right of the English title.
  - "a word game" — 12pt italic small-caps in `--usu-zumi` underneath.
- `src/ui/screens/TitleScreen.tsx`:
  - Centred wordmark with generous *ma* (whitespace) around it.
  - A small still illustration (a static paw-washing cat — can reuse pose 6 cropping or author a new SVG inline; can be deferred to a follow-up if scope is tight, but reserve the layout slot).
  - Two options, set quietly in small caps:
    - `BEGIN` — `(新しい遊戯)` parenthetical.
    - `HOW TO PLAY` — `(遊び方)` parenthetical (can be a no-op link for v1; flag as follow-up).
  - A faint seigaiha pattern at the bottom edge fading up into paper. Implement as an inline SVG `<pattern>` filled in `--nezumi` at 8% opacity, masked with a CSS gradient.
  - On `BEGIN` click, the App-level state machine transitions to `'game'`.

## Acceptance criteria

- [ ] Wordmark uses the exact hierarchy from design.md §2.
- [ ] Mincho renders without FOUT (font-display: optional from task 03 in effect).
- [ ] Tab focus visits `BEGIN` then `HOW TO PLAY` then the audio toggle (if present from task 24).
- [ ] Seigaiha is decorative — `aria-hidden="true"` on the SVG.
- [ ] No vermilion appears on this screen — it has no semantic role here.

## Notes

- The Japanese text is signature, not translation. Don't add `lang="ja"` and certainly don't try to translate the wordmark.
- "How to play" content is out of scope for v1; the link can route to a stub page or a `<dialog>` reading "soon. the cat is busy." The deferral is fine.
