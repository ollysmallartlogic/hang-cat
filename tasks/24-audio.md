# 24 — `useAudio` + Howler integration

- **Milestone:** M6 — Audio (optional)
- **Status:** todo
- **Depends on:** 08
- **Spec refs:** design.md §8 (Sound), tech-spec.md §8 (Audio)

## Goal

Optional, off-by-default ambient + SFX that respects libraries and never auto-plays.

## Deliverables

- Add `howler` to dependencies.
- `src/audio/sfx.ts`:
  - `Howl` instances for: `tok` (letter reveal), `fmm` (wrong guess), `koto` (win), `furin` (loss / wind chime ambient).
  - `getMuted(): boolean`, `setMuted(v: boolean): void` — backed by `localStorage` key `hang-cat:muted`, default `true`.
- `src/ui/hooks/useAudio.ts`:
  - Returns `{ muted, toggleMuted, play(name) }`.
  - `play(name)` is a no-op when muted.
  - First user interaction primes Howler (iOS unlock).
- Source `.webm` + `.mp3` fallbacks in `src/audio/assets/`. Total payload < 200 KB.
- Wire `play('tok')` from `WordSlots` letter reveals (correct guesses only).
- Wire `play('fmm')` from `LeafFall` mounts.
- Wire `play('koto')` and `play('furin')` from win/loss screen mounts.
- Audio toggle (small speaker icon) on the title screen, persisted across sessions.

## Acceptance criteria

- [ ] Game is fully playable with no sound (default state).
- [ ] Toggling on plays the expected SFX at the expected events.
- [ ] No sound auto-plays on page load even with the toggle on (browser autoplay rules respected).
- [ ] Mute state persists across reloads.
- [ ] Total audio payload, gzipped, < 200 KB.
- [ ] The cat itself does not meow. Anywhere. Ever.

## Notes

- Source the *fūrin* and shōgi-tok sounds from a CC0 / royalty-free library; document the source in a `src/audio/CREDITS.md`.
- Keep volumes conservative — ambient at -24 dB per design.md §8.
