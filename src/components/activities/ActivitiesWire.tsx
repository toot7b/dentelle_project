"use client";

import React from "react";

interface ActivitiesWireProps {
  wireRef?: React.RefObject<SVGPathElement | null>;
}

export const WIRE_POSITIONS = [
  { xPercent: 20, top: 76 },
  { xPercent: 50, top: 96 },
  { xPercent: 80, top: 76 },
];

export default function ActivitiesWire({ wireRef }: ActivitiesWireProps) {
  return (
    <svg
      viewBox="-15 -5 1030 70"
      className="w-full"
      style={{ height: 120 }}
      fill="none"
    >
      {/* Shadow wire */}
      <path
        d="M 0,9.5 Q 500,53.5 1000,9.5"
        stroke="rgba(44, 26, 14, 0.15)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Main wire */}
      <path
        ref={wireRef}
        d="M 0,8 Q 500,52 1000,8"
        stroke="#5C3D26"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="1002"
        strokeDashoffset="1002"
      />

      {/* Specular highlight */}
      <path
        d="M 0,7.2 Q 500,51.2 1000,7.2"
        stroke="rgba(254, 245, 235, 0.35)"
        strokeWidth="0.7"
        strokeLinecap="round"
      />

      {/* Left nail */}
      <circle cx="0" cy="8" r="5" fill="#FEF5EB" stroke="#5C3D26" strokeWidth="1.5" />
      <circle cx="0" cy="8" r="3" fill="#5C3D26" />
      <circle cx="0" cy="8" r="1.5" fill="#C2AE4C" />

      {/* Right nail */}
      <circle cx="1000" cy="8" r="5" fill="#FEF5EB" stroke="#5C3D26" strokeWidth="1.5" />
      <circle cx="1000" cy="8" r="3" fill="#5C3D26" />
      <circle cx="1000" cy="8" r="1.5" fill="#C2AE4C" />
    </svg>
  );
}
