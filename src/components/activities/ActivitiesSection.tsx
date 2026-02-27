"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ActivitiesBackground from "./ActivitiesBackground";
import ActivitiesMedallion from "./ActivitiesMedallion";

const activities = [
  {
    title: "Apprendre",
    subtitle: "Initiations à la dentelle aux fuseaux, de débutant à perfectionnement",
  },
  {
    title: "Créer",
    subtitle: "Ateliers libres pour concrétiser vos motifs et vos rêves en fil",
  },
  {
    title: "Partager",
    subtitle: "Rencontres, expositions et transmission entre dentellières",
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // ── 0. Titre + paragraphe : posent le décor ──────────────────
      tl.from(".activities-title", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, 0);

      tl.from(".activities-subtitle", {
        y: 25,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, 0.2);

      // ── 0. Sol : monte en même temps ──────────────────────────────
      const hills = sectionRef.current?.querySelector("[data-hills]");
      if (hills) {
        gsap.set(hills, { y: 60, opacity: 0 });
        tl.to(hills, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        }, 0);
      }

      // ── 1.2. Nuages : apparaissent dans le ciel ───────────────────
      const clouds = sectionRef.current?.querySelectorAll("[data-cloud]");
      if (clouds) {
        clouds.forEach((el) => {
          gsap.set(el, { opacity: 0, y: 20 });
        });
        tl.to(clouds, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.12,
        }, 1.2);
      }

      // ── 1.8. Fil de fer : se dessine ──────────────────────────────
      tl.to(wireRef.current, {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: "power2.inOut",
      }, 1.8);

      // ── 3.0. Médaillons : tombent un par un ───────────────────────
      const medallions = sectionRef.current?.querySelectorAll("[data-medallion]");
      if (medallions) {
        medallions.forEach((el) => {
          gsap.set(el, { opacity: 0, y: -50, rotation: -4, transformOrigin: "50% 10px" });
        });
        medallions.forEach((el, i) => {
          tl.to(el, {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.9,
            ease: "back.out(1.2)",
          }, 3.0 + i * 0.3);
        });
      }

      // ── 3.0. Balancement idle des médaillons ──
      if (medallions) {
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
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative pt-24 md:pt-32 pb-0 overflow-hidden"
    >
      <ActivitiesBackground />

      {/* Section Header */}
      <div className="relative z-20 container mx-auto px-6 md:px-16 mb-10 md:mb-14 max-w-4xl text-center">
        <h2 className="font-neulis text-3xl md:text-5xl font-semibold text-[#4A3B2C] mb-4 md:mb-6 activities-title">
          Nos Ateliers
        </h2>
        <p className="font-satoshi text-base md:text-xl text-[#5C4D3C] leading-relaxed max-w-2xl mx-auto activities-subtitle">
          Découvrez l&apos;art délicat de la dentelle aux fuseaux. Rejoignez-nous pour apprendre, créer et partager autour de fils entrelacés, du niveau débutant au perfectionnement.
        </p>
      </div>

      {/* The Clothesline System */}
      <div className="relative w-full h-[520px] md:h-[620px] -mt-10 md:-mt-14">
        {/* Green hills */}
        <div data-hills className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen z-0 pointer-events-none">
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
          <div className="w-full h-[80px] md:h-[100px]" style={{ backgroundColor: "#B2C5A8" }} />
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
                className={`absolute pointer-events-auto origin-top ${i === 0 ? '-mt-11' : i === 1 ? '-mt-12' : '-mt-11'}`}
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
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
