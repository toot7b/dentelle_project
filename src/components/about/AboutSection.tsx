export default function AboutSection() {
    return (
        <section
            id="about-section"
            className="relative w-full pt-24 md:pt-32 pb-[240px] md:pb-[320px] z-20"
            style={{ backgroundColor: "#FEF5EB" }}
        >
            <div className="container mx-auto px-6 md:px-16 text-center max-w-4xl">
                <h2 className="font-neulis text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2C1A0E] mb-6 md:mb-8 leading-tight">
                    Lorem Ipsum Dolor
                </h2>

                <p className="font-satoshi text-lg md:text-xl text-[#5C3D26] leading-relaxed max-w-2xl mx-auto mb-16 md:mb-24">
                    Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                {/* Espace prévu pour le concept de l'utilisateur plus tard */}
                <div className="w-full h-32 border-2 border-dashed border-[#C2AE4C]/30 flex items-center justify-center rounded-2xl">
                    <span className="font-satoshi text-sm text-[#8B7355] opacity-60">
                        [Espace d'attente pour le concept global]
                    </span>
                </div>
            </div>
        </section>
    );
}
