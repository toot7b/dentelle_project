"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PhotoFrame from "./PhotoFrame";

const photos = [
  // Rangée haute — 3 cadres
  { src: "/photos/IMG_2053.webp", rotation: -1.5, width: 200, height: 250, frameColor: "#C2AE4C", variant: "baroque" as const, top: "4%", left: "2%" },
  { src: "/photos/IMG_2056.webp", rotation: 1, width: 190, height: 220, frameColor: "#7A5C3E", variant: "ornate" as const, top: "0%", left: "35%" },
  { src: "/photos/IMG_2060.webp", rotation: -0.8, width: 195, height: 230, frameColor: "#9A7558", variant: "classic" as const, top: "6%", left: "68%" },
  // Rangée basse — 3 cadres
  { src: "/photos/IMG_2064.webp", rotation: 2, width: 210, height: 180, frameColor: "#9A7558", variant: "classic" as const, top: "58%", left: "8%" },
  { src: "/photos/IMG_2066.webp", rotation: -1.2, width: 200, height: 260, frameColor: "#C2AE4C", variant: "baroque" as const, top: "54%", left: "40%" },
  { src: "/photos/IMG_2070.webp", rotation: 0.8, width: 185, height: 215, frameColor: "#7A5C3E", variant: "ornate" as const, top: "60%", left: "72%" },
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
        delay: 1.1 + i * 0.18,
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
