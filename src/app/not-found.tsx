"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ActivitiesBackground from "@/components/activities/ActivitiesBackground";
import ActivitiesCloud from "@/components/activities/ActivitiesCloud";
import DandelionHead from "@/components/activities/DandelionHead";

const flowers = [
  { left: "8%", bottom: 28, size: 44, rotate: 10 },
  { left: "22%", bottom: 40, size: 36, rotate: -8 },
  { left: "42%", bottom: 22, size: 50, rotate: 14 },
  { left: "60%", bottom: 36, size: 40, rotate: -12 },
  { left: "78%", bottom: 26, size: 46, rotate: 6 },
  { left: "90%", bottom: 42, size: 34, rotate: -18 },
];

const mobileFlowers = [
  { left: "10%", bottom: 20, size: 28, rotate: 8 },
  { left: "30%", bottom: 10, size: 24, rotate: -10 },
  { left: "50%", bottom: 24, size: 30, rotate: 15 },
  { left: "70%", bottom: 8, size: 26, rotate: -6 },
  { left: "85%", bottom: 24, size: 28, rotate: 12 },
];

export default function NotFound() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mobile = window.matchMedia("(max-width: 767px)").matches;

      const tl = gsap.timeline({ delay: 0.3 });

      // Titre 404
      tl.from("[data-404-number]", {
        y: mobile ? 30 : 50,
        opacity: 0,
        duration: mobile ? 0.6 : 1,
        ease: "power3.out",
      }, 0);

      // Sous-titre
      tl.from("[data-404-text]", {
        y: mobile ? 15 : 25,
        opacity: 0,
        duration: mobile ? 0.6 : 1,
        ease: "power3.out",
      }, mobile ? 0.15 : 0.25);

      // Bouton
      tl.from("[data-404-cta]", {
        y: mobile ? 10 : 15,
        opacity: 0,
        duration: mobile ? 0.5 : 0.8,
        ease: "power3.out",
      }, mobile ? 0.3 : 0.5);

      // Nuages
      const clouds = sectionRef.current?.querySelectorAll("[data-cloud]");
      if (clouds) {
        clouds.forEach((el) => {
          gsap.set(el, { opacity: 0, y: mobile ? 10 : 20 });
        });
        tl.to(clouds, {
          opacity: 1,
          y: 0,
          duration: mobile ? 0.8 : 1.5,
          ease: "power2.out",
          stagger: mobile ? 0.08 : 0.12,
        }, mobile ? 0.2 : 0.4);
      }

      // Collines
      const hills = sectionRef.current?.querySelectorAll("[data-hills]");
      if (hills && hills.length > 0) {
        gsap.set(hills, { y: mobile ? 30 : 60 });
        tl.to(hills, {
          y: 0,
          duration: mobile ? 0.8 : 1.2,
          ease: "power2.out",
        }, 0);
      }

      // Fleurs
      if (!mobile) {
        const flowerEls = sectionRef.current?.querySelectorAll("[data-flower]");
        if (flowerEls) {
          gsap.set(flowerEls, { scale: 0, transformOrigin: "50% 50%" });
          tl.to(flowerEls, {
            scale: 1,
            duration: 0.25,
            ease: "back.out(2.5)",
            stagger: 0.07,
          }, 1.2);
        }
      }
    },
    { scope: sectionRef }
  );

  return (
    <>
      <Navbar />
      <div ref={sectionRef} className="relative min-h-screen flex flex-col">
        {/* Desktop background clouds */}
        <div className="hidden md:block">
          <ActivitiesBackground />
        </div>

        {/* Mobile background clouds (custom 404 composition) */}
        <div className="md:hidden absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top: keep only one cloud */}
          <div
            data-cloud
            className="absolute cloud-drift-c"
            style={{ top: "6%", left: "-8%", transform: "scale(0.52)", transformOrigin: "top left" }}
          >
            <ActivitiesCloud variant="cumulus" />
          </div>

          {/* Bottom clouds: restored */}
          <div
            data-cloud
            className="absolute cloud-drift-d"
            style={{ bottom: "20%", left: "-8%", transform: "scale(0.42)", transformOrigin: "bottom left" }}
          >
            <ActivitiesCloud variant="wisp" />
          </div>
          <div
            data-cloud
            className="absolute cloud-drift-a"
            style={{ bottom: "10%", right: "-6%", transform: "scale(0.48)", transformOrigin: "bottom right" }}
          >
            <ActivitiesCloud variant="cumulus" />
          </div>
        </div>

        {/* Contenu centré */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-40 md:pb-48">
          <h1
            data-404-number
            className="font-neulis text-[7rem] md:text-[10rem] lg:text-[12rem] font-bold text-[#2C1A0E] leading-none"
          >
            404
          </h1>
          <p
            data-404-text
            className="font-satoshi text-lg md:text-xl text-[#5C3D26] text-center max-w-md mt-4 md:mt-6 mb-8 md:mb-10 leading-relaxed"
          >
            Ce fil s&apos;est perdu en chemin&hellip;<br />
            La page que vous cherchez n&apos;existe pas.
          </p>
          <Link
            href="/"
            data-404-cta
            className="font-satoshi text-sm font-medium px-8 py-3 rounded-full bg-[#2C1A0E] text-[#FEF5EB] hover:bg-[#5C3D26] transition-colors duration-300"
          >
            Retour à l&apos;accueil
          </Link>
        </div>

        {/* Collines desktop */}
        <div data-hills className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 w-screen z-10 pointer-events-none pb-[10px] -mb-[10px]">
          <svg
            viewBox="0 0 1440 120"
            className="block w-full h-[80px]"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0,119.9 C 40,83.9 80,83.9 120,119.9 C 160,83.9 200,83.9 240,119.9 C 280,83.9 320,83.9 360,119.9 C 400,83.9 440,83.9 480,119.9 C 520,83.9 560,83.9 600,119.9 C 640,83.9 680,83.9 720,119.9 C 760,83.9 800,83.9 840,119.9 C 880,83.9 920,83.9 960,119.9 C 1000,83.9 1040,83.9 1080,119.9 C 1120,83.9 1160,83.9 1200,119.9 C 1240,83.9 1280,83.9 1320,119.9 C 1360,83.9 1400,83.9 1440,119.9 L1440,120 L0,120 Z"
              fill="#B2C5A8"
            />
            <path
              d="M0,119.9 C 40,83.9 80,83.9 120,119.9 C 160,83.9 200,83.9 240,119.9 C 280,83.9 320,83.9 360,119.9 C 400,83.9 440,83.9 480,119.9 C 520,83.9 560,83.9 600,119.9 C 640,83.9 680,83.9 720,119.9 C 760,83.9 800,83.9 840,119.9 C 880,83.9 920,83.9 960,119.9 C 1000,83.9 1040,83.9 1080,119.9 C 1120,83.9 1160,83.9 1200,119.9 C 1240,83.9 1280,83.9 1320,119.9 C 1360,83.9 1400,83.9 1440,119.9"
              stroke="#C2AE4C"
              strokeWidth="2"
            />
          </svg>
          <div className="w-full h-[101px] -mt-[1px]" style={{ backgroundColor: "#B2C5A8" }} />
        </div>

        {/* Pissenlits desktop */}
        <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-[100px] z-[11] pointer-events-none">
          {flowers.map((f, i) => (
            <div key={i} data-flower className="absolute" style={{ left: f.left, bottom: f.bottom }}>
              <DandelionHead size={f.size} rotate={f.rotate} />
            </div>
          ))}
        </div>

        {/* Collines + pissenlits mobile */}
        <div data-hills className="md:hidden absolute bottom-0 left-0 w-full z-10 pointer-events-none">
          <svg
            viewBox="0 0 400 60"
            className="block w-full h-[40px]"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0,59.9 C 25,35 75,35 100,59.9 C 125,35 175,35 200,59.9 C 225,35 275,35 300,59.9 C 325,35 375,35 400,59.9 L400,60 L0,60 Z"
              fill="#B2C5A8"
            />
            <path
              d="M0,59.9 C 25,35 75,35 100,59.9 C 125,35 175,35 200,59.9 C 225,35 275,35 300,59.9 C 325,35 375,35 400,59.9"
              stroke="#C2AE4C"
              strokeWidth="1.5"
            />
          </svg>
          <div className="relative w-full h-[52px]" style={{ backgroundColor: "#B2C5A8" }}>
            {mobileFlowers.map((f, i) => (
              <div key={i} className="absolute pointer-events-none" style={{ left: f.left, bottom: f.bottom }}>
                <DandelionHead size={f.size} rotate={f.rotate} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer hideSeparator />
    </>
  );
}
