# 14 — Seven cat SVG poses

- **Milestone:** M4 — Cat & motion
- **Status:** done
- **Depends on:** 02
- **Spec refs:** design.md §3 (The Cat), tech-spec.md §12 (Performance)

## Goal

Author the seven cat poses described in design.md §3 as inline SVG assets ready for `CatScene` to swap between.

## Deliverables

- `src/ui/components/cat-poses/` containing seven `.tsx` files (or one file exporting seven components):
  - `Pose0_HangingConfidently`
  - `Pose1_OnePawSlipping`
  - `Pose2_WhiskersFlatten`
  - `Pose3_HindLegsKick`
  - `Pose4_OnePawOnly`
  - `Pose5_MidFall`
  - `Pose6_Landed`
- Each pose:
  - A single `<svg viewBox="0 0 200 200">` (or consistent size) with `<title>` text matching the description from design.md §3 ("a cat dangling from a branch by both paws", etc.).
  - Drawn as a single brushstroke where possible — `<path>` elements with `stroke="var(--sumi)"`, `fill="none"`, `stroke-linecap="round"`.
  - The "wobble of the line is the charm" — don't over-clean.
  - Each ≤ 2 KB after gzip (per tech-spec.md §12).
- The cat itself is a self-contained SVG group; the **branch** is rendered separately by `CatScene` (task 15) so leaves can detach independently.

## Acceptance criteria

- [ ] All seven poses authored.
- [ ] Each has a `<title>` describing the pose in plain English (used by screen readers).
- [ ] Stroke colour is `var(--sumi)` — not a hex literal.
- [ ] Cat is never visibly distressed, even in poses 5 and 6 — keep the deadpan.
- [ ] All seven render cleanly at 96px, 256px, and 512px without artefacts.

## Notes

- This is the most artistic task in the spec. Budget a real session for it.
- If hand-authoring SVG by hand is painful, a tablet sketch → SVG export → manual cleanup is fair game. Just keep file size honest.
- Pose 6 (landed in leaves) — the leaves drawn as part of pose 6 are fine; the *falling* leaves during play are task 16's job.
