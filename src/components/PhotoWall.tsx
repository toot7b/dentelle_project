"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PhotoFrame from "./PhotoFrame";

const photos = [
  // Rangée haute — 3 cadres alignés avec légers décalages
  { src: "/photos/IMG_2053.webp", rotation: -1.5, width: 160, height: 200, frameColor: "#C2AE4C", variant: "baroque" as const, top: "4%", left: "2%" },
  { src: "/photos/IMG_2056.webp", rotation: 1, width: 150, height: 175, frameColor: "#7A5C3E", variant: "ornate" as const, top: "0%", left: "35%" },
  { src: "/photos/IMG_2060.webp", rotation: -0.8, width: 155, height: 185, frameColor: "#9A7558", variant: "classic" as const, top: "6%", left: "68%" },
  // Rangée basse — 3 cadres décalés par rapport au-dessus
  { src: "/photos/IMG_2064.webp", rotation: 2, width: 170, height: 145, frameColor: "#9A7558", variant: "classic" as const, top: "62%", left: "10%" },
  { src: "/photos/IMG_2066.webp", rotation: -1.2, width: 165, height: 210, frameColor: "#C2AE4C", variant: "baroque" as const, top: "58%", left: "42%" },
  { src: "/photos/IMG_2070.webp", rotation: 0.8, width: 150, height: 170, frameColor: "#7A5C3E", variant: "ornate" as const, top: "65%", left: "74%" },
];

export default function PhotoWall() {
  const wallRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const frames = wallRef.current?.querySelectorAll("[data-frame]");
    if (!frames) return;

    // Frames drop in one by one with a swing effect
    frames.forEach((frame, i) => {
      const el = frame as HTMLElement;
      const finalRotation = parseFloat(el.dataset.rotation || "0");

      gsap.set(el, { opacity: 0, y: -80, rotation: finalRotation - 8 });

      gsap.to(el, {
        opacity: 1,
        y: 0,
        rotation: finalRotation,
        duration: 0.7,
        delay: 0.6 + i * 0.15,
        ease: "back.out(1.4)",
      });
    });
  }, { scope: wallRef });

  return (
    <div ref={wallRef} className="relative w-full" style={{ height: "min(80vh, 750px)" }}>
      {photos.map((photo, i) => (
        <div
          key={photo.src}
          data-frame
          data-rotation={photo.rotation}
          className="absolute"
          style={{
            top: photo.top,
            left: photo.left,
          }}
        >
          <PhotoFrame
            src={photo.src}
            alt={`Dentelle ${i + 1}`}
            width={photo.width}
            height={photo.height}
            rotation={photo.rotation}
            frameColor={photo.frameColor}
            variant={photo.variant}
          />
        </div>
      ))}
    </div>
  );
}
