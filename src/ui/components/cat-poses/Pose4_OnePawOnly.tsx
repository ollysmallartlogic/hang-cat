import type { SVGProps } from 'react';

export function Pose4_OnePawOnly(props: SVGProps<SVGSVGElement>) {
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
      <title>A cat dangling by a single paw, eyes wide, finally taking this seriously.</title>
      <g strokeWidth="3.5">
        {/* Single paw still on the branch — the other has let go and dangles */}
        <path d="M100 6 C 100 22, 100 42, 102 60" />
        <path d="M120 60 C 130 80, 138 100, 132 116" />
        {/* Body shifted right, hanging from one paw */}
        <path d="M102 62 C 84 70, 80 96, 92 116 C 84 138, 102 168, 128 168 C 154 166, 168 140, 156 116 C 166 92, 158 66, 138 62 C 132 60, 126 60, 120 60" />
        <path d="M102 60 L 96 46 L 112 58" />
        <path d="M138 60 L 144 46 L 128 56" />
        {/* Tail straight down, alert */}
        <path d="M158 138 C 168 152, 168 166, 158 174" />
      </g>
      <g strokeWidth="2.4">
        {/* Eyes — wide open circles */}
        <circle cx="106" cy="84" r="4" />
        <circle cx="134" cy="84" r="4" />
        <path d="M120 94 v 4" />
        <path d="M117 100 q 3 3 6 0" />
        <path d="M98 96 l -10 -2" />
        <path d="M98 100 l -10 2" />
        <path d="M142 96 l 10 -2" />
        <path d="M142 100 l 10 2" />
      </g>
    </svg>
  );
}
