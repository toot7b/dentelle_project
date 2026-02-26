"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";
import PhotoWall from "./PhotoWall";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Wallpaper fades in gently
    tl.fromTo(
      "[data-animate='wallpaper']",
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.inOut" },
      0.3
    );

    // 2. Title — split into words, each word cascades in
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 1 });
      const split = new SplitType(titleRef.current, { types: "words" });
      if (split.words) {
        gsap.set(split.words, { opacity: 0, y: 30 });
        tl.to(
          split.words,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.6
        );
      }
    }

    // 3. Paragraph fades in
    tl.fromTo(
      "[data-animate='paragraph']",
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6 },
      1.0
    );

    // 4. Buttons slide up
    tl.fromTo(
      "[data-animate='buttons']",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      1.2
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center pt-24 px-8 lg:px-16 overflow-hidden">
      {/* Wallpaper — full right side, full height */}
      <div
        data-animate="wallpaper"
        className="absolute top-0 right-0 bottom-0 w-[60%] pointer-events-none opacity-0"
        style={{
          backgroundColor: "#B2C5A8",
          backgroundImage: "url('/patterns/flower.svg'), url('/patterns/flower.svg')",
          backgroundSize: "170px 170px",
          backgroundPosition: "0 0, 85px 85px",
          borderLeft: "1px solid rgba(194, 174, 76, 0.85)",
        }}
      />
      <div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left — Text */}
        <div className="w-full lg:w-[40%] flex flex-col gap-6">
          <h1
            ref={titleRef}
            className="font-neulis text-5xl lg:text-6xl xl:text-7xl font-semibold text-text-primary leading-tight opacity-0"
          >
            L&apos;art du fil,
            <br />
            point par point
          </h1>
          <p
            data-animate="paragraph"
            className="font-satoshi text-lg leading-relaxed text-text-body max-w-md opacity-0"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <div data-animate="buttons" className="flex items-center gap-4 mt-2 opacity-0">
            <a
              href="#rejoindre"
              className="font-satoshi text-sm font-medium px-6 py-3 bg-text-primary text-background rounded-full hover:bg-text-body transition-colors duration-200"
            >
              Nous rejoindre
            </a>
            <a
              href="#galerie"
              className="font-satoshi text-sm font-medium px-6 py-3 border border-text-muted text-text-primary rounded-full hover:border-text-primary transition-colors duration-200"
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
    </section>
  );
}
