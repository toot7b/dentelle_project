"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import ActivitiesCloud from "@/components/activities/ActivitiesCloud";

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.registerPlugin(ScrollTrigger);

            const st = {
                trigger: sectionRef.current,
                start: "top 75%",
                once: true,
            };

            const tl = gsap.timeline({ scrollTrigger: st });

            // ── Séparateur ──────────────────────
            tl.fromTo("[data-contact-sep]", {
                opacity: 0,
                scaleX: 0.4,
            }, {
                opacity: 1,
                scaleX: 1,
                duration: 0.7,
                ease: "power2.out",
            });

            // ── Nuages gauche (slide from left) ─
            tl.fromTo("[data-contact-cloud-left]", {
                x: -60,
                opacity: 0,
            }, {
                x: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.12,
                ease: "power3.out",
            }, 0.2);

            // ── Nuages droite (slide from right) ─
            tl.fromTo("[data-contact-cloud-right]", {
                x: 60,
                opacity: 0,
            }, {
                x: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.12,
                ease: "power3.out",
            }, 0.2);

            // ── Contenu central ─────────────────
            tl.fromTo("[data-cta-content] > *", {
                y: 30,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
            }, 0.4);
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            id="contact-section"
            className="w-full pt-24 pb-32 md:pt-36 md:pb-72 bg-[#FEF5EB] flex justify-center items-center z-20 relative"
        >
            {/* Séparateur décoratif gold */}
            <div data-contact-sep className="absolute top-0 left-0 right-0 flex items-center justify-center px-6 md:px-16 opacity-0">
                <div className="hidden md:block flex-1 h-px bg-[#C2AE4C]/50" />
                <span className="md:mx-4 text-[#C2AE4C]/70 text-xs">✦</span>
                <div className="hidden md:block flex-1 h-px bg-[#C2AE4C]/50" />
            </div>

            {/* Nuages décoratifs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gauche — outer: position + GSAP cible / inner: scale + drift */}
                <div data-contact-cloud-left className="absolute opacity-0" style={{ top: "4%", left: "-2%" }}>
                    <div className="scale-[0.55] md:scale-100 origin-top-left">
                        <div className="cloud-drift-c" style={{ transform: "scale(0.75)", transformOrigin: "top left" }}><ActivitiesCloud variant="cumulus" /></div>
                    </div>
                </div>
                <div data-contact-cloud-left className="hidden md:block absolute opacity-0" style={{ top: "38%", left: "14%" }}>
                    <div className="cloud-drift-a" style={{ transform: "scale(0.48)", transformOrigin: "top left" }}><ActivitiesCloud variant="wisp" /></div>
                </div>
                <div data-contact-cloud-left className="hidden md:block absolute opacity-0" style={{ top: "62%", left: "16%" }}>
                    <div className="cloud-drift-e" style={{ transform: "scale(0.40)", transformOrigin: "top left" }}><ActivitiesCloud variant="cirrus" /></div>
                </div>
                <div data-contact-cloud-left className="hidden md:block absolute opacity-0" style={{ top: "80%", left: "-1%" }}>
                    <div className="cloud-drift-d" style={{ transform: "scale(0.60)", transformOrigin: "top left" }}><ActivitiesCloud variant="cumulus" /></div>
                </div>
                {/* Droite — outer: position + GSAP cible / inner: scale + drift */}
                {/* Droite mobile uniquement — cumulus bas-droite */}
                <div data-contact-cloud-right className="md:hidden absolute opacity-0" style={{ top: "85%", right: "-2%" }}>
                    <div className="scale-[0.55] origin-top-right">
                        <div className="cloud-drift-b" style={{ transform: "scale(0.65)", transformOrigin: "top right" }}><ActivitiesCloud variant="cumulus" /></div>
                    </div>
                </div>
                {/* Droite desktop uniquement — cirrus haut-droite */}
                <div data-contact-cloud-right className="hidden md:block absolute opacity-0" style={{ top: "6%", right: "-1%" }}>
                    <div className="cloud-drift-b" style={{ transform: "scale(0.60)", transformOrigin: "top right" }}><ActivitiesCloud variant="cirrus" /></div>
                </div>
                <div data-contact-cloud-right className="hidden md:block absolute opacity-0" style={{ top: "28%", right: "15%" }}>
                    <div className="cloud-drift-e" style={{ transform: "scale(0.42)", transformOrigin: "top right" }}><ActivitiesCloud variant="wisp" /></div>
                </div>
                <div data-contact-cloud-right className="hidden md:block absolute opacity-0" style={{ top: "55%", right: "-2%" }}>
                    <div className="cloud-drift-c" style={{ transform: "scale(0.65)", transformOrigin: "top right" }}><ActivitiesCloud variant="cumulus" /></div>
                </div>
                <div data-contact-cloud-right className="hidden md:block absolute opacity-0" style={{ top: "72%", right: "14%" }}>
                    <div className="cloud-drift-a" style={{ transform: "scale(0.36)", transformOrigin: "top right" }}><ActivitiesCloud variant="wisp" /></div>
                </div>

            </div>

            <div data-cta-content className="container mx-auto px-6 max-w-3xl text-center flex flex-col items-center">
                <h2 className="font-neulis text-3xl md:text-4xl lg:text-[3.25rem] font-semibold text-text-primary mb-6 leading-tight opacity-0">
                    Envie de croiser le fil ?
                </h2>

                <p className="font-satoshi text-lg md:text-xl text-text-body leading-relaxed mb-8 md:mb-10 max-w-2xl opacity-0">
                    Que ce soit pour échanger sur notre passion, rejoindre nos ateliers au Château de Fillières, ou simplement nous poser une question, nous sommes à votre écoute.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto opacity-0">
                    <Link
                        href="#nous-contacter"
                        className="font-satoshi text-sm font-medium px-5 lg:px-6 py-2.5 lg:py-3 rounded-full inline-flex justify-center items-center transition-colors duration-200 bg-text-primary text-background hover:bg-text-body w-full sm:w-auto"
                    >
                        Nous contacter
                    </Link>
                    <Link
                        href="#envoyer-un-mot"
                        className="font-satoshi text-sm font-medium px-5 lg:px-6 py-2.5 lg:py-3 rounded-full inline-flex justify-center items-center transition-colors duration-200 border border-text-muted text-text-primary hover:border-text-primary w-full sm:w-auto"
                    >
                        Nous envoyer un mot
                    </Link>
                </div>
            </div>
        </section>
    );
}
