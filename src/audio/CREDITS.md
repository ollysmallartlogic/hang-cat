# Audio credits

The current files in `assets/` are **placeholder synthesised tones**, generated
by `scripts/generate-placeholder-audio.mjs`. They are deliberately quiet and
short so the wiring can be verified end-to-end, but they are not the final
sound design.

Before public release, replace each with a CC0 / royalty-free source matching
the brief in `design.md` §8:

| File        | Brief                                                                    |
|-------------|--------------------------------------------------------------------------|
| `tok.wav`   | A single soft *tok* — wood on wood, like a shōgi piece being placed.     |
| `fmm.wav`   | A low, dry *fmm*. Not a buzzer. Played on wrong guesses (leaf detach).   |
| `koto.wav`  | One note on a kalimba or koto. Major third. Played on win.               |
| `furin.wav` | A wind chime *fūrin*, struck once. Played on loss.                       |

Suggested public-domain sources:

- [Freesound](https://freesound.org/) — filter by CC0 license. Search terms:
  `shogi piece`, `wood click`, `kalimba single note`, `wind chime fuurin`.
- [BBC Sound Effects](https://sound-effects.bbcrewind.co.uk/) — RemArc licence
  permits non-commercial use; check terms before shipping commercially.
- Recordings made in-house and explicitly dedicated to CC0.

When replacing, keep the loaded total under 200 KB and prefer `.webm` (Opus)
with a `.mp3` fallback for older Safari builds. Update `src/audio/sfx.ts` to
point at the new files and bump their `format` array accordingly.
