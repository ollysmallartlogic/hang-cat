import type { SVGProps } from 'react';

export function Pose6_Landed(props: SVGProps<SVGSVGElement>) {
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
      <title>A cat sitting in a pile of momiji leaves, grooming a paw as if nothing happened.</title>
      {/* A few momiji leaves in matcha around the cat */}
      <g stroke="var(--matcha)" strokeWidth="2">
        <path d="M40 178 l 6 -6 l -2 -8 l 8 4 l 6 -6 l -2 8 l 6 6 l -8 0 l -4 8 l -4 -8 z" />
        <path d="M150 176 l 6 -6 l -2 -8 l 8 4 l 6 -6 l -2 8 l 6 6 l -8 0 l -4 8 l -4 -8 z" />
        <path d="M120 184 l 4 -4 l -1 -5 l 5 2 l 4 -4 l -1 5 l 4 4 l -5 0 l -3 5 l -3 -5 z" />
      </g>
      <g strokeWidth="3.5">
        {/* Round seated body */}
        <path d="M70 156 C 56 146, 56 124, 70 114 C 64 96, 86 80, 108 84 C 132 86, 146 104, 140 122 C 152 134, 148 156, 132 162 C 110 168, 88 166, 70 156" />
        {/* Ears */}
        <path d="M78 96 L 72 80 L 92 92" />
        <path d="M126 92 L 134 78 L 116 88" />
        {/* Front paws on the ground, one raised mid-groom */}
        <path d="M82 158 C 78 168, 76 176, 80 180" />
        <path d="M128 154 C 134 162, 134 172, 128 176" />
        {/* Raised paw across the chest, grooming */}
        <path d="M104 132 C 112 124, 122 122, 130 124" />
        {/* Tail wrapped around the side */}
        <path d="M146 148 C 162 142, 168 124, 156 110" />
        {/* Ground line — leaves rest on this */}
        <path d="M30 178 C 80 174, 130 178, 178 174" />
      </g>
      <g strokeWidth="2.4">
        {/* Eyes — closed contented half-moons */}
        <path d="M86 110 q 5 -3 10 0" />
        <path d="M114 110 q -5 -3 -10 0" />
        <path d="M100 118 v 4" />
        <path d="M97 124 q 3 3 6 0" />
        <path d="M78 122 l -10 -2" />
        <path d="M78 126 l -10 2" />
        <path d="M122 122 l 10 -2" />
        <path d="M122 126 l 10 2" />
      </g>
    </svg>
  );
}
