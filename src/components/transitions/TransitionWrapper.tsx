"use client";

import { TransitionProvider, TransitionOverlay } from "@/components/transitions";

export default function TransitionWrapper({ children }: { children: React.ReactNode }) {
    return (
        <TransitionProvider>
            {children}
            <TransitionOverlay />
        </TransitionProvider>
    );
}
