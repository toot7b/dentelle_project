"use client";

import DandelionHead from "../activities/DandelionHead";

// Perspective field : flowers get bigger toward the bottom (closer to viewer)
const flowers: { left: string; top: string; size: number; rotate: number }[] = [
  // Far background — small (top of the section)
  { left: "47%", top: "5%", size: 30, rotate: 30 },
  { left: "70%", top: "10%", size: 26, rotate: -8 },
  { left: "90%", top: "7%", size: 28, rotate: 22 },

  // Mid-upper (around the text)
  { left: "1%", top: "30%", size: 58, rotate: 8 },
  { left: "19%", top: "35%", size: 52, rotate: -14 },
  { left: "80%", top: "32%", size: 62, rotate: 16 },
  { left: "97%", top: "36%", size: 48, rotate: -22 },

  // Mid-lower area
  { left: "12%", top: "55%", size: 45, rotate: 12 },
  { left: "38%", top: "60%", size: 40, rotate: -8 },
  { left: "65%", top: "50%", size: 50, rotate: 22 },
  { left: "88%", top: "58%", size: 38, rotate: -15 },

  // Bottom area
  { left: "5%", top: "75%", size: 65, rotate: -5 },
  { left: "28%", top: "85%", size: 70, rotate: 18 },
  { left: "55%", top: "80%", size: 60, rotate: -20 },
  { left: "78%", top: "90%", size: 75, rotate: 10 },
  { left: "95%", top: "85%", size: 55, rotate: 25 },
];

const mobileFlowers: { left: string; top: string; size: number; rotate: number }[] = [
  // Top (above and beside text)
  { left: "5%", top: "10%", size: 26, rotate: 10 },

  // Just below text
  { left: "15%", top: "28%", size: 35, rotate: 12 },
  { left: "85%", top: "32%", size: 40, rotate: -8 },
  { left: "35%", top: "38%", size: 28, rotate: 25 },

  // Mid
  { left: "25%", top: "45%", size: 48, rotate: 6 },
  { left: "72%", top: "50%", size: 44, rotate: -14 },
  { left: "10%", top: "55%", size: 30, rotate: 20 },

  // Mid-low
  { left: "15%", top: "65%", size: 35, rotate: 15 },
  { left: "85%", top: "70%", size: 32, rotate: -20 },
  { left: "45%", top: "75%", size: 28, rotate: -5 },

  // Bottom
  { left: "45%", top: "85%", size: 40, rotate: 8 },
  { left: "10%", top: "90%", size: 45, rotate: -12 },
  { left: "75%", top: "95%", size: 48, rotate: 22 },
  { left: "30%", top: "97%", size: 38, rotate: -18 },
  { left: "85%", top: "88%", size: 25, rotate: 12 },
];

export default function GalerieSection() {
  return (
    <section
      id="galerie-section"
      className="relative w-full min-h-[150vh] overflow-hidden
                 -mt-1 pt-1 md:-mt-[180px] md:pt-[200px]"
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

      {/* Text Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-16 pt-16 md:pt-24 text-center max-w-4xl">
        <h2 className="font-neulis text-4xl md:text-6xl font-semibold text-white mb-6 md:mb-8">
          Héritage et Création
        </h2>
        <p className="font-satoshi text-lg md:text-xl text-white leading-relaxed max-w-2xl mx-auto mb-16 md:mb-24">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>
    </section>
  );
}
