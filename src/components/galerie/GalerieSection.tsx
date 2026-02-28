"use client";

import DandelionHead from "../activities/DandelionHead";

// Perspective field : flowers get bigger toward the bottom (closer to viewer)
const flowers: { left: string; top: string; size: number; rotate: number }[] = [
  // Far background — small
  { left: "3%", top: "4%", size: 28, rotate: 5 },
  { left: "22%", top: "7%", size: 22, rotate: -18 },
  { left: "47%", top: "3%", size: 30, rotate: 30 },
  { left: "70%", top: "6%", size: 26, rotate: -8 },
  { left: "90%", top: "4%", size: 28, rotate: 22 },

  // Foreground — large (Mid distance removed to avoid text overlap)
  { left: "1%", top: "65%", size: 58, rotate: 8 },
  { left: "19%", top: "70%", size: 52, rotate: -14 },
  { left: "80%", top: "66%", size: 62, rotate: 16 },
  { left: "97%", top: "72%", size: 48, rotate: -22 },
];

const mobileFlowers: { left: string; top: string; size: number; rotate: number }[] = [
  // Top
  { left: "5%", top: "5%", size: 26, rotate: 10 },
  { left: "75%", top: "3%", size: 24, rotate: -15 },

  // Bottom (Center removed to avoid text overlap)
  { left: "25%", top: "72%", size: 48, rotate: 6 },
  { left: "72%", top: "78%", size: 44, rotate: -14 },
];

export default function GalerieSection() {
  return (
    <section
      id="galerie-section"
      className="relative w-full min-h-[70vh] overflow-hidden
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
        <p className="font-satoshi text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-16 md:mb-24">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>
    </section>
  );
}
