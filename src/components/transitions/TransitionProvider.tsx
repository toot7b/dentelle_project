"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

interface TransitionContextType {
    navigateTo: (href: string) => void;
    overlayRef: React.RefObject<HTMLDivElement | null>;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export function usePageTransition() {
    const ctx = useContext(TransitionContext);
    if (!ctx) throw new Error("usePageTransition must be used within TransitionProvider");
    return ctx;
}

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const overlayRef = useRef<HTMLDivElement>(null);
    const isAnimatingRef = useRef(false);
    // Force a state we never read in render — avoids re-render issues
    const [, setReady] = useState(false);

    // Set initial GSAP position once on mount
    useEffect(() => {
        if (overlayRef.current) {
            gsap.set(overlayRef.current, { yPercent: -100, visibility: "visible" });
            setReady(true);
        }
    }, []);

    const navigateTo = useCallback(
        (href: string) => {
            if (isAnimatingRef.current) return;

            // Hash links: smooth scroll
            if (href.startsWith("#") || (href.startsWith("/#") && window.location.pathname === "/")) {
                const hash = href.replace("/", "");
                const el = document.querySelector(hash);
                if (el) el.scrollIntoView({ behavior: "smooth" });
                return;
            }

            isAnimatingRef.current = true;
            const overlay = overlayRef.current;
            if (!overlay) { router.push(href); return; }

            // Ensure starting position
            gsap.set(overlay, { yPercent: -100, visibility: "visible", pointerEvents: "auto" });

            const tl = gsap.timeline();

            // Phase 1: Curtain drops down
            tl.to(overlay, {
                yPercent: 0,
                duration: 0.5,
                ease: "power3.inOut",
            });

            // Phase 2: Navigate while covered
            tl.call(() => {
                router.push(href);
                window.scrollTo(0, 0);
            });

            // Phase 3: Hold
            tl.to({}, { duration: 0.45 });

            // Phase 4: Curtain rises out
            tl.to(overlay, {
                yPercent: 100,
                duration: 0.5,
                ease: "power3.inOut",
                onComplete: () => {
                    gsap.set(overlay, { yPercent: -100, pointerEvents: "none" });
                    isAnimatingRef.current = false;
                },
            });
        },
        [router]
    );

    return (
        <TransitionContext.Provider value={{ navigateTo, overlayRef }}>
            {children}
        </TransitionContext.Provider>
    );
}
