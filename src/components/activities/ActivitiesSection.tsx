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
  // M 0,20 Q x/2,250 x,20
  const WIRE_START_Y = 20;
  const WIRE_CTRL_Y = 250;
  const WIRE_END_Y = 20;

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

      // 1. Title fade in
      tl.from(".activities-header", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, 0);

      // 2. Wire draws left to right
      tl.to(wireRef.current, {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: "power2.inOut",
      }, 0.3);

      // 3. Medallions drop in
      const medallions = sectionRef.current?.querySelectorAll("[data-medallion]");
      if (medallions) {
        medallions.forEach((el, i) => {
          gsap.set(el, { opacity: 0, y: -50, rotation: -4, transformOrigin: "50% 10px" });
          tl.to(el, {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.2)",
          }, 1.4 + i * 0.2);
        });

        // 4. Idle sway
        tl.call(() => {
          medallions.forEach((el, i) => {
            gsap.to(el, {
              rotation: 1.5,
              duration: 3.5 + i * 0.4,
              ease: "sine.inOut",
              transformOrigin: "50% 10px", // Swing from the hook dot
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
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <ActivitiesBackground />

      {/* Section Header Context */}
      <div className="relative z-20 container mx-auto px-6 md:px-16 mb-16 md:mb-24 max-w-4xl text-center activities-header">
        <h2 className="font-neulis text-3xl md:text-5xl font-semibold text-[#4A3B2C] mb-4 md:mb-6">
          Nos Ateliers
        </h2>
        <p className="font-satoshi text-base md:text-xl text-[#5C4D3C] leading-relaxed max-w-2xl mx-auto">
          Découvrez l'art délicat de la dentelle aux fuseaux. Rejoignez-nous pour apprendre, créer et partager autour de fils entrelacés, du niveau débutant au perfectionnement.
        </p>
      </div>

      {/* The Clothesline System */}
      <div className="relative w-full max-w-[1400px] mx-auto h-[400px] md:h-[500px]">
        {/* Wire SVG */}
        <svg
          viewBox="0 0 1400 300"
          className="absolute inset-x-0 top-0 w-full h-[300px] z-10 pointer-events-none"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Main wire */}
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

        {/* Medallions Container */}
        <div className="absolute inset-x-0 top-0 h-[300px] z-20 pointer-events-none">
          {activities.map((activity, i) => {
            // Distribute items along the X axis.
            // Depending on screen size, the items scale visually, so we rely on % positioning
            // 3 items -> positions at 16%, 50%, 84% to give them breathing room
            const t = 0.16 + (i * 0.34);

            // Calculate relative Y position on the quadratic bezier curve (0 to 1 scale)
            const omitT = 1 - t;
            // Native Y coordinate strictly in SVG viewBox space (range 20 to 250)
            const svgY = (omitT * omitT * WIRE_START_Y) + (2 * omitT * t * WIRE_CTRL_Y) + (t * t * WIRE_END_Y);

            // Convert SVG viewBox Y to a percentage of the SVG's height (300px)
            const topPercentage = (svgY / 300) * 100;

            return (
              <div
                key={activity.title}
                className="absolute pointer-events-auto origin-top"
                style={{
                  left: `${t * 100}%`,
                  // Position top based on the relative height of the SVG
                  top: `${topPercentage}%`,
                  transform: 'translateX(-50%)', // center horizontally
                  // Pull up slightly to hook directly on the wire
                  marginTop: '-12px',
                }}
              >
                {/* 
                  Bumped overall scale:
                  - Base (mobile): scale-[0.85]
                  - sm: scale-[0.95]
                  - md+: scale-110 (10% larger than natural 300x450 size)
                */}
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
