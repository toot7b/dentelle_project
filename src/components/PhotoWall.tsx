"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence } from "framer-motion";
import PhotoFrame from "./PhotoFrame";
import Lightbox from "./galerie/Lightbox";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  // Rangée haute — 3 cadres
  { src: "/photos/hero/1.webp", rotation: -1.5, width: 200, height: 250, frameColor: "#C2AE4C", variant: "baroque" as const, top: "4%", left: "2%", mobileWidth: 120, mobileHeight: 150 },
  { src: "/photos/hero/3.webp", rotation: 1, width: 190, height: 220, frameColor: "#7A5C3E", variant: "ornate" as const, top: "0%", left: "35%", mobileWidth: 115, mobileHeight: 135 },
  { src: "/photos/hero/chien.webp", rotation: -0.8, width: 195, height: 230, frameColor: "#9A7558", variant: "classic" as const, top: "58%", left: "8%", mobileWidth: 118, mobileHeight: 140 },
  // Rangée basse — 3 cadres
  { src: "/photos/hero/texture.webp", rotation: 2, width: 210, height: 180, frameColor: "#9A7558", variant: "classic" as const, top: "6%", left: "68%", mobileWidth: 125, mobileHeight: 110 },
  { src: "/photos/hero/texture2.webp", rotation: -1.2, width: 200, height: 260, frameColor: "#C2AE4C", variant: "baroque" as const, top: "54%", left: "40%", mobileWidth: 120, mobileHeight: 155 },
  { src: "/photos/hero/2.webp", rotation: 0.8, width: 185, height: 215, frameColor: "#7A5C3E", variant: "ornate" as const, top: "60%", left: "72%", mobileWidth: 112, mobileHeight: 130 },
];

export default function PhotoWall() {
  const wallRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const [openPhoto, setOpenPhoto] = useState<{ src: string } | null>(null);

  // Desktop animation
  useGSAP(() => {
    const frames = wallRef.current?.querySelectorAll("[data-frame]");
    if (!frames) return;

    frames.forEach((frame, i) => {
      const el = frame as HTMLElement;
      const nail = el.querySelector("[data-nail]") as SVGElement | null;
      const wireFrame = el.querySelector("[data-wire-frame]") as HTMLElement | null;
      const wire = el.querySelector("[data-wire]") as SVGElement | null;

      // Initial states — vis cachée (scale 0), cadre caché au-dessus
      // PAS de rotation sur el : la vis ne doit jamais bouger
      if (nail) gsap.set(nail, { scale: 0, transformOrigin: "50% 50%" });
      if (wireFrame) gsap.set(wireFrame, { y: -60, opacity: 0, rotation: -5 });

      const tl = gsap.timeline({ delay: 1.1 + i * 0.22 });

      // 0. Révèle l'enveloppe avant que l'anim commence
      tl.set(el, { opacity: 1 });

      // 1. Vis pop en place (aucun parent ne tourne)
      if (nail) tl.to(nail, { scale: 1, duration: 0.45, ease: "back.out(2)" });

      // 2. Cadre tombe + sa rotation se stabilise (sur wireFrame, pas sur el)
      if (wireFrame) tl.to(wireFrame, { y: 0, opacity: 1, rotation: 0, duration: 0.65, ease: "power1.in" }, "-=0.1");

      // 3. Impact : fil s'étire + cadre dépasse vers le bas, puis rebond elastic
      if (wire && wireFrame) {
        tl.to(wire, { scaleX: 1.2, transformOrigin: "50% 0%", duration: 0.15, ease: "power2.out" });
        tl.to(wireFrame, { y: 10, duration: 0.15, ease: "power2.out" }, "<");
        tl.to(wire, { scaleX: 1, duration: 0.7, ease: "elastic.out(1, 0.4)" });
        tl.to(wireFrame, { y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" }, "<");
      }
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
              opacity: 0,
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
              onClick={() => setOpenPhoto({ src: photo.src })}
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
            style={{ opacity: 0 }}
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
                onClick={() => setOpenPhoto({ src: photo.src })}
              />
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {openPhoto && (
          <Lightbox
            src={openPhoto.src}
            alt="Photo dentelle"
            onClose={() => setOpenPhoto(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
