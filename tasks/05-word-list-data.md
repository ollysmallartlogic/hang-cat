# 05 — Word list data files

- **Milestone:** M2 — Pure core
- **Status:** done
- **Depends on:** 01
- **Spec refs:** design.md §6 (Word List), tech-spec.md §5 (Word List)

## Goal

Curate the two JSON word lists the game ships with. This is hand-work, not code: the curation **is** the deliverable.

## Deliverables

- `src/data/words.standard.json` — an array of ~600 uppercase 4–9 letter common English words.
  - Seeded by filtering `dwyl/english-words` to length 4–9 and `^[A-Z]+$` after uppercasing.
  - Manually pruned: no proper nouns, no archaic words, no words requiring cultural knowledge, no offensive words.
- `src/data/words.bonus.json` — the cat-flavoured list from design.md §6 verbatim, plus reasonable extensions:
  - `WHISKER, PURRING, KITTEN, MITTENS, CATNIP, PROWL, POUNCE, TABBY, CALICO, SAUCER, SUSHI, BONITO, …`
- Both files: plain JSON `string[]`, uppercase, no duplicates within or across.

## Acceptance criteria

- [ ] `words.standard.json` has between 400 and 800 entries (target ~600).
- [ ] Every entry matches `^[A-Z]{4,9}$`.
- [ ] No overlap between the two files.
- [ ] No proper nouns, contractions, hyphenated words, or words containing diacritics.
- [ ] A spot-check of 20 random entries from `words.standard.json` reads as "common, plausible at a relaxed game" — nothing requiring a dictionary.

## Notes

- This is the most subjective task in the spec. Err on the side of **easier**, not harder — the game is meant to be cosy.
- Spell-check the file. A typo in a word list is uniquely embarrassing.
- Task 06 will fail-fast on any of these rules being broken — but the human curation pass is the point.
