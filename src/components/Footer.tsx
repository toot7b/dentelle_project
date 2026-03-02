import Link from "next/link";
import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({ subsets: ["latin"], weight: ["600"] });

const navLinks = [
    { label: "L'Atelier", href: "#atelier" },
    { label: "Galerie", href: "#galerie-section" },
    { label: "À propos", href: "#about-section" },
    { label: "FAQ", href: "#faq-section" },
    { label: "Contact", href: "#contact-section" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full bg-[#B2C5A8] relative z-20">
            {/* Séparateur top doré */}
            <div className="w-full h-px bg-[#C2AE4C]" style={{ opacity: 0.85 }} />

            {/* Contenu principal */}
            <div className="container mx-auto px-6 md:px-16 py-14 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-16">

                    {/* Col 1 — L'association */}
                    <div>
                        <h3 className="font-neulis text-xl font-semibold text-white mb-4">
                            Les Fuseaux Asseventois
                        </h3>
                        <p className="font-satoshi text-base text-white leading-relaxed mb-6">
                            Lorem ipsum dolor sit amet,<br />
                            consectetur adipiscing elit sed do<br className="hidden md:block" /> eiusmod tempor.
                        </p>
                        <address className="not-italic font-satoshi text-base text-white/90 leading-relaxed">
                            Lorem ipsum dolor<br />
                            Nord, France
                        </address>
                    </div>

                    {/* Col 2 — Navigation */}
                    <div>
                        <h4 className="font-satoshi text-xs font-semibold tracking-widest uppercase text-white/80 mb-5">
                            Navigation
                        </h4>
                        <ul className="space-y-3">
                            {navLinks.map(({ label, href }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="font-satoshi text-base text-white hover:text-white/80 transition-colors duration-200"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3 — Informations légales */}
                    <div>
                        <h4 className="font-satoshi text-xs font-semibold tracking-widest uppercase text-white/80 mb-5">
                            Informations
                        </h4>
                        <ul className="space-y-3 mb-8">
                            <li>
                                <a
                                    href="mailto:contact@fuseaux-asseventois.fr"
                                    className="font-satoshi text-base text-white hover:text-white/80 transition-colors duration-200"
                                >
                                    contact@fuseaux-asseventois.fr
                                </a>
                            </li>
                            <li className="font-satoshi text-base text-white/90">
                                Association loi 1901
                            </li>
                        </ul>
                        <Link
                            href="/mentions-legales"
                            className="font-satoshi text-sm text-white hover:text-white/80 transition-colors duration-200 underline underline-offset-2"
                        >
                            Mentions légales & Confidentialité
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bande copyright */}
            <div className="border-t border-white/25">
                <div className="container mx-auto px-6 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="font-satoshi text-sm text-white/80">
                        © {year} Les Fuseaux Asseventois. Tous droits réservés.
                    </p>
                    <p className="font-satoshi text-sm text-white/75">
                        Fait avec amour par <span className={`${geistMono.className} font-semibold [word-spacing:-0.2em]`}>nualt studio</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
