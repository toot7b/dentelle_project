"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AdhesionBackground from "@/components/adhesion/AdhesionBackground";
import dynamic from "next/dynamic";

const ContactMap = dynamic(() => import("./ContactMap"), { ssr: false });

const GOOGLE_MAPS_URL =
    "https://www.google.com/maps/dir/?api=1&destination=50.286917,4.02022";

const cardStyle = {
    filter: "drop-shadow(0px 4px 10px rgba(44, 26, 14, 0.15))",
};

export default function ContactPageSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        const mobile = window.matchMedia("(max-width: 767px)").matches;
        const d = mobile ? 0.6 : 1;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // ── Nuages ────────────────────────────────────────────────
        const clouds = sectionRef.current?.querySelectorAll("[data-cloud-adhesion]");
        if (clouds && clouds.length > 0) {
            const offset = mobile ? 40 : 60;
            clouds.forEach((el) => {
                const isRight = !!(el as HTMLElement).style.right;
                gsap.set(el, { x: isRight ? offset : -offset });
            });
            tl.to(clouds, {
                opacity: 1,
                x: 0,
                duration: mobile ? 1 : 1.4,
                stagger: 0.1,
                ease: "power3.out",
            }, 0.1);
            tl.call(() => {
                clouds.forEach((el, i) => {
                    gsap.to(el, {
                        x: "+=14",
                        duration: 14 + (i % 5) * 3,
                        ease: "sine.inOut",
                        repeat: -1,
                        yoyo: true,
                    });
                });
            });
        }

        // ── Titre + sous-titre ────────────────────────────────────
        tl.fromTo("[data-contact-title]",
            { y: mobile ? 25 : 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9 * d },
            0.3
        );
        tl.fromTo("[data-contact-subtitle]",
            { y: mobile ? 15 : 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 * d },
            0.5
        );

        // ── Cartes ────────────────────────────────────────────────
        gsap.fromTo("[data-contact-cards]",
            { y: mobile ? 20 : 35, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.9 * d,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: "[data-contact-cards]",
                    start: "top 85%",
                    once: true,
                },
            }
        );

        // ── Collines ─────────────────────────────────────────────
        const hills = sectionRef.current?.querySelectorAll("[data-contact-hills]");
        if (hills && hills.length > 0) {
            gsap.set(hills, { y: mobile ? 30 : 60 });
            tl.to(hills, {
                y: 0,
                duration: 1.2 * d,
                ease: "power2.out",
            }, 0);
        }
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative pt-32 pb-[200px] md:pb-[240px] flex flex-col items-center"
        >
            <AdhesionBackground />

            <div className="relative z-20 container mx-auto px-6 md:px-16 flex flex-col items-center text-center">
                {/* Titre */}
                <h1
                    data-contact-title
                    className="font-neulis text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2C1A0E] mb-4 md:mb-6 opacity-0"
                >
                    Nous contacter
                </h1>
                <p
                    data-contact-subtitle
                    className="font-satoshi text-base md:text-lg text-[#5C3D26] leading-relaxed max-w-xl mb-10 md:mb-14 opacity-0"
                >
                    Venez nous retrouver lors de nos séances hebdomadaires, ou écrivez-nous pour toute question.
                </p>

                {/* Grille info + carte */}
                <div
                    data-contact-cards
                    className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6 text-left opacity-0"
                >
                    {/* Colonne gauche — infos */}
                    <div className="flex flex-col gap-6">
                        {/* Horaires */}
                        <div
                            className="bg-white rounded-2xl border border-[#C2AE4C] p-6 md:p-8"
                            style={cardStyle}
                        >
                            <p className="font-satoshi text-xs font-semibold tracking-widest uppercase text-[#9A7558] mb-4">
                                Nos séances
                            </p>
                            <p className="font-neulis text-2xl font-semibold text-[#2C1A0E] mb-1">
                                Tous les mercredis
                            </p>
                            <p className="font-satoshi text-lg text-[#5C3D26] mb-5">
                                14h – 17h
                            </p>
                            <div className="w-8 h-px bg-[#C2AE4C] mb-5" />
                            <p className="font-satoshi text-sm text-[#5C3D26] leading-relaxed">
                                16 rue Georges Guynemer<br />
                                59600 Assevent
                            </p>
                        </div>

                        {/* Email */}
                        <div
                            className="bg-white rounded-2xl border border-[#C2AE4C] p-6 md:p-8"
                            style={cardStyle}
                        >
                            <p className="font-satoshi text-xs font-semibold tracking-widest uppercase text-[#9A7558] mb-4">
                                Nous écrire
                            </p>
                            <a
                                href="mailto:contact@fuseaux-asseventois.fr"
                                className="font-satoshi text-base text-[#2C1A0E] hover:text-[#C2AE4C] transition-colors duration-200 underline underline-offset-4"
                            >
                                contact@fuseaux-asseventois.fr
                            </a>
                        </div>
                    </div>

                    {/* Colonne droite — carte */}
                    <div className="flex flex-col gap-4">
                        <div
                            className="rounded-2xl overflow-hidden border border-[#C2AE4C] flex-1 min-h-[280px]"
                            style={cardStyle}
                        >
                            <ContactMap />
                        </div>
                        <a
                            href={GOOGLE_MAPS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-satoshi text-sm font-medium px-6 py-3 bg-[#2C1A0E] text-[#FEF5EB] rounded-full hover:bg-[#5C3D26] transition-colors duration-200 text-center"
                        >
                            Obtenir l&apos;itinéraire →
                        </a>
                    </div>
                </div>
            </div>

            {/* Collines vertes */}
            <div data-contact-hills className="absolute bottom-0 left-0 w-full pointer-events-none z-10">
                <div className="hidden md:block">
                    <svg viewBox="0 0 1440 120" className="block w-full h-[80px]" preserveAspectRatio="none" fill="none">
                        <path d="M0,119.9 C 40,83.9 80,83.9 120,119.9 C 160,83.9 200,83.9 240,119.9 C 280,83.9 320,83.9 360,119.9 C 400,83.9 440,83.9 480,119.9 C 520,83.9 560,83.9 600,119.9 C 640,83.9 680,83.9 720,119.9 C 760,83.9 800,83.9 840,119.9 C 880,83.9 920,83.9 960,119.9 C 1000,83.9 1040,83.9 1080,119.9 C 1120,83.9 1160,83.9 1200,119.9 C 1240,83.9 1280,83.9 1320,119.9 C 1360,83.9 1400,83.9 1440,119.9 L1440,120 L0,120 Z" fill="#B2C5A8" />
                        <path d="M0,119.9 C 40,83.9 80,83.9 120,119.9 C 160,83.9 200,83.9 240,119.9 C 280,83.9 320,83.9 360,119.9 C 400,83.9 440,83.9 480,119.9 C 520,83.9 560,83.9 600,119.9 C 640,83.9 680,83.9 720,119.9 C 760,83.9 800,83.9 840,119.9 C 880,83.9 920,83.9 960,119.9 C 1000,83.9 1040,83.9 1080,119.9 C 1120,83.9 1160,83.9 1200,119.9 C 1240,83.9 1280,83.9 1320,119.9 C 1360,83.9 1400,83.9 1440,119.9" stroke="#C2AE4C" strokeWidth="2" />
                    </svg>
                    <div className="w-full h-[101px] -mt-[1px]" style={{ backgroundColor: "#B2C5A8" }} />
                </div>
                <div className="md:hidden">
                    <svg viewBox="0 0 400 60" className="block w-full h-[40px]" preserveAspectRatio="none" fill="none">
                        <path d="M0,59.9 C 25,35 75,35 100,59.9 C 125,35 175,35 200,59.9 C 225,35 275,35 300,59.9 C 325,35 375,35 400,59.9 L400,60 L0,60 Z" fill="#B2C5A8" />
                        <path d="M0,59.9 C 25,35 75,35 100,59.9 C 125,35 175,35 200,59.9 C 225,35 275,35 300,59.9 C 325,35 375,35 400,59.9" stroke="#C2AE4C" strokeWidth="1.5" />
                    </svg>
                    <div className="w-full h-[60px] -mt-[1px]" style={{ backgroundColor: "#B2C5A8" }} />
                </div>
            </div>
        </section>
    );
}
