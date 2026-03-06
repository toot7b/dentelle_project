"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface LightboxProps {
    src: string;
    alt: string;
    caption?: string;
    onClose: () => void;
}

export default function Lightbox({ src, alt, caption, onClose }: LightboxProps) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-16"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.65)", backdropFilter: "blur(12px)" }}
            onClick={onClose}
        >
            {/* Bouton fermer — fixe en haut à droite, indépendant de l'image */}
            <button
                onClick={onClose}
                className="fixed top-5 right-5 z-[201] text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
                aria-label="Fermer"
            >
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M5 5L21 21M21 5L5 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
            </button>

            <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 6 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Photo */}
                <Image
                    src={src}
                    alt={alt}
                    width={1200}
                    height={900}
                    unoptimized
                    className="rounded-sm max-h-[80vh] max-w-[90vw] w-auto h-auto"
                    style={{
                        filter: "sepia(20%) saturate(90%) brightness(97%)",
                        boxShadow: "0 16px 48px rgba(0, 0, 0, 0.4)",
                    }}
                />

                {/* Caption */}
                {caption && (
                    <p className="font-neulis text-sm md:text-base text-white lowercase mt-4">
                        {caption}
                    </p>
                )}
            </motion.div>
        </motion.div>
    );
}
