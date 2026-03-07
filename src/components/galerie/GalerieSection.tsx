"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence } from "framer-motion";
import DandelionHead from "../activities/DandelionHead";
import FlyingPhoto from "./FlyingPhoto";
import Lightbox from "./Lightbox";

// Perspective field : flowers get bigger toward the bottom (closer to viewer)
const flowers: { left: string; top: string; size: number; rotate: number }[] = [
  // Top (Intro Text Area)
  { left: "70%", top: "7%", size: 26, rotate: -8 },
  { left: "90%", top: "4%", size: 28, rotate: 22 },
  { left: "12%", top: "8%", size: 25, rotate: 12 },
  { left: "25%", top: "9%", size: 32, rotate: -15 },
  { left: "8%", top: "14%", size: 45, rotate: 8 },
  { left: "85%", top: "12%", size: 38, rotate: 16 },
  { left: "95%", top: "16%", size: 42, rotate: -22 },

  // Upper Grid Area
  { left: "4%", top: "25%", size: 55, rotate: -5 },
  { left: "22%", top: "22%", size: 48, rotate: 14 },
  { left: "45%", top: "28%", size: 42, rotate: -18 },
  { left: "68%", top: "24%", size: 50, rotate: 25 },
  { left: "88%", top: "29%", size: 58, rotate: -12 },
  { left: "98%", top: "32%", size: 46, rotate: 10 },

  // Mid Grid Area
  { left: "8%", top: "42%", size: 62, rotate: 15 },
  { left: "32%", top: "38%", size: 55, rotate: -20 },
  { left: "55%", top: "45%", size: 48, rotate: 8 },
  { left: "78%", top: "41%", size: 65, rotate: -15 },
  { left: "92%", top: "48%", size: 52, rotate: 22 },
  { left: "15%", top: "55%", size: 58, rotate: -8 },

  // Lower Grid Area
  { left: "2%", top: "62%", size: 70, rotate: 12 },
  { left: "28%", top: "68%", size: 62, rotate: -25 },
  { left: "48%", top: "65%", size: 58, rotate: 18 },
  { left: "65%", top: "72%", size: 75, rotate: -10 },
  { left: "85%", top: "66%", size: 60, rotate: 15 },
  { left: "96%", top: "75%", size: 68, rotate: -22 },

  // Bottom Area (End of Grid)
  { left: "6%", top: "85%", size: 85, rotate: 5 },
  { left: "22%", top: "92%", size: 78, rotate: -18 },
  { left: "42%", top: "88%", size: 72, rotate: 12 },
];

const mobileFlowers: { left: string; top: string; size: number; rotate: number }[] = [
  // Top
  { left: "25%", top: "9%", size: 30, rotate: 22 },
  { left: "70%", top: "12%", size: 25, rotate: -8 },

  // Upper Mid
  { left: "12%", top: "22%", size: 38, rotate: 15 },
  { left: "82%", top: "25%", size: 35, rotate: -12 },
  { left: "45%", top: "18%", size: 42, rotate: 8 },
  { left: "5%", top: "32%", size: 40, rotate: -20 },
  { left: "92%", top: "35%", size: 38, rotate: 18 },

  // Mid
  { left: "68%", top: "42%", size: 45, rotate: 14 },
  { left: "8%", top: "52%", size: 52, rotate: 25 },
  { left: "88%", top: "55%", size: 50, rotate: -15 },
  { left: "45%", top: "50%", size: 55, rotate: 12 },

  // Lower Mid
  { left: "15%", top: "65%", size: 58, rotate: -22 },
  { left: "75%", top: "68%", size: 52, rotate: 18 },
  { left: "5%", top: "75%", size: 62, rotate: 10 },
  { left: "90%", top: "78%", size: 58, rotate: -12 },
  { left: "40%", top: "72%", size: 60, rotate: -5 },

  // Bottom
  { left: "25%", top: "85%", size: 68, rotate: 15 },
  { left: "65%", top: "88%", size: 65, rotate: -20 },
  { left: "8%", top: "95%", size: 75, rotate: -8 },
  { left: "85%", top: "94%", size: 72, rotate: 22 },
  { left: "48%", top: "92%", size: 70, rotate: 12 },
];

export default function GalerieSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openPhoto, setOpenPhoto] = useState<{ src: string; caption?: string } | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const photos = sectionRef.current?.querySelectorAll("[data-photo]");
      if (!photos) return;

      const mobile = window.matchMedia("(max-width: 767px)").matches;
      if (mobile) return;

      photos.forEach((photo, i) => {
        const randomRot = (i % 2 === 0 ? -1 : 1) * (8 + Math.random() * 6);
        gsap.set(photo, { y: -120, opacity: 0, scale: 0.7, rotation: randomRot });
        gsap.to(photo, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: photo,
            start: "top 50%",
            once: true,
          },
          onComplete() {
            gsap.set(photo, { clearProps: "all" });
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <>
    <section
      ref={sectionRef}
      id="galerie-section"
      className="relative w-full min-h-screen overflow-hidden -mt-1 pt-1 md:-mt-[180px] md:pt-[200px]"
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
        <h2 className="font-neulis text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 md:mb-8">
          Au bout des fuseaux
        </h2>
        <p className="font-satoshi text-lg md:text-xl text-white leading-relaxed max-w-2xl mx-auto mb-16 md:mb-24">
          Un aperçu des créations nées de nos ateliers. Chaque réalisation est le fruit d'heures de patience, de minutie et d'une passion partagée pour la dentelle.
        </p>
      </div>

      {/* Grid of Scattered Photos */}
      <div className="relative z-10 container mx-auto px-6 md:px-16 mt-16 md:mt-32 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 md:gap-y-32 gap-x-8 md:gap-x-12 place-items-center">
          {[
            { src: "/photos/arbre.webp",     rotate: -4, caption: "un arbre de fil" },
            { src: "/photos/bande.webp",     rotate: 3,  caption: "une bande pour les fêtes" },
            { src: "/photos/bougie.webp",    rotate: -2, caption: "une bougie de dentelle" },
            { src: "/photos/col.webp",       rotate: 5,  caption: "un col tout en dentelle" },
            { src: "/photos/compo.webp",     rotate: -3, caption: "un beau médaillon" },
            { src: "/photos/coussin.webp",   rotate: 2,  caption: "le super coussin" },
            { src: "/photos/hiboux.webp",    rotate: -6, caption: "notre petit hibou d'atelier" },
            { src: "/photos/noel.webp",      rotate: 4,  caption: "l'esprit de noël" },
            { src: "/photos/oiseau2.webp",   rotate: -3, caption: "un oiseau, de près" },
            { src: "/photos/painpiece.webp", rotate: 1,  caption: "le copain d'épices" },
            { src: "/photos/palm.webp",      rotate: -5, caption: "un palmier de fil" },
            { src: "/photos/renard.webp",    rotate: 3,  caption: "un beau renard" },
          ].map((photo, i) => (
            <div key={i} data-photo className="w-full flex justify-center">
              <FlyingPhoto
                src={photo.src}
                alt={`Dentelle aux fuseaux — ${photo.caption}`}
                caption={photo.caption}
                rotate={photo.rotate}
                className="relative w-max"
                onClick={() => setOpenPhoto({ src: photo.src, caption: photo.caption })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Inverted hills — transition vers la section suivante */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-10">
        {/* Desktop */}
        <div className="hidden md:block">
          <svg
            viewBox="0 0 1440 120"
            className="block w-full h-[80px]"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0,0.1 C 40,36.1 80,36.1 120,0.1 C 160,36.1 200,36.1 240,0.1 C 280,36.1 320,36.1 360,0.1 C 400,36.1 440,36.1 480,0.1 C 520,36.1 560,36.1 600,0.1 C 640,36.1 680,36.1 720,0.1 C 760,36.1 800,36.1 840,0.1 C 880,36.1 920,36.1 960,0.1 C 1000,36.1 1040,36.1 1080,0.1 C 1120,36.1 1160,36.1 1200,0.1 C 1240,36.1 1280,36.1 1320,0.1 C 1360,36.1 1400,36.1 1440,0.1 L1440,120 L0,120 Z"
              fill="#FEF5EB"
            />
            <path
              d="M0,0.1 C 40,36.1 80,36.1 120,0.1 C 160,36.1 200,36.1 240,0.1 C 280,36.1 320,36.1 360,0.1 C 400,36.1 440,36.1 480,0.1 C 520,36.1 560,36.1 600,0.1 C 640,36.1 680,36.1 720,0.1 C 760,36.1 800,36.1 840,0.1 C 880,36.1 920,36.1 960,0.1 C 1000,36.1 1040,36.1 1080,0.1 C 1120,36.1 1160,36.1 1200,0.1 C 1240,36.1 1280,36.1 1320,0.1 C 1360,36.1 1400,36.1 1440,0.1"
              stroke="#C2AE4C"
              strokeWidth="2"
            />
          </svg>
        </div>
        {/* Mobile */}
        <div className="md:hidden">
          <svg
            viewBox="0 0 400 60"
            className="block w-full h-[40px]"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0,0.1 C 25,25.1 75,25.1 100,0.1 C 125,25.1 175,25.1 200,0.1 C 225,25.1 275,25.1 300,0.1 C 325,25.1 375,25.1 400,0.1 L400,60 L0,60 Z"
              fill="#FEF5EB"
            />
            <path
              d="M0,0.1 C 25,25.1 75,25.1 100,0.1 C 125,25.1 175,25.1 200,0.1 C 225,25.1 275,25.1 300,0.1 C 325,25.1 375,25.1 400,0.1"
              stroke="#C2AE4C"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    </section>

      <AnimatePresence>
        {openPhoto && (
          <Lightbox
            src={openPhoto.src}
            alt={openPhoto.caption ?? "Photo"}
            caption={openPhoto.caption}
            onClose={() => setOpenPhoto(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
