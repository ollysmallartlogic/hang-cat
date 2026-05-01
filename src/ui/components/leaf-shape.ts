export const MOMIJI_LEAF_PATH =
  'M 0 -7 L 3 -2 L 8 -3 L 4 2 L 8 7 L 2 5 L 0 10 L -2 5 L -8 7 L -4 2 L -8 -3 L -3 -2 Z';

export interface BranchLeafAnchor {
  x: number;
  y: number;
}

// One anchor per life. The branch shows only the trailing slice of these
// (those with index >= wrongLetters.length), so the visible leaf count
// equals remainingGuesses. Spaced along the branch curve with a slight drape
// at the ends to feel hand-placed rather than a row of dots.
export const BRANCH_LEAF_ANCHORS: ReadonlyArray<BranchLeafAnchor> = [
  { x: 30, y: 36 },
  { x: 72, y: 30 },
  { x: 108, y: 28 },
  { x: 146, y: 28 },
  { x: 184, y: 30 },
  { x: 218, y: 36 },
];
