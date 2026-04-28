# 06 — Word list build-time validation

- **Milestone:** M2 — Pure core
- **Status:** done
- **Depends on:** 05
- **Spec refs:** tech-spec.md §5 (Word List → Build-time validation)

## Goal

Make a malformed word list fail the build, not surface in production.

## Deliverables

- `scripts/validate-words.ts` — a Node script that loads both JSON files and asserts:
  - Every entry matches `^[A-Z]{4,9}$`.
  - No duplicates within a list.
  - No overlap between lists.
  - No entries on a small embarrassment denylist (start with a handful; grow as needed).
- `package.json`:
  - `"prebuild": "tsx scripts/validate-words.ts"` (or equivalent runner).
  - Optional: `"validate:words"` script for ad-hoc runs.
- Script exits non-zero with a clear diagnostic on the first failure.

## Acceptance criteria

- [ ] `pnpm build` runs the validator first; a malformed JSON file fails the build.
- [ ] Inserting a duplicate, a lowercase entry, or a 3-letter word causes the script to exit 1 with a message naming the offending entry.
- [ ] Script runs in under 500 ms on the full list.
- [ ] No runtime dependencies — the script is build-tooling only and not bundled into `dist/`.

## Notes

- Use `tsx` or `node --import tsx` rather than ts-node to keep deps minimal.
- The denylist is for embarrassments, not censorship. Keep it short and obvious; don't try to be exhaustive.
