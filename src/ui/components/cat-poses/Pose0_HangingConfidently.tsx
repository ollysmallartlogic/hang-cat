import type { SVGProps } from 'react';

export function Pose0_HangingConfidently(props: SVGProps<SVGSVGElement>) {
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
      <title>A cat dangling from a branch by both paws, tail curled, unbothered.</title>
      <g strokeWidth="3.5">
        {/* Both front paws reaching up to branch */}
        <path d="M86 6 C 84 22, 82 38, 84 54" />
        <path d="M114 6 C 116 22, 118 38, 116 54" />
        {/* Head + plump body in one wobbling outline */}
        <path d="M84 54 C 64 60, 60 84, 70 102 C 60 124, 76 158, 102 162 C 132 164, 146 138, 138 110 C 148 90, 142 62, 122 56 C 120 56, 118 56, 116 56" />
        {/* Ears */}
        <path d="M82 52 L 78 38 L 92 50" />
        <path d="M118 52 L 122 38 L 108 50" />
        {/* Tail curling lazily */}
        <path d="M138 138 C 156 140, 162 124, 152 112" />
      </g>
      <g strokeWidth="2.4">
        {/* Eyes — calm closed half-moons */}
        <path d="M86 78 q 5 -3 10 0" />
        <path d="M114 78 q -5 -3 -10 0" />
        {/* Nose + mouth */}
        <path d="M100 88 v 4" />
        <path d="M97 94 q 3 3 6 0" />
        {/* Whiskers */}
        <path d="M78 90 l -10 -2" />
        <path d="M78 94 l -10 2" />
        <path d="M122 90 l 10 -2" />
        <path d="M122 94 l 10 2" />
      </g>
    </svg>
  );
}
