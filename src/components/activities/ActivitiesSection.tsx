"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ActivitiesBackground from "./ActivitiesBackground";
import ActivitiesMedallion from "./ActivitiesMedallion";
import DandelionHead from "./DandelionHead";

const desktopFlowers: { left: string; bottom: number; size: number; rotate: number }[] = [
  { left: "7%", bottom: 27, size: 48, rotate: 12 },
  { left: "11%", bottom: 43, size: 38, rotate: -5 },
  { left: "34%", bottom: 23, size: 52, rotate: 7 },
  { left: "58%", bottom: 37, size: 44, rotate: -14 },
  { left: "62%", bottom: 21, size: 36, rotate: 20 },
  { left: "85%", bottom: 31, size: 50, rotate: -8 },
];

const mobileFlowers: { left: string; bottom: number; size: number; rotate: number }[] = [
  { left: "8%", bottom: 24, size: 30, rotate: 10 },
  { left: "26%", bottom: 8, size: 26, rotate: -12 },
  { left: "44%", bottom: 38, size: 28, rotate: -8 },
  { left: "62%", bottom: 6, size: 32, rotate: 15 },
  { left: "78%", bottom: 28, size: 30, rotate: 18 },
];

const activities = [
  {
    title: "Apprendre",
    subtitle: "Un encadrement bienveillant pour découvrir les fuseaux et les premiers points, pas à pas.",
  },
  {
    title: "Créer",
    subtitle: "Chacun avance à son rythme, sur ses propres ouvrages.",
  },
  {
    title: "Partager",
    subtitle: "Des expositions et des salons pour faire connaître ce beau savoir-faire.",
  },
];

export default function ActivitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wireRef = useRef<SVGPathElement>(null);

  // Parabola/Bezier curve parameters for the wire viewBox is 1400x300
  const WIRE_START_Y = 10;
  const WIRE_CTRL_Y = 195;
  const WIRE_END_Y = 10;

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const mobile = window.matchMedia("(max-width: 767px)").matches;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // ── 0. Titre + paragraphe : posent le décor ──────────────────
      tl.from(".activities-title", {
        y: mobile ? 25 : 40,
        opacity: 0,
        duration: mobile ? 0.6 : 1,
        ease: "power3.out",
      }, 0);

      tl.from(".activities-subtitle", {
        y: mobile ? 15 : 25,
        opacity: 0,
        duration: mobile ? 0.6 : 1,
        ease: "power3.out",
      }, mobile ? 0.1 : 0.2);

      // ── 0. Sol : monte avec le reste ──────────────────
      const hills = sectionRef.current?.querySelectorAll("[data-hills]");

      if (hills && hills.length > 0) {
        gsap.set(hills, { y: mobile ? 30 : 60 });
        tl.to(hills, {
          y: 0,
          duration: mobile ? 0.8 : 1.2,
          ease: "power2.out",
        }, 0);
      }

      // ── Nuages : apparaissent dans le ciel ───────────────────
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
        }, mobile ? 0.3 : 1.2);
      }

      // ── Fil de fer : se dessine (desktop only) ─────────────────
      if (!mobile) {
        tl.to(wireRef.current, {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: "power2.inOut",
        }, 1.8);
      }

      // ── Médaillons : tombent un par un ───────────────────────
      const medallions = sectionRef.current?.querySelectorAll("[data-medallion]");
      if (medallions) {
        medallions.forEach((el) => {
          gsap.set(el, {
            opacity: 0,
            y: mobile ? -30 : -50,
            rotation: mobile ? -2 : -4,
            transformOrigin: "50% 10px",
          });
        });
        medallions.forEach((el, i) => {
          tl.to(el, {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: mobile ? 0.6 : 0.9,
            ease: "power3.out",
          }, mobile ? 0.5 + i * 0.22 : 3.0 + i * 0.3);
        });
      }

      // ── Fleurs desktop : pop une par une en dernier ─────────────
      if (!mobile) {
        const flowers = sectionRef.current?.querySelectorAll("[data-flower]");
        if (flowers) {
          gsap.set(flowers, { scale: 0, transformOrigin: "50% 50%" });
          tl.to(flowers, {
            scale: 1,
            duration: 0.25,
            ease: "back.out(2.5)",
            stagger: 0.07,
          }, 4.3);
        }
      }

      // ── Balancement idle (desktop) / scroll parallax (mobile) ──
      if (medallions) {
        if (mobile) {
          // Mobile: subtle swing tied to scroll
          tl.call(() => {
            medallions.forEach((el, i) => {
              const direction = i % 2 === 0 ? 1 : -1;
              gsap.to(el, {
                rotation: direction * 1,
                ease: "none",
                transformOrigin: "50% 10px",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 2,
                },
              });
            });
          });
        } else {
          // Desktop: continuous idle sway
          tl.call(() => {
            medallions.forEach((el, i) => {
              gsap.to(el, {
                rotation: 1.5,
                duration: 3.5 + i * 0.4,
                ease: "sine.inOut",
                transformOrigin: "50% 10px",
                repeat: -1,
                yoyo: true,
              });
            });
          });
        }
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="atelier-section"
      className="relative z-10 pt-24 md:pt-32 pb-0"
    >
      <ActivitiesBackground />

      {/* Section Header */}
      <div className="relative z-20 container mx-auto px-6 md:px-16 mb-10 md:mb-14 max-w-4xl text-center">
        <h2 className="font-neulis text-3xl md:text-4xl lg:text-5xl font-semibold text-[#4A3B2C] mb-4 md:mb-6 activities-title">
          Nos ateliers
        </h2>
        <p className="font-satoshi text-base md:text-xl text-[#5C4D3C] leading-relaxed max-w-2xl mx-auto activities-subtitle">
          Chaque semaine, nous nous retrouvons à Assevent autour de la dentelle aux fuseaux et de la broderie hardanger. Tout le monde peut nous rejoindre, quel que soit son niveau.
        </p>
      </div>

      {/* Desktop: The Clothesline System */}
      <div className="relative w-full h-[520px] md:h-[650px] -mt-10 md:-mt-14 hidden md:block">
        {/* Green hills */}
        <div data-hills className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen z-0 pointer-events-none pb-[10px] -mb-[10px]">
          <svg
            viewBox="0 0 1440 120"
            className="block w-full h-[60px] md:h-[80px]"
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
          <div className="w-full h-[81px] md:h-[101px] -mt-[1px]" style={{ backgroundColor: "#B2C5A8" }} />
        </div>

        {/* Dandelions — overlay on the green area, separate from hills */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-[100px] z-[1] pointer-events-none">
          {desktopFlowers.map((f, i) => (
            <div key={i} data-flower className="absolute" style={{ left: f.left, bottom: f.bottom }}>
              <DandelionHead size={f.size} rotate={f.rotate} />
            </div>
          ))}
        </div>

        {/* Wire SVG */}
        <svg
          viewBox="0 0 1400 300"
          className="absolute -top-[32px] md:-top-[34px] left-1/2 -translate-x-1/2 w-screen h-[300px] z-10 pointer-events-none"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            ref={wireRef}
            d={`M -50,${WIRE_START_Y} Q 700,${WIRE_CTRL_Y} 1450,${WIRE_END_Y}`}
            stroke="#8B7355"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1600"
            strokeDashoffset="1600"
          />
        </svg>

        {/* Medallions */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[300px] z-20 pointer-events-none">
          {activities.map((activity, i) => {
            const t = 0.18 + (i * 0.32);
            const omitT = 1 - t;
            const svgY = (omitT * omitT * WIRE_START_Y) + (2 * omitT * t * WIRE_CTRL_Y) + (t * t * WIRE_END_Y);
            const topPercentage = (svgY / 300) * 100;

            return (
              <div
                key={activity.title}
                data-medallion
                className={`absolute pointer-events-auto origin-top ${i === 0 ? '-mt-9.5' : i === 1 ? '-mt-11' : '-mt-10'}`}
                style={{
                  left: `${t * 100}%`,
                  top: `${topPercentage}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <div className="w-[300px] transform scale-[0.85] sm:scale-[0.95] md:scale-110 origin-top flex justify-center">
                  <ActivitiesMedallion
                    title={activity.title}
                    subtitle={activity.subtitle}
                    index={i}
                    disableHover
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: Stacked medallions with nail */}
      <div className="md:hidden flex flex-col items-center pb-0 -mt-4">
        {activities.map((activity, i) => (
          <div
            key={activity.title}
            data-medallion
            className="opacity-0 -mb-[120px]"
          >
            {/* Nail / vis */}
            <div className="flex justify-center mb-[-14px] relative z-10">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" fill="#FEF5EB" stroke="#5C3D26" strokeWidth="2" />
                <circle cx="10" cy="10" r="5" fill="#5C3D26" />
                <circle cx="10" cy="10" r="2.5" fill="#C2AE4C" />
                <circle cx="8" cy="8" r="1" fill="#FEF5EB" opacity="0.6" />
              </svg>
            </div>
            <div className="w-[240px] transform scale-[0.75] origin-top flex justify-center">
              <ActivitiesMedallion
                title={activity.title}
                subtitle={activity.subtitle}
                index={i}
              />
            </div>
          </div>
        ))}
        {/* Mobile green footer — 4 wider waves */}
        <div data-hills className="w-screen relative mt-[120px] pt-[40px] pb-[10px] -mb-[10px]" style={{ marginLeft: "calc(-50vw + 50%)", backgroundColor: "#B2C5A8" }}>
          {/* SVG is now absolutely positioned at the top of this green container to bleed upward */}
          <svg
            viewBox="0 0 400 60"
            className="absolute left-0 w-full h-[40px]"
            style={{ top: "-39px" }} /* Overlaps by 1px into the container */
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
          <div className="relative w-full h-[52px] overflow-visible">
            {mobileFlowers.map((f, i) => (
              <div key={i} className="absolute pointer-events-none" style={{ left: f.left, bottom: f.bottom }}>
                <DandelionHead size={f.size} rotate={f.rotate} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
