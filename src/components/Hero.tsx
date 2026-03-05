"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import PhotoWall from "./PhotoWall";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const d = mobile ? 0.5 : 1; // duration multiplier
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Wallpaper fades in gently
    tl.fromTo(
      "[data-animate='wallpaper']",
      { opacity: 0 },
      { opacity: 1, duration: 1.2 * d, ease: "power2.inOut" },
      mobile ? 0.1 : 0.3
    );

    // 2. Title — split into words, each word cascades in
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 1 });
      const split = new SplitType(titleRef.current, { types: "words" });
      if (split.words) {
        gsap.set(split.words, { opacity: 0, y: mobile ? 20 : 30 });
        tl.to(
          split.words,
          {
            opacity: 1,
            y: 0,
            duration: mobile ? 0.35 : 0.6,
            stagger: mobile ? 0.04 : 0.08,
            ease: "power3.out",
          },
          mobile ? 0.2 : 0.6
        );
      }
    }

    // 3. Paragraph fades in
    tl.fromTo(
      "[data-animate='paragraph']",
      { x: mobile ? -15 : -30, opacity: 0 },
      { x: 0, opacity: 1, duration: mobile ? 0.35 : 0.6 },
      mobile ? 0.5 : 1.0
    );

    // 4. Buttons slide up
    tl.fromTo(
      "[data-animate='buttons']",
      { y: mobile ? 12 : 20, opacity: 0 },
      { y: 0, opacity: 1, duration: mobile ? 0.3 : 0.5 },
      mobile ? 0.6 : 1.2
    );

    // 5. Bottom horizontal line draws in ON SCROLL (desktop only)
    if (!mobile) {
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 95%",
          toggleActions: "play none none none",
        }
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center pt-24 lg:pt-24 px-5 lg:px-16 overflow-hidden">
      {/* Wallpaper — desktop: right 60%, mobile: behind photos full width */}
      <div
        data-animate="wallpaper"
        className="absolute top-0 right-0 bottom-0 w-[60%] pointer-events-none opacity-0 hidden lg:block"
        style={{
          backgroundColor: "#B2C5A8",
          backgroundImage: "url('/patterns/flower.svg'), url('/patterns/flower.svg')",
          backgroundSize: "170px 170px",
          backgroundPosition: "0 0, 85px 85px",
          borderLeft: "1px solid rgba(194, 174, 76, 0.85)",
        }}
      />
      {/* Mobile wallpaper — behind photo grid */}
      <div
        data-animate="wallpaper"
        className="absolute bottom-0 left-0 right-0 h-[65%] pointer-events-none opacity-0 lg:hidden"
        style={{
          backgroundColor: "#B2C5A8",
          backgroundImage: "url('/patterns/flower.svg'), url('/patterns/flower.svg')",
          backgroundSize: "120px 120px",
          backgroundPosition: "0 0, 60px 60px",
          borderTop: "1px solid rgba(194, 174, 76, 0.85)",
        }}
      />
      <div className="w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Left — Text */}
        <div className="w-full lg:w-[40%] flex flex-col gap-5 lg:gap-6">
          <h1
            ref={titleRef}
            className="font-neulis text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-semibold text-text-primary leading-tight opacity-0"
          >
            L&apos;art du fil,
            <br />
            point par point
          </h1>
          <p
            data-animate="paragraph"
            className="font-satoshi text-base lg:text-lg leading-relaxed text-text-body max-w-md opacity-0"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <div data-animate="buttons" className="flex items-center gap-3 lg:gap-4 mt-2 opacity-0">
            <a
              href="/adhesion"
              className="font-satoshi text-sm font-medium px-5 lg:px-6 py-2.5 lg:py-3 bg-text-primary text-background rounded-full hover:bg-text-body transition-colors duration-200"
            >
              Nous rejoindre
            </a>
            <a
              href="#galerie-section"
              className="font-satoshi text-sm font-medium px-5 lg:px-6 py-2.5 lg:py-3 border border-text-muted text-text-primary rounded-full hover:border-text-primary transition-colors duration-200"
            >
              Voir la galerie
            </a>
          </div>
        </div>

        {/* Right — Photo Wall */}
        <div className="w-full lg:w-[60%]">
          <PhotoWall />
        </div>
      </div>

      {/* Bottom decorative line — desktop only */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[2px] z-10 pointer-events-none hidden md:block"
        viewBox="0 0 1440 2"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          ref={lineRef}
          d="M 0,1 L 1440,1"
          stroke="rgba(194, 174, 76, 0.85)"
          strokeWidth="2"
          strokeDasharray="1500"
          strokeDashoffset="1500"
        />
      </svg>
    </section>
  );
}
