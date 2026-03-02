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

            gsap.from("[data-cta-content] > *", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            id="contact-section"
            className="w-full pt-16 md:pt-24 pb-24 md:pb-32 bg-[#FEF5EB] flex justify-center items-center z-20 relative"
        >
            {/* Séparateur décoratif gold */}
            <div className="absolute top-0 left-0 right-0 flex items-center px-6 md:px-16">
                <div className="flex-1 h-px bg-[#C2AE4C]/50" />
                <span className="mx-4 text-[#C2AE4C]/70 text-xs">✦</span>
                <div className="flex-1 h-px bg-[#C2AE4C]/50" />
            </div>

            {/* Nuages décoratifs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gauche */}
                <div className="absolute cloud-drift-c" style={{ top: "12%", left: "-3%", transform: "scale(0.75)", transformOrigin: "top left" }}>
                    <ActivitiesCloud variant="cumulus" />
                </div>
                <div className="absolute cloud-drift-a" style={{ top: "38%", left: "14%", transform: "scale(0.48)", transformOrigin: "top left" }}>
                    <ActivitiesCloud variant="wisp" />
                </div>
                <div className="absolute cloud-drift-e" style={{ top: "62%", left: "16%", transform: "scale(0.40)", transformOrigin: "top left" }}>
                    <ActivitiesCloud variant="cirrus" />
                </div>
                <div className="absolute cloud-drift-d" style={{ top: "80%", left: "-1%", transform: "scale(0.60)", transformOrigin: "top left" }}>
                    <ActivitiesCloud variant="cumulus" />
                </div>
                {/* Droite */}
                <div className="absolute cloud-drift-b" style={{ top: "6%", right: "-1%", transform: "scale(0.60)", transformOrigin: "top right" }}>
                    <ActivitiesCloud variant="cirrus" />
                </div>
                <div className="absolute cloud-drift-e" style={{ top: "28%", right: "15%", transform: "scale(0.42)", transformOrigin: "top right" }}>
                    <ActivitiesCloud variant="wisp" />
                </div>
                <div className="absolute cloud-drift-c" style={{ top: "55%", right: "-2%", transform: "scale(0.65)", transformOrigin: "top right" }}>
                    <ActivitiesCloud variant="cumulus" />
                </div>
                <div className="absolute cloud-drift-a" style={{ top: "72%", right: "14%", transform: "scale(0.36)", transformOrigin: "top right" }}>
                    <ActivitiesCloud variant="wisp" />
                </div>
            </div>

            <div data-cta-content className="container mx-auto px-6 max-w-3xl text-center flex flex-col items-center">
                <h2 className="font-neulis text-3xl md:text-4xl lg:text-[3.25rem] font-semibold text-text-primary mb-6 leading-tight">
                    Envie de croiser le fil ?
                </h2>

                <p className="font-satoshi text-lg md:text-xl text-text-body leading-relaxed mb-8 md:mb-10 max-w-2xl">
                    Que ce soit pour échanger sur notre passion, rejoindre nos ateliers au Château de Fillières, ou simplement nous poser une question, nous sommes à votre écoute.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto">
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

