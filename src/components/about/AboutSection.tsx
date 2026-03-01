"use client";

import PhotoFrame from '../PhotoFrame';
import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center+=10%",
                    toggleActions: "play none none reverse",
                },
            });

            // ── Title ───────────────────────────
            tl.from("[data-about-title]", {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });

            // ── Subtitle ────────────────────────
            tl.from("[data-about-subtitle]", {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            }, 0.2);

            // ── Photo ───────────────────────────
            tl.from("[data-about-photo]", {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            }, 0.3);
        },
            { scope: sectionRef }
        );

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about-section"
            className="relative w-full pt-24 md:pt-32 pb-[20px] md:pb-[120px] z-20"
            style={{ backgroundColor: "#FEF5EB" }}
        >
            <div className="container mx-auto px-6 md:px-16 text-center max-w-4xl relative z-20">
                <h2
                    data-about-title
                    className="font-neulis text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2C1A0E] mb-6 md:mb-8 leading-tight"
                >
                    Lorem Ipsum Dolor
                </h2>

                <p
                    data-about-subtitle
                    className="font-satoshi text-lg md:text-xl text-[#5C3D26] leading-relaxed max-w-2xl mx-auto mb-16 md:mb-20"
                >
                    Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>

            {/* Centered Horizontal Photo Pinned with Nail */}
            <div className="container mx-auto px-6 md:px-16 relative z-30">
                <div data-about-photo className="relative max-w-5xl mx-auto w-full flex justify-center mt-16 md:mt-36 pb-0 md:pb-12 -mb-[260px] sm:-mb-[180px] md:mb-0">
                    <div className="scale-[0.4] sm:scale-[0.6] md:scale-100 origin-top">
                        <PhotoFrame
                            alt="Placeholder About"
                            width={800}
                            height={450}
                            variant="classic"
                            wireLength={120}
                            wireSpread={240}
                            disableHover
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
