"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PhotoFrame from "./PhotoFrame";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  // Rangée haute — 3 cadres
  { src: "/photos/IMG_2053.webp", rotation: -1.5, width: 200, height: 250, frameColor: "#C2AE4C", variant: "baroque" as const, top: "4%", left: "2%", mobileWidth: 120, mobileHeight: 150 },
  { src: "/photos/IMG_2056.webp", rotation: 1, width: 190, height: 220, frameColor: "#7A5C3E", variant: "ornate" as const, top: "0%", left: "35%", mobileWidth: 115, mobileHeight: 135 },
  { src: "/photos/IMG_2060.webp", rotation: -0.8, width: 195, height: 230, frameColor: "#9A7558", variant: "classic" as const, top: "6%", left: "68%", mobileWidth: 118, mobileHeight: 140 },
  // Rangée basse — 3 cadres
  { src: "/photos/IMG_2064.webp", rotation: 2, width: 210, height: 180, frameColor: "#9A7558", variant: "classic" as const, top: "58%", left: "8%", mobileWidth: 125, mobileHeight: 110 },
  { src: "/photos/IMG_2066.webp", rotation: -1.2, width: 200, height: 260, frameColor: "#C2AE4C", variant: "baroque" as const, top: "54%", left: "40%", mobileWidth: 120, mobileHeight: 155 },
  { src: "/photos/IMG_2070.webp", rotation: 0.8, width: 185, height: 215, frameColor: "#7A5C3E", variant: "ornate" as const, top: "60%", left: "72%", mobileWidth: 112, mobileHeight: 130 },
];

export default function PhotoWall() {
  const wallRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Desktop animation
  useGSAP(() => {
    const frames = wallRef.current?.querySelectorAll("[data-frame]");
    if (!frames) return;

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

  // Mobile animation — faster + scroll parallax
  useGSAP(() => {
    const frames = mobileRef.current?.querySelectorAll("[data-frame]");
    if (!frames) return;

    frames.forEach((frame, i) => {
      const el = frame as HTMLElement;
      const finalRotation = parseFloat(el.dataset.rotation || "0");
      const parallaxEl = el.querySelector("[data-parallax]") as HTMLElement | null;

      // Intro: drop-in on the outer wrapper
      gsap.set(el, { opacity: 0, y: -40, rotation: finalRotation - 5 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        rotation: finalRotation,
        duration: 0.75,
        delay: 0.8 + i * 0.18,
        ease: "back.out(1.4)",
      });

      // Parallax: subtle rotation on the inner wrapper — no conflict
      if (parallaxEl) {
        const direction = i % 2 === 0 ? 1 : -1;
        gsap.to(parallaxEl, {
          rotation: direction * 2.5,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    });
  }, { scope: mobileRef });

  return (
    <>
      {/* Desktop: absolute positioning */}
      <div ref={wallRef} className="relative w-full hidden lg:block" style={{ height: "min(80vh, 750px)" }}>
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

      {/* Mobile: grid layout */}
      <div ref={mobileRef} className="lg:hidden grid grid-cols-2 gap-x-3 gap-y-10 justify-items-center pt-8 pb-4">
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            data-frame
            data-rotation={photo.rotation}
          >
            <div data-parallax>
              <PhotoFrame
                src={photo.src}
                alt={`Dentelle ${i + 1}`}
                width={photo.mobileWidth}
                height={photo.mobileHeight}
                rotation={photo.rotation}
                frameColor={photo.frameColor}
                variant={photo.variant}
                disableHover
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
