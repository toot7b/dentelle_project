"use client";

import Image from "next/image";
import PhotoFrame from '../PhotoFrame';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top center+=10%",
                once: true,
            },
        });

        // ── Title ───────────────────────────
        tl.fromTo("[data-about-title]", {
            y: 40,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
        });

        // ── Subtitle ────────────────────────
        tl.fromTo("[data-about-subtitle]", {
            y: 40,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
        }, 0.2);

        // ── Tapestry Band ─────────────────────
        tl.fromTo("[data-about-tapestry]", {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
        }, 0.4);

        // ── Photo : vis pop + cadre tombe + impact ───────────────────
        const photoWrap = sectionRef.current?.querySelector("[data-about-photo]") as HTMLElement | null;
        if (photoWrap) {
            const nail = photoWrap.querySelector("[data-nail]") as SVGElement | null;
            const wireFrame = photoWrap.querySelector("[data-wire-frame]") as HTMLElement | null;
            const wire = photoWrap.querySelector("[data-wire]") as SVGElement | null;

            gsap.set(photoWrap, { opacity: 1 });
            if (nail) gsap.set(nail, { scale: 0, transformOrigin: "50% 50%" });
            if (wireFrame) gsap.set(wireFrame, { y: -60, opacity: 0, rotation: -5 });

            // 1. Vis pop
            if (nail) tl.to(nail, { scale: 1, duration: 0.45, ease: "back.out(2)" }, 0.7);

            // 2. Cadre tombe
            if (wireFrame) tl.to(wireFrame, { y: 0, opacity: 1, rotation: 0, duration: 0.65, ease: "power1.in" }, 0.95);

            // 3. Impact
            if (wire && wireFrame) {
                tl.to(wire, { scaleX: 1.2, transformOrigin: "50% 0%", duration: 0.15, ease: "power2.out" });
                tl.to(wireFrame, { y: 10, duration: 0.15, ease: "power2.out" }, "<");
                tl.to(wire, { scaleX: 1, duration: 0.7, ease: "elastic.out(1, 0.4)" });
                tl.to(wireFrame, { y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" }, "<");
            }
        }
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            id="about-section"
            className="relative w-full pt-28 md:pt-16 pb-[80px] md:pb-[120px] z-20"
            style={{ backgroundColor: "#FEF5EB" }}
        >
            <div className="container mx-auto px-6 md:px-16 text-center max-w-4xl relative z-20">
                <h2
                    data-about-title
                    className="font-neulis text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2C1A0E] mb-6 md:mb-8 leading-tight opacity-0 will-change-transform will-change-opacity"
                >
                    Qui sommes-nous ?
                </h2>

                <p
                    data-about-subtitle
                    className="font-satoshi text-lg md:text-xl text-[#5C3D26] leading-relaxed max-w-2xl mx-auto mb-16 md:mb-20 opacity-0 will-change-transform will-change-opacity"
                >
                    Depuis plus de 15 ans, notre association transmet l'art de la dentelle aux fuseaux. Un groupe de passionnés où la bonne humeur compte autant que la précision du geste.
                </p>
            </div>

            {/* Centered Horizontal Photo Pinned with Nail */}
            <div className="relative w-full z-30 flex justify-center mt-32 md:mt-56 pb-0 md:pb-12 -mb-[260px] sm:-mb-[180px] md:mb-0">
                {/* Horizontal Tapestry Band Background - Mobile */}
                <div
                    data-about-tapestry
                    className="md:hidden absolute -top-[60px] sm:-top-[90px] left-0 w-full h-[300px] sm:h-[420px] z-0 pointer-events-none opacity-0 will-change-opacity"
                    style={{
                        backgroundColor: "#B2C5A8",
                        backgroundImage: "url('/patterns/flower.svg'), url('/patterns/flower.svg')",
                        backgroundSize: "120px 120px",
                        backgroundPosition: "0 0, 60px 60px",
                        borderTop: "1px solid rgba(194, 174, 76, 0.85)",
                        borderBottom: "1px solid rgba(194, 174, 76, 0.85)",
                    }}
                />
                {/* Horizontal Tapestry Band Background - Desktop */}
                <div
                    data-about-tapestry
                    className="hidden md:block absolute md:-top-[140px] left-0 w-full md:h-[680px] z-0 pointer-events-none opacity-0 will-change-opacity"
                    style={{
                        backgroundColor: "#B2C5A8",
                        backgroundImage: "url('/patterns/flower.svg'), url('/patterns/flower.svg')",
                        backgroundSize: "170px 170px",
                        backgroundPosition: "0 0, 85px 85px",
                        borderTop: "1px solid rgba(194, 174, 76, 0.85)",
                        borderBottom: "1px solid rgba(194, 174, 76, 0.85)",
                    }}
                />

                <div data-about-photo className="relative max-w-5xl mx-auto w-full z-10 px-6 md:px-16 flex justify-center opacity-0 will-change-transform will-change-opacity">
                    <div className="scale-[0.4] sm:scale-[0.6] md:scale-100 origin-top">
                        <PhotoFrame
                            alt="Tableau association"
                            width={800}
                            height={450}
                            variant="classic"
                            wireLength={120}
                            wireSpread={240}
                            disableHover
                        >
                            

                            {/* Photo unique recouvrant le tableau */}
                            <div className="absolute inset-0 p-3 md:p-4 lg:p-5 z-10">
                                <div className="relative w-full h-full rounded-[2px] overflow-hidden" style={{ boxShadow: "0 4px 12px rgba(44,26,14,0.15)" }}>
                                    <Image
                                        src="/photos/fuseaux/fuseaux.webp"
                                        alt="Travail de la dentelle"
                                        fill
                                        className="block object-cover"
                                        style={{ filter: "sepia(20%) saturate(90%) brightness(97%)" }}
                                    />
                                </div>
                            </div>
                        </PhotoFrame>
                    </div>
                </div>
            </div>
        </section>
    );
}
