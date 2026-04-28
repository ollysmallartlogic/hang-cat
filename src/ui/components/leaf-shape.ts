export const MOMIJI_LEAF_PATH =
  'M 0 -7 L 3 -2 L 8 -3 L 4 2 L 8 7 L 2 5 L 0 10 L -2 5 L -8 7 L -4 2 L -8 -3 L -3 -2 Z';

export interface BranchLeafAnchor {
  x: number;
  y: number;
}

export const BRANCH_LEAF_ANCHORS: ReadonlyArray<BranchLeafAnchor> = [
  { x: 60, y: 32 },
  { x: 120, y: 32 },
  { x: 180, y: 32 },
];
