import type { SVGProps } from 'react';

export function Pose1_OnePawSlipping(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="var(--sumi)"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>A cat dangling from a branch, one paw slipping, head tilting in mild interest.</title>
      <g strokeWidth="3.5">
        {/* One paw still gripping firmly, the other beginning to drift inward */}
        <path d="M86 6 C 84 22, 82 38, 84 54" />
        <path d="M114 6 C 110 22, 106 36, 102 50" />
        {/* Head tilted slightly right, body underneath */}
        <path d="M82 56 C 60 62, 58 86, 70 104 C 60 128, 78 160, 106 162 C 134 162, 148 134, 138 108 C 148 88, 140 60, 120 56 C 116 54, 112 54, 108 54" />
        {/* Tilted ears */}
        <path d="M82 54 L 76 40 L 92 52" />
        <path d="M118 50 L 124 38 L 110 48" />
        {/* Tail relaxed */}
        <path d="M138 134 C 156 132, 160 116, 148 106" />
      </g>
      <g strokeWidth="2.4">
        {/* Eyes — slight tilt, one cocked */}
        <path d="M84 80 q 5 -3 10 0" />
        <path d="M114 76 q -5 -3 -10 0" />
        <path d="M100 90 v 4" />
        <path d="M97 96 q 3 3 6 0" />
        <path d="M78 92 l -10 -2" />
        <path d="M78 96 l -10 2" />
        <path d="M122 88 l 10 -2" />
        <path d="M122 92 l 10 2" />
      </g>
    </svg>
  );
}
