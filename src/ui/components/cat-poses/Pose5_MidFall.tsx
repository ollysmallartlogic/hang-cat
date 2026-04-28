import type { SVGProps } from 'react';

export function Pose5_MidFall(props: SVGProps<SVGSVGElement>) {
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
      <title>A cat mid-fall, limbs splayed, expression of mild surprise.</title>
      <g strokeWidth="3.5">
        {/* Body in middle of viewbox, drifting, no longer attached */}
        <path d="M70 96 C 56 106, 56 126, 68 138 C 60 158, 84 178, 108 174 C 134 170, 150 148, 142 128 C 154 112, 146 90, 126 88 C 100 84, 80 88, 70 96" />
        {/* Front paws splayed out up + sideways */}
        <path d="M82 92 C 70 78, 60 66, 52 60" />
        <path d="M124 86 C 132 70, 142 58, 152 54" />
        {/* Hind legs kicked out below */}
        <path d="M82 168 C 70 180, 56 184, 46 178" />
        <path d="M132 166 C 144 178, 158 184, 168 176" />
        {/* Ears */}
        <path d="M76 96 L 68 84 L 86 92" />
        <path d="M122 88 L 130 76 L 114 86" />
        {/* Tail trailing upward */}
        <path d="M148 130 C 168 122, 178 108, 174 92" />
      </g>
      <g strokeWidth="2.4">
        {/* Eyes — wide circles, mildly surprised */}
        <circle cx="86" cy="116" r="4" />
        <circle cx="118" cy="112" r="4" />
        {/* Small "o" mouth */}
        <ellipse cx="102" cy="132" rx="3" ry="4" />
        {/* A few whiskers */}
        <path d="M76 124 l -10 -2" />
        <path d="M76 128 l -10 4" />
        <path d="M128 120 l 10 -2" />
        <path d="M128 124 l 10 2" />
      </g>
    </svg>
  );
}
