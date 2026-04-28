import type { SVGProps } from 'react';

export function Pose2_WhiskersFlatten(props: SVGProps<SVGSVGElement>) {
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
      <title>A cat dangling from a branch, whiskers flattening in measured concern.</title>
      <g strokeWidth="3.5">
        {/* Both paws still on branch, body sagging slightly lower */}
        <path d="M86 6 C 84 22, 84 40, 86 56" />
        <path d="M114 6 C 116 22, 116 40, 114 56" />
        <path d="M86 58 C 64 64, 60 90, 72 108 C 60 132, 80 166, 108 166 C 136 164, 150 136, 138 110 C 148 88, 142 60, 122 56 C 120 56, 118 56, 116 56" />
        <path d="M84 54 L 80 38 L 94 50" />
        <path d="M118 54 L 122 38 L 108 50" />
        <path d="M138 138 C 154 138, 158 122, 148 110" />
      </g>
      <g strokeWidth="2.4">
        {/* Eyes — eyebrows flat, slight squint */}
        <path d="M82 78 l 12 0" />
        <path d="M118 78 l -12 0" />
        <path d="M86 84 q 4 -2 8 0" />
        <path d="M114 84 q -4 -2 -8 0" />
        {/* Nose + tight mouth */}
        <path d="M100 92 v 4" />
        <path d="M96 98 l 8 0" />
        {/* Whiskers swept back & flattened against the cheek */}
        <path d="M78 94 l -10 4" />
        <path d="M78 98 l -10 6" />
        <path d="M122 94 l 10 4" />
        <path d="M122 98 l 10 6" />
      </g>
    </svg>
  );
}
