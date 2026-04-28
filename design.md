# Hang Cat — Design Document

> **吊り猫** *(tsuri neko)* — "the dangling cat"
>
> A purr-fectly civilised word game, dressed in the quiet confidence of a Japanese studio release.

---

## 1. Concept

**Hang Cat** is hangman — but no one is being hanged. A small, dignified cat is dangling from a branch by its paws. Each wrong guess loosens its grip, one toe-bean at a time, until it slips off and lands (gracefully, as cats do) in a pile of leaves. Get the word right and the cat hops back onto the branch with a pleased little tail-flick.

The tone is **wry, not cruel**. Think the deadpan elegance of *Katamari Damacy*, the typographic restraint of *Monument Valley*, and the dry humour of a cat that has knocked your pen off the desk and is watching you, slowly, to see what you'll do about it.

### Pillars

1. **Calm, never frantic.** No timers, no health bars flashing red. The game waits as patiently as a cat at a closed door.
2. **Witty, not silly.** Every line of copy is a cat pun, but delivered with a straight face. The humour is in the restraint.
3. **Crafted, not generic.** Hand-chosen palette, intentional typography, motion that feels *placed* rather than animated.

---

## 2. Visual Identity

### Mood Board

- **Sumi-e ink wash** — the cat and branch are drawn as if with a single brushstroke (one continuous line where possible).
- **Washi paper texture** — subtle fibrous grain on the background, never overpowering.
- **Seigaiha (青海波)** — overlapping wave pattern used sparingly as section dividers.
- **Negative space** — large, deliberate emptiness. The Japanese principle of *ma* (間): the pause is part of the composition.
- **Slight off-register print feel** — like a risograph or woodblock print, where colour layers don't quite line up. Adds warmth.

### Colour Palette

A muted, paper-and-ink palette with one accent. No pure black, no pure white.

| Role             | Name              | Hex       | Use                                              |
|------------------|-------------------|-----------|--------------------------------------------------|
| Paper            | *Kinari* (生成)   | `#F4EDE0` | Background. Unbleached paper.                    |
| Ink              | *Sumi* (墨)       | `#1F1B16` | Type, line art, the cat's outline.               |
| Soft ink         | *Usu-zumi* (薄墨) | `#5C544A` | Secondary text, used letters.                    |
| Tea              | *Matcha* (抹茶)   | `#7A8B5C` | Branch, foliage, "correct guess" flash.          |
| Vermilion        | *Shu-iro* (朱色)  | `#C8423C` | The single accent. Wrong-guess pulse, the torii-red of the title mark. Used sparingly enough that it always *means* something. |
| Stone            | *Nezumi* (鼠)     | `#A8A096` | Borders, dashed lines for unrevealed letters.    |

**Rule:** vermilion appears only when something matters. If the screen has more than one red element, something is wrong.

### Typography

Pairing one **serif display face** with one **clean monospace** for the puzzle itself.

- **Display / titles:** a humanist serif with calligraphic terminals — e.g. **Shippori Mincho** or **Cormorant Garamond**. Used for the wordmark, screen titles, and the cat's occasional pronouncements.
- **Body / UI:** **Inter** or **IBM Plex Sans JP** at a generous line-height (1.6+).
- **Puzzle letters:** **JetBrains Mono** or **IBM Plex Mono**, tracked out wide. Each letter slot feels like a tile of paper.
- **Japanese accents:** the wordmark pairs the English title with **吊り猫** in vertical Mincho, set to the right of "HANG CAT" — a quiet bilingual signature, not a translation.

**Hierarchy:**

```
HANG CAT          ← 48pt Shippori Mincho, letterspaced +40
吊り猫             ← 18pt vertical, set to the right
a word game       ← 12pt italic small-caps, usu-zumi
```

---

## 3. The Cat

The mascot is a single, plump, pleasingly **round** cat. Drawn in one weighted brushstroke. No outline cleanup — the wobble of the line is the charm.

- **Posture:** dangling from a branch by the front paws, hind legs swinging.
- **Expression:** unbothered. Slightly judgmental. The kind of cat that has read more of your diary than you have.
- **States (one frame each, not a full animation rig):**
  1. **Hanging confidently** — both paws gripping, tail curled.
  2. **One paw slipping** — head tilts.
  3. **Whiskers flatten** — getting concerned but won't admit it.
  4. **Hind legs kick** — undignified.
  5. **One paw only** — eyes wide, finally taking this seriously.
  6. **Mid-fall** — limbs splayed, expression of mild surprise.
  7. **Landed** — sitting in a pile of momiji leaves, grooming as if nothing happened.

The cat **never looks distressed**. The joke is that it remains composed all the way down.

### Branch

A single horizontal sumi stroke in *matcha*, with two or three momiji (maple) leaves hanging off it. The leaves drift down as the game progresses — a subtle secondary indicator of how close you are to losing.

---

## 4. Screens & Layout

### 4.1 Title Screen

- Centred wordmark. Lots of *ma* around it.
- Cat sits beneath the title, washing one paw.
- Two options, set quietly in small caps:
  - `BEGIN` (新しい遊戯)
  - `HOW TO PLAY` (遊び方)
- A faint seigaiha pattern at the bottom edge, fading up into paper.

### 4.2 Game Screen

```
┌─────────────────────────────────────────────────┐
│                                                 │
│              [ branch + cat ]                   │
│                                                 │
│        _   _   _   _   _   _   _                │
│                                                 │
│        [keyboard, used letters dimmed]          │
│                                                 │
│        used: B  G  K  Q                         │
│                                                 │
└─────────────────────────────────────────────────┘
```

- **Word slots** are dashed underlines in *nezumi*, each letter slot equally spaced. Revealed letters fade in, they do not pop.
- **Keyboard** is a soft grid of paper tiles. Hover lifts the tile by 2px with a faint shadow. Used letters lose their fill and become outline-only.
- **Used letters** also list along the bottom in *usu-zumi*, ordered as guessed. (Redundant, but the cat appreciates good record-keeping.)

### 4.3 Win Screen

The cat is back on the branch, tail high. A small line of text:

> **Purr-fect.**
> *(完璧)*

The word is shown in full, in Mincho. One *shu-iro* dot beneath, like a hanko stamp.

### 4.4 Loss Screen

The cat is in the leaves, grooming. A small line of text:

> **Cat-astrophe.**
> *(大惨事)*
>
> The word was: ___________

No "TRY AGAIN" button shouting at the player. Just a quiet `again?` link in the corner.

---

## 5. Voice & Copy

Every piece of UI copy passes through a **cat-pun filter**, but the delivery stays dry. Never exclamation marks. Never "OOPS!" Never "GAME OVER!!!"

### The Lexicon

| Where                | Copy                                                                |
|----------------------|---------------------------------------------------------------------|
| Correct letter       | *(silent — the letter just appears. The cat flicks an ear.)*        |
| Wrong letter         | *Hmm.* / *Hiss.* / *(no comment.)* — rotated, never the same twice. |
| First wrong guess    | "A minor mew-stake."                                                |
| Halfway to losing    | "Things are getting hiss-tory."                                     |
| One guess remaining  | "On thin **ice**. The cat is on thin **paws**."                     |
| Win                  | "Purr-fect."                                                        |
| Win (fast)           | "Meow-velous. Suspiciously fast."                                   |
| Win (slow, last try) | "By a whisker."                                                     |
| Loss                 | "Cat-astrophe."                                                     |
| Loss (no letters got)| "Furr-givable. Possibly."                                           |
| Repeat guess         | "Already tried. The cat remembers."                                 |
| Invalid input        | "Letters only, if you'd be so claw-nd."                             |
| Title hover          | "press to *commence*"                                               |
| Quit confirm         | "Leaving so soon? The cat will pretend not to notice."              |

### Puns We Allow

paw-some, purr-fect, meow-velous, cat-astrophe, hiss-terical, furr-midable, claw-ver, feline-fine, mew-sical, paw-sitive, fur-tunate, purr-suasive, claw-some, mew-tiny, fur-real, paw-don.

### Puns We Don't

Anything that requires explanation. If a pun needs a wink-wink, cut it. The cat does not wink.

---

## 6. Word List

The dictionary is **curated, not auto-generated**. Two tiers:

1. **Standard words** — common 4–9 letter English words, suitable for a relaxed game (the bulk of play).
2. **Cat-flavoured bonus words** — occasionally surfaces a feline-themed word for a wink: `WHISKER`, `PURRING`, `KITTEN`, `MITTENS`, `CATNIP`, `PROWL`, `POUNCE`, `TABBY`, `CALICO`, `SAUCER`, `SUSHI` (the cat would like some), `BONITO`.

Bonus words appear roughly **1 in 8 games**, never announced. The reward for noticing is the noticing itself.

Avoid: anything proper-noun, anything requiring cultural knowledge to spell, anything with apostrophes or hyphens.

---

## 7. Motion

Animation philosophy: **slow in, slow out, then stop.** Nothing bounces. Nothing wiggles for attention.

- **Letter reveal:** 240ms ease-out fade + 4px upward drift. The letter settles like it was always there.
- **Wrong guess:** the cat shifts pose with a 320ms tween. A single momiji leaf detaches from the branch and drifts down across 1.8s, real-time, regardless of what else happens. (It will still be falling when the next guess is made. This is fine.)
- **Vermilion pulse:** when only one guess remains, the word slots gain a 1px vermilion underline that pulses at 0.5Hz. Subtle. The cat is not panicking and neither is the UI.
- **Win:** the cat hops up in two frames (no easing — a deliberate hard cut, like a manga panel). The leaves on the ground swirl once and settle.
- **Loss:** a slow 600ms fall. The cat lands without a sound effect. Just the visual.

No screen shake. Ever.

---

## 8. Sound

Sound is **optional and quiet by default**. The whole game must be playable in a library.

- **Ambient:** a barely-there loop of wind and distant wind chimes (*fūrin*). -24dB.
- **Letter reveal:** a single soft *tok* — wood on wood, like a shōgi piece being placed.
- **Wrong guess:** a low, dry *fmm*. Not a buzzer.
- **Win:** one note on a kalimba or koto. Major third.
- **Loss:** the wind chime, once.
- **The cat itself never speaks.** No meows. The cat is above this.

---

## 9. Accessibility

The aesthetic must not come at the cost of usability.

- **Contrast:** all text passes WCAG AA against *kinari* paper. The vermilion accent passes AA at the sizes used.
- **Keyboard-first:** the on-screen keyboard is mirrored by the physical keyboard. Tab order is alphabetical.
- **Reduced motion:** `prefers-reduced-motion` disables the falling leaves and the vermilion pulse. The cat's pose changes are instant.
- **Screen readers:** every cat-pose change has a corresponding ARIA live announcement in plain English ("five guesses remaining"). The puns are visual flavour; the screen-reader experience is calm and clear.
- **Colourblind:** never rely on red alone. The "one guess left" state also adds the underline and the cat reaches its single-paw pose.

---

## 10. What Hang Cat Is Not

- It is not edgy. The cat is fine.
- It is not "kawaii overload." There are no sparkles, no hearts, no bouncing.
- It is not a clone of every hangman tutorial on the web with a cat skin painted over it. The visual restraint, the *ma*, the curated word list, and the dry voice are the product.
- It is not in a hurry.

---

## 11. One-Sentence Summary

> *Hang Cat* is a hangman game where a small unbothered cat dangles from a branch, the typography is set in Mincho, the only red on screen means something, and every line of copy is a cat pun delivered with a perfectly straight face.

---

*— design notes, v0.1*
