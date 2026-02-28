"use client";

import DandelionHead from "../activities/DandelionHead";

// Perspective field : flowers get bigger toward the bottom (closer to viewer)
const flowers: { left: string; top: string; size: number; rotate: number }[] = [
  // Far background — small
  { left: "3%",  top: "4%",  size: 20, rotate: 5 },
  { left: "22%", top: "7%",  size: 16, rotate: -18 },
  { left: "47%", top: "3%",  size: 22, rotate: 30 },
  { left: "70%", top: "6%",  size: 18, rotate: -8 },
  { left: "90%", top: "4%",  size: 20, rotate: 22 },

  // Mid distance — medium
  { left: "11%", top: "32%", size: 34, rotate: -10 },
  { left: "35%", top: "28%", size: 30, rotate: 15 },
  { left: "59%", top: "35%", size: 36, rotate: -5 },
  { left: "83%", top: "30%", size: 32, rotate: 12 },

  // Foreground — large
  { left: "1%",  top: "65%", size: 56, rotate: 8 },
  { left: "19%", top: "70%", size: 48, rotate: -14 },
  { left: "40%", top: "62%", size: 62, rotate: 20 },
  { left: "62%", top: "68%", size: 52, rotate: -6 },
  { left: "80%", top: "66%", size: 58, rotate: 16 },
  { left: "97%", top: "72%", size: 46, rotate: -22 },
];

const mobileFlowers: { left: string; top: string; size: number; rotate: number }[] = [
  { left: "5%",  top: "5%",  size: 14, rotate: 10 },
  { left: "75%", top: "3%",  size: 12, rotate: -15 },
  { left: "40%", top: "18%", size: 18, rotate: 25 },
  { left: "8%",  top: "50%", size: 28, rotate: -8 },
  { left: "60%", top: "55%", size: 24, rotate: 12 },
  { left: "85%", top: "48%", size: 22, rotate: -20 },
  { left: "25%", top: "72%", size: 32, rotate: 6 },
  { left: "72%", top: "78%", size: 30, rotate: -14 },
];

export default function GalerieSection() {
  return (
    <section
      className="relative w-full min-h-[70vh] overflow-hidden
                 md:-mt-[180px] md:pt-[200px]"
      style={{ backgroundColor: "#B2C5A8" }}
    >
      {/* Flowers — desktop */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        {flowers.map((f, i) => (
          <div
            key={i}
            className="absolute"
            style={{ left: f.left, top: f.top }}
          >
            <DandelionHead size={f.size} rotate={f.rotate} />
          </div>
        ))}
      </div>

      {/* Flowers — mobile */}
      <div className="md:hidden absolute inset-0 pointer-events-none">
        {mobileFlowers.map((f, i) => (
          <div
            key={i}
            className="absolute"
            style={{ left: f.left, top: f.top }}
          >
            <DandelionHead size={f.size} rotate={f.rotate} />
          </div>
        ))}
      </div>

      {/* Content placeholder */}
      <div className="relative z-10 flex items-center justify-center min-h-[50vh]">
        <p className="font-neulis text-2xl text-[#2C1A0E] opacity-30">— contenu à venir —</p>
      </div>
    </section>
  );
}
