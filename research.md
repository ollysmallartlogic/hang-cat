# Hangman: Research Notes

Background research for the **hang-cat** workshop project. Compiled from three parallel research passes covering rules & history, strategy & word lists, and software implementation patterns.

> Note: the rules & history section was produced without live web access; sources are listed but should be verified before any external publication.

---

## Part 1 — Rules and History

### History and Origins

Hangman is a paper-and-pencil guessing game whose origins are usually traced to **Victorian-era Britain**. The earliest documented description appears in **Alice Bertha Gomme's *The Traditional Games of England, Scotland, and Ireland* (1894)**, where it is recorded under the name **"Birds, Beasts, and Fishes"** — a version in which players guessed the letters of a word drawn from one of those categories rather than drawing a gallows. Gomme's collection is generally regarded as the first scholarly reference to the game in print.

The macabre gallows imagery, and the name "Hangman," appears to have emerged in the late 19th or early 20th century, with the modern format becoming firmly established in 20th-century schoolyards. Commercial versions followed — most notably **Milton Bradley's "Hangman"** (1976), and the related televised word-guessing format **Wheel of Fortune** (1975), which borrows the core mechanic of revealing letters in a hidden phrase.

### Standard Rules

Hangman is played by **two or more players** in two roles:

- **The chooser (or "host")** picks a secret word or phrase and draws a row of dashes representing each letter.
- **The guesser (or guessers)** attempt to identify the word by suggesting one letter at a time.

**Turn structure**: on each turn the guesser names a letter. If the letter appears in the word, the chooser writes it into every matching position. If it does not, the chooser records a wrong guess by adding one element to the hangman drawing.

**Win/loss conditions**:
- The guesser **wins** by revealing every letter (or correctly guessing the entire word) before the figure is fully drawn.
- The guesser **loses** if the figure is completed first.

### Game Mechanics

- **Word selection**: typically a single word, though phrases, names, or titles are common variants. Difficulty is governed by length, letter frequency (uncommon letters like J, Q, X, Z make words harder), and obscurity.
- **Guessing letters vs. whole word**: guessers may attempt the **entire word** on their turn. A correct full-word guess wins immediately; an incorrect one usually counts as a wrong guess (some house rules treat it as an automatic loss).
- **Tracking wrong guesses**: incorrect letters are written off to the side so they aren't repeated. Repeating a previously guessed letter is generally disallowed.

### The Hangman Drawing

**Six wrong guesses** is the most common limit, though versions ranging from **5 to 13** are well documented. A typical six-part sequence is:

1. Head
2. Body (torso)
3. Left arm
4. Right arm
5. Left leg
6. Right leg

Many versions extend the count by first drawing the **gallows itself** stroke by stroke (base, vertical post, horizontal beam, brace, noose) before the body is added — pushing the allowed wrong guesses up to 10–13. Optional additions include facial features, hands, feet, hair, or a hat, which the chooser may declare in advance.

### Variations

- **Snowman / "Build-a-Snowman"**: family-friendly alternative in which wrong guesses build a snowman instead of a hanged figure. Widely used in classrooms.
- **Category Hangman**: the chooser announces a category (Animals, Movies, Countries) before play. The format used by Wheel of Fortune and by Gomme's original "Birds, Beasts, and Fishes."
- **Phrase / Sentence Hangman**: the secret is a multi-word phrase, with spaces shown between word groups.
- **Evil Hangman / Adversarial Hangman**: the computer doesn't commit to a word up front, dynamically choosing whichever word keeps the most possibilities alive — provably harder than honest play.
- **Reverse Hangman**: the guesser picks the word and the chooser tries to deduce it.
- **Vowel-cost variants**: vowels cost a "life" or must be purchased, encouraging consonant-first strategy.

---

## Part 2 — Strategy and Word Lists

### Letter Frequency in English

The most common letters in standard English text follow roughly **E, T, A, O, I, N, S, H, R, D, L, U** — often memorized as "ETAOIN SHRDLU" (a phrase from the layout of Linotype typesetting machines). E alone accounts for roughly 12–13% of letters in typical prose; T is around 9%; A, O, I, N each near 7–8%.

Crucially, frequency in *running text* differs from frequency in *dictionary words*. In dictionary lookups, **S** rises sharply (plurals, S-clusters), while **A, E, I** remain dominant. Smart Hangman play weights picks toward dictionary frequencies rather than prose frequencies.

### Optimal Strategy for the Guesser

A classic opening is to guess vowels first — **E, A, I, O** — since most English words contain at least one. After vowels, high-value consonants like **R, S, T, L, N** follow (the Wheel of Fortune bonus-round letters, picked for exactly this reason).

More sophisticated play uses **conditional frequency**: once word length and a few letters are known, pick the letter most common among *remaining candidate words*, not the most common letter overall. Jon McLoone's *25 Best Hangman Words* (Wolfram Blog, 2010) demonstrates this with a solver that filters a dictionary by pattern after each guess. For example, a 3-letter word `_OO` makes **T** (TOO) and **Z** (ZOO) far more likely than raw frequency suggests.

Word length itself is a strong signal: short words (2–4 letters) draw from a small set, while long words almost always contain common suffixes like -ING, -TION, -ED, -LY.

### Optimal Strategy for the Word-Chooser

To stump a guesser:

- Use **rare letters**: J, Q, X, Z, K, V.
- Pick **short words** — they give fewer pattern clues. A 4-letter word reveals far less structure than a 12-letter one.
- Choose words with **repeated rare letters** (JAZZ, FUZZ) so a single missed letter doesn't open up multiple positions.
- Avoid common suffix/prefix structures.

### Hardest Words in Hangman

McLoone's Wolfram analysis (2010) computer-tested every dictionary word against an optimal frequency-based guesser. The hardest words clustered around short words dense in low-frequency letters with repeats: **JAZZ, BUZZ, FLUFF, BUFF, FUZZ, GYP, HAJJ, KAYAK**. **JAZZ** is frequently cited as the single hardest common word, defeating optimal solvers in roughly 50%+ of trials. Nick Berry's *A Better Strategy for Hangman* (DataGenetics) reaches similar conclusions.

### Word Lists and Sources

Common thematic categories: **animals, countries, capitals, movies, foods, sports, occupations, household objects** — chosen because players have strong category priors that make the game fair.

Standard developer sources:

- **`/usr/share/dict/words`** on Unix/macOS (~235k entries).
- **SCOWL** (Spell Checker Oriented Word Lists) — wordlist.aspell.net.
- **dwyl/english-words** on GitHub (~466k words, public domain).
- **Project Gutenberg** dictionaries; **Moby word lists** (Grady Ward, public domain).
- **Wiktionary frequency lists** for category-specific or frequency-tiered words.

For digital Hangman, developers typically filter by length (4–12 letters), strip proper nouns, and curate by commonness so players aren't asked to guess obscure technical terms.

---

## Part 3 — Implementation Notes (for the hang-cat workshop)

### Why Hangman Is a Popular Coding Exercise

Hangman packages many fundamental concepts into a small, well-bounded problem. A learner must coordinate **state management** (what's been guessed, lives remaining), **input handling and validation** (single characters, rejecting bad input), **string manipulation** (masking unguessed letters, comparing characters), and a **game loop** (prompt → evaluate → update → render → check end). The rules are universally familiar, so students spend cognitive energy on the code rather than the domain. It also scales gracefully: a beginner can ship a CLI version in an hour, while an intermediate developer can extend it into a full-stack app with persistence, multiplayer, and animations.

### Core Data Model

A typical hangman state object tracks:

- `targetWord: string` — the secret word (often normalized to uppercase)
- `guessedLetters: Set<string>` — every letter the player has tried
- `correctLetters: Set<string>` — intersection of guesses and target
- `incorrectLetters: Set<string>` — guesses not in the target
- `remainingAttempts: number` — typically 6 (one per body part)
- `status: 'in_progress' | 'won' | 'lost'`

Derived values like the masked display (`_ A _ _ _`) and `isWon` should be **computed**, not stored, to avoid state drift.

### Typical UI Representations

- **CLI**: underscores for unguessed letters, a list of wrong guesses, an ASCII-art gallows that grows with each miss.
- **Web/GUI**: SVG or canvas drawings (or, for hang-cat, perhaps a cat being progressively revealed/hidden), an on-screen keyboard with disabled keys for used letters, animated win/lose states.
- **Accessibility**: ARIA live regions announcing letter reveals and remaining lives are a frequent enhancement.

### Common Architectural Patterns

The dominant pattern is **separation of pure game logic from presentation**. A `game.ts` module exports pure functions like `makeGuess(state, letter): State` and `isGameOver(state): boolean`. The UI layer (React component, Express handler, CLI renderer) calls these functions and renders the result.

- In **MVC**, the model is the state object, the view renders it, the controller handles input.
- In **React/component-based UIs**, state lives in a `useReducer` or store (Zustand, Redux), with the reducer being the same pure function.
- In a **full-stack** setup, game state may live server-side with a REST/WebSocket API, allowing shared games and preventing client-side cheating by hiding the target word.

### Edge Cases and Validation

- **Repeat guesses**: don't decrement lives; show a friendly message.
- **Case sensitivity**: normalize both target and input to one case.
- **Non-letter input**: reject digits, punctuation, multi-character input.
- **Words with hyphens/spaces**: pre-reveal these characters in the mask.
- **Unicode/diacritics**: decide whether `é` matches `e` (NFD normalize + strip combining marks is a common approach).
- **Empty or single-letter words**: validate the word list at load time.

### Testing Considerations

The core is pure functions over a serializable state, making it an excellent unit-testing target. Key cases:

- Correct guess reveals letter and preserves attempts.
- Incorrect guess decrements attempts and records the letter.
- Repeat guess is a no-op (no state change, no life lost).
- Game transitions to `won` when all letters revealed.
- Game transitions to `lost` when attempts hit zero.
- Guesses after game-over are rejected.
- Input validation rejects invalid characters.
- Snapshot tests for the masked-display string.

For full-stack variants, add **integration tests** for API endpoints and **E2E tests** (Playwright/Cypress) covering keyboard interaction and win/lose UI states.

---

## Sources

- Wikipedia, *Hangman (game)* — https://en.wikipedia.org/wiki/Hangman_(game)
- Alice Bertha Gomme, *The Traditional Games of England, Scotland, and Ireland* (1894) — entry on "Birds, Beasts, and Fishes."
- Milton Bradley, *Hangman* board game (1976).
- Wikipedia, *Letter frequency*.
- Jon McLoone, *25 Best Hangman Words* — Wolfram Blog (2010).
- Nick Berry, *A Better Strategy for Hangman* — DataGenetics.
- Cornell Math Explorer's Club — letter-frequency tables.
- SCOWL / Aspell documentation — wordlist.aspell.net.
- `dwyl/english-words` — GitHub.
