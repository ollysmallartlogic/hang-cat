import type { SVGProps } from 'react';

export function Pose3_HindLegsKick(props: SVGProps<SVGSVGElement>) {
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
      <title>A cat dangling from a branch, hind legs kicking out, undignified but composed.</title>
      <g strokeWidth="3.5">
        <path d="M86 6 C 84 22, 84 40, 86 56" />
        <path d="M114 6 C 116 22, 116 40, 114 56" />
        <path d="M86 58 C 64 64, 60 90, 72 108 C 60 132, 80 166, 108 166 C 136 164, 150 136, 138 110 C 148 88, 142 60, 122 56 C 120 56, 118 56, 116 56" />
        <path d="M84 54 L 80 38 L 94 50" />
        <path d="M118 54 L 122 38 L 108 50" />
        {/* Hind legs kicking out left and right */}
        <path d="M82 156 C 64 162, 50 168, 38 162" />
        <path d="M124 156 C 142 162, 158 168, 168 158" />
        {/* Tail flicked up */}
        <path d="M138 132 C 156 128, 162 108, 150 96" />
      </g>
      <g strokeWidth="2.4">
        {/* Eyes — slightly wider, still composed */}
        <path d="M86 80 q 5 -4 10 0" />
        <path d="M114 80 q -5 -4 -10 0" />
        <path d="M100 90 v 4" />
        <path d="M97 96 q 3 3 6 0" />
        <path d="M78 92 l -10 -2" />
        <path d="M78 96 l -10 2" />
        <path d="M122 92 l 10 -2" />
        <path d="M122 96 l 10 2" />
      </g>
    </svg>
  );
}
