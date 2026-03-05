"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface ActivitiesMedallionProps {
  title: string;
  subtitle: string;
  index: number;
  disableHover?: boolean;
}

function generatePicots(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  count: number,
  picotSize: number = 4
): string[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 2 * Math.PI;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const bx = cx + rx * cos;
    const by = cy + ry * sin;
    const tx = bx + cos * picotSize;
    const ty = by + sin * picotSize;

    // Slightly pulled-in control points for sharper teardrop picots
    const cpScale = 3.0;
    const cp1x = (bx + -sin * cpScale + tx) / 2;
    const cp1y = (by + cos * cpScale + ty) / 2;
    const cp2x = (bx + sin * cpScale + tx) / 2;
    const cp2y = (by + -cos * cpScale + ty) / 2;

    return `M ${bx.toFixed(1)},${by.toFixed(1)} Q ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${tx.toFixed(1)},${ty.toFixed(1)} Q ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${bx.toFixed(1)},${by.toFixed(1)} Z`;
  });
}

export default function ActivitiesMedallion({
  title,
  subtitle,
  index,
  disableHover = false,
}: ActivitiesMedallionProps) {
  const cx = 150;
  const cy = 250;
  const rx = 120;
  const ry = 160;

  const picots = useMemo(
    () => generatePicots(cx, cy, rx, ry, 34, 6),
    [cx, cy, rx, ry]
  );

  return (
    <div
      data-medallion
      data-index={index}
      className="opacity-0 drop-shadow-md"
      style={{ transformOrigin: "top center" }}
    >
      <motion.div
        style={{ transformOrigin: "top center" }}
        {...(!disableHover && { whileHover: { rotate: 2 } })}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative" style={{ width: 300, height: 450 }}>
          {/* Background SVG for the medallion structure */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width={300}
            height={450}
            viewBox="0 0 300 450"
            fill="none"
          >
            {/* The Hook and String */}
            <path
              d={`M 145,95 Q 140,55 145,15 C 147,5 158,5 160,15 C 161,35 155,95 155,95`}
              stroke="#8B7355"
              strokeWidth={1.5}
              fill="none"
              strokeLinecap="round"
              className="drop-shadow-sm"
            />
            {/* Knot at the top of the medallion */}
            <circle cx={150} cy={95} r={4} fill="#8B7355" />

            {/* Picots (lace loops forming the outer border) */}
            <g opacity={0.9}>
              {picots.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="#E5D3B3"
                  stroke="#C2AE4C"
                  strokeWidth={0.5}
                />
              ))}
            </g>

            {/* Main Oval Body - Light cream base */}
            <ellipse
              cx={cx}
              cy={cy}
              rx={rx - 2}
              ry={ry - 2}
              fill="#FFFAF2"
              stroke="#D4BA7B"
              strokeWidth={1.5}
            />

            {/* Delicate Inner Dashed Oval */}
            <ellipse
              cx={cx}
              cy={cy}
              rx={rx - 8}
              ry={ry - 12}
              stroke="#C2AE4C"
              strokeWidth={0.8}
              strokeDasharray="4 4"
              fill="none"
              opacity={0.6}
            />

            {/* Solid thin inner oval */}
            <ellipse
              cx={cx}
              cy={cy}
              rx={rx - 13}
              ry={ry - 18}
              stroke="#E5D3B3"
              strokeWidth={1}
              fill="none"
            />
          </svg>

          {/* HTML text overlay — strictly inside the oval */}
          <div
            className="absolute flex flex-col items-center justify-center text-center overflow-hidden"
            style={{
              top: 105,
              left: 50,
              width: 200,
              height: 290,
            }}
          >
            {/* Deux fuseaux */}
            <div className="mb-7 -mt-3 opacity-80 flex justify-center items-start">
              {[0, 1].map((i) => (
                <svg key={i} width="38" height="63" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={i === 1 ? { marginLeft: "-10px" } : {}}>
                  <path d="M 12,2 Q 15,10 12,15 Q 9,10 12,2 Z" fill="#D4BA7B" />
                  <circle cx="12" cy="1" r="1.5" fill="#8B7355" />
                  <rect x="11" y="15" width="2" height="6" fill="#8B7355" />
                  <line x1="10" y1="16" x2="14" y2="17" stroke="#FEF5EB" strokeWidth="1" />
                  <line x1="10" y1="18" x2="14" y2="19" stroke="#FEF5EB" strokeWidth="1" />
                  <line x1="10" y1="20" x2="14" y2="21" stroke="#FEF5EB" strokeWidth="1" />
                  <path d="M 11,21 C 18,21 16,36 12,38 C 8,36 6,21 11,21 Z" fill="#D4BA7B" />
                </svg>
              ))}
            </div>

            <h3 className="font-neulis text-2xl font-medium text-[#4A3B2C] mb-3">
              {title}
            </h3>

            <div className="w-10 h-px bg-[#D4BA7B] mb-3 opacity-70 shrink-0" />

            <p className="font-satoshi text-sm text-[#5C4D3C] leading-relaxed px-4">
              {subtitle}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
