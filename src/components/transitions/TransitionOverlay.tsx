"use client";

import { usePageTransition } from "./TransitionProvider";

export default function TransitionOverlay() {
    const { overlayRef } = usePageTransition();

    return (
        <div
            ref={overlayRef}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9998,
                pointerEvents: "none",
                backgroundColor: "#B2C5A8",
                borderBottom: "1px solid rgba(194, 174, 76, 0.85)",
                visibility: "hidden",
            }}
        >
            {/* Flower pattern */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "url('/patterns/flower.svg'), url('/patterns/flower.svg')",
                    backgroundSize: "140px 140px",
                    backgroundPosition: "0 0, 70px 70px",
                    opacity: 1,
                }}
            />
        </div>
    );
}
