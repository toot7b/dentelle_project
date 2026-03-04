"use client";

import ActivitiesCloud from "@/components/activities/ActivitiesCloud";

interface CloudDef {
    variant: "cirrus" | "cumulus" | "wisp";
    top: string;
    left?: string;
    right?: string;
    scale: number;
    hideOnMobile?: boolean;
    mobileTop?: string;
    mobileLeft?: string;
    mobileRight?: string;
    mobileScale?: number;
}

// Nuages sans classe cloud-drift-* — la dérive est gérée par GSAP dans AdhesionSection
const clouds: CloudDef[] = [
    // ── Haut gauche ──────────────────────────────────────────────
    { variant: "wisp",    top: "10%", left: "22%",  scale: 0.75, hideOnMobile: true },

    // ── Haut droite ───────────────────────────────────────────────
    { variant: "cirrus",  top: "8%",  right: "16%", scale: 0.75, hideOnMobile: true },

    // ── Milieu gauche ─────────────────────────────────────────────
    { variant: "cumulus", top: "35%", left: "-4%",  scale: 1.05, hideOnMobile: true },

    // ── Milieu droite ─────────────────────────────────────────────
    { variant: "cumulus", top: "32%", right: "-3%", scale: 1.0,  mobileTop: "38%", mobileScale: 0.55 },
    { variant: "wisp",    top: "42%", right: "14%", scale: 0.70, hideOnMobile: true },

    // ── Bas gauche ────────────────────────────────────────────────
    { variant: "cumulus", top: "60%", left: "-3%",  scale: 1.05, mobileTop: "65%", mobileLeft: "-5%", mobileScale: 0.60 },

    // ── Bas droite ────────────────────────────────────────────────
    { variant: "cumulus", top: "58%", right: "-2%", scale: 1.0,  mobileTop: "78%", mobileScale: 0.60 },
    { variant: "cirrus",  top: "66%", right: "18%", scale: 0.75, hideOnMobile: true },
];

export default function AdhesionBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: "#FEF5EB" }}>
            {clouds.map((cloud, idx) => (
                <div key={idx}>
                    {/* Desktop */}
                    <div
                        data-cloud-adhesion
                        className="absolute hidden md:block"
                        style={{
                            top: cloud.top,
                            ...(cloud.left != null ? { left: cloud.left } : {}),
                            ...(cloud.right != null ? { right: cloud.right } : {}),
                            transform: `scale(${cloud.scale})`,
                            transformOrigin: cloud.right != null && cloud.left == null ? "top right" : "top left",
                            opacity: 0,
                        }}
                    >
                        <ActivitiesCloud variant={cloud.variant} />
                    </div>

                    {/* Mobile */}
                    {!cloud.hideOnMobile && (
                        <div
                            data-cloud-adhesion
                            className="absolute md:hidden"
                            style={{
                                top: cloud.mobileTop ?? cloud.top,
                                ...(cloud.mobileLeft != null
                                    ? { left: cloud.mobileLeft }
                                    : cloud.left != null
                                        ? { left: cloud.left }
                                        : {}),
                                ...(cloud.mobileRight != null
                                    ? { right: cloud.mobileRight }
                                    : cloud.right != null
                                        ? { right: cloud.right }
                                        : {}),
                                transform: `scale(${cloud.mobileScale ?? cloud.scale * 0.7})`,
                                transformOrigin:
                                    (cloud.mobileRight ?? cloud.right) != null &&
                                    (cloud.mobileLeft ?? cloud.left) == null
                                        ? "top right"
                                        : "top left",
                                opacity: 0,
                            }}
                        >
                            <ActivitiesCloud variant={cloud.variant} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
