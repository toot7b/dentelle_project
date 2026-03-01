import Image from "next/image";

interface FlyingPhotoProps {
    src: string;
    alt: string;
    caption?: string;
    rotate?: number;
    className?: string; // For positioning
}

export default function FlyingPhoto({ src, alt, caption, rotate = 0, className = "" }: FlyingPhotoProps) {
    return (
        <div
            className={className}
            style={{
                transform: `rotate(${rotate}deg)`,
                transformOrigin: "center center",
            }}
        >
            {/* The Photo Frame */}
            <div
                className="relative bg-[#FEF5EB] p-3 md:p-4 pb-10 md:pb-14 rounded-sm"
                style={{
                    boxShadow: `
            0 10px 30px -5px rgba(60, 75, 55, 0.15),
            0 4px 10px -2px rgba(60, 75, 55, 0.1)
          `,
                }}
            >
                {/* Inner Image Container */}
                <div className="relative w-[220px] h-[260px] md:w-[280px] md:h-[340px] overflow-hidden rounded-sm bg-[#E5D3B3]/30">
                    {src ? (
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 220px, 280px"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#8B7355]/50 font-satoshi text-sm">
                            [Image manquante]
                        </div>
                    )}
                </div>

                {/* Optional Handwritten-style Caption */}
                {caption && (
                    <div className="absolute bottom-3 left-0 w-full text-center px-4">
                        <span className="font-neulis text-sm md:text-base text-[#5C3D26] lowercase opacity-80">
                            {caption}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
