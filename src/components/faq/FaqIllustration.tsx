import React, { useMemo } from 'react';

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

        const cpScale = 3.0;
        const cp1x = (bx + -sin * cpScale + tx) / 2;
        const cp1y = (by + cos * cpScale + ty) / 2;
        const cp2x = (bx + sin * cpScale + tx) / 2;
        const cp2y = (by + -cos * cpScale + ty) / 2;

        return `M ${bx.toFixed(1)},${by.toFixed(1)} Q ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${tx.toFixed(1)},${ty.toFixed(1)} Q ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${bx.toFixed(1)},${by.toFixed(1)} Z`;
    });
}

export default function FaqIllustration() {
    const cx = 150;
    const cy = 250;
    const rx = 120;
    const ry = 160;

    const picots = useMemo(
        () => generatePicots(cx, cy, rx, ry, 34, 6),
        [cx, cy, rx, ry]
    );

    return (
        <div className="w-full relative flex items-center justify-center transform scale-75 lg:scale-95 origin-center -mt-32 lg:-mt-24 drop-shadow-xl opacity-95">
            <div className="relative" style={{ width: 300, height: 450 }}>
                <svg
                    className="absolute inset-0 pointer-events-none"
                    width={300}
                    height={450}
                    viewBox="0 0 300 450"
                    fill="none"
                >
                    {/* Main Hook and String Removed to make it look like a posed object, not hanging */}

                    {/* Picots (lace loops) */}
                    <g opacity={0.9}>
                        {picots.map((d, i) => (
                            <path key={i} d={d} fill="#E5D3B3" stroke="#C2AE4C" strokeWidth={0.5} />
                        ))}
                    </g>

                    {/* Ovals */}
                    <ellipse cx={cx} cy={cy} rx={rx - 2} ry={ry - 2} fill="#FFFAF2" stroke="#D4BA7B" strokeWidth={1.5} />
                    <ellipse cx={cx} cy={cy} rx={rx - 8} ry={ry - 12} stroke="#C2AE4C" strokeWidth={0.8} strokeDasharray="4 4" fill="none" opacity={0.6} />
                    <ellipse cx={cx} cy={cy} rx={rx - 13} ry={ry - 18} stroke="#E5D3B3" strokeWidth={1} fill="none" />

                    {/* Centered Large Fuseau Icon */}
                    <g transform={`translate(${cx - 48}, ${cy - 78}) scale(4.0)`} opacity="0.9">
                        <path d="M 12,2 Q 15,10 12,15 Q 9,10 12,2 Z" fill="#D4BA7B" />
                        <circle cx="12" cy="1" r="1.5" fill="#8B7355" />
                        <rect x="11" y="15" width="2" height="6" fill="#8B7355" />
                        <line x1="10" y1="16" x2="14" y2="17" stroke="#FEF5EB" strokeWidth="1" />
                        <line x1="10" y1="18" x2="14" y2="19" stroke="#FEF5EB" strokeWidth="1" />
                        <line x1="10" y1="20" x2="14" y2="21" stroke="#FEF5EB" strokeWidth="1" />
                        <path d="M 11,21 C 18,21 16,36 12,38 C 8,36 6,21 11,21 Z" fill="#D4BA7B" />
                    </g>
                </svg>
            </div>
        </div>
    );
}
