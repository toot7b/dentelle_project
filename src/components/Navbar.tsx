"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const leftLinks = [
  { label: "Nos ateliers", href: "/#atelier-section" },
  { label: "Nos créations", href: "/#galerie-section" },
  { label: "Qui sommes-nous ?", href: "/#about-section" },
  { label: "FAQ", href: "/#faq-section" },
];

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  // Reset light mode on path change
  useEffect(() => {
    setIsLightMode(false);
    setMenuOpen(false);
  }, [pathname]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial load animation
    gsap.fromTo(navRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );

    // Color adaptation based on scroll
    let mm = gsap.matchMedia();

    if (document.querySelector("#galerie-section")) {
      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: "#galerie-section",
          start: "top 0px",
          end: "bottom-=10 100px",
          onEnter: () => setIsLightMode(true),
          onLeave: () => setIsLightMode(false),
          onEnterBack: () => setIsLightMode(true),
          onLeaveBack: () => setIsLightMode(false),
        });
      });

      mm.add("(max-width: 767px)", () => {
        ScrollTrigger.create({
          trigger: "#galerie-section",
          start: "top 160px",
          end: "bottom 2px",
          onEnter: () => setIsLightMode(true),
          onLeave: () => setIsLightMode(false),
          onEnterBack: () => setIsLightMode(true),
          onLeaveBack: () => setIsLightMode(false),
        });
      });
    }

    return () => mm.revert();
  });

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 opacity-0 ${isLightMode ? "bg-[#B2C5A8]" : "bg-background"
        }`}
      style={{
        borderBottom: isLightMode
          ? "1px solid rgba(255, 255, 255, 0.25)"
          : "1px solid rgba(194, 174, 76, 0.5)",
      }}
    >
      {/* Desktop layout */}
      <div className="hidden lg:grid px-8 py-4 grid-cols-3 items-center">
        {/* Left links */}
        <ul className="flex items-center gap-8">
          {leftLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-satoshi text-sm font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:transition-all after:duration-300 hover:after:w-full transition-colors duration-200 ${isLightMode
                  ? "text-white after:bg-white hover:text-white"
                  : "text-text-body after:bg-accent-gold hover:text-text-primary"
                  }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Center — Logo */}
        <div className="group flex items-center justify-center gap-3">
          <span
            className={`text-xs transition-colors duration-300 group-hover:rotate-90 ${isLightMode ? "text-white" : "text-accent-gold"
              }`}
          >
            ✦
          </span>
          <Link
            href="/"
            className={`font-neulis text-2xl font-semibold tracking-wide transition-colors duration-300 ${isLightMode ? "text-white" : "text-text-primary"
              }`}
          >
            Les Fuseaux Asseventois
          </Link>
          <span
            className={`text-xs transition-colors duration-300 group-hover:-rotate-90 ${isLightMode ? "text-white" : "text-accent-gold"
              }`}
          >
            ✦
          </span>
        </div>

        {/* Right — Coordonnées + CTA */}
        <ul className="flex items-center justify-end gap-6">
          <li>
            <Link
              href="/contact"
              className={`font-satoshi text-sm font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:transition-all after:duration-300 hover:after:w-full transition-colors duration-200 ${isLightMode
                ? "text-white after:bg-white hover:text-white"
                : "text-text-body after:bg-accent-gold hover:text-text-primary"
                }`}
            >
              Coordonnées
            </Link>
          </li>
          <li>
            <Link
              href="/adhesion"
              className={`font-satoshi text-sm font-medium px-5 py-2 rounded-full transition-colors duration-300 ${isLightMode
                ? "bg-white text-[#B2C5A8] hover:bg-white/90"
                : "bg-text-primary text-background hover:bg-text-body"
                }`}
            >
              Nous rejoindre
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden flex items-center justify-between px-5 py-3">
        <Link
          href="/"
          className={`font-neulis text-lg font-semibold tracking-wide transition-colors duration-300 ${isLightMode ? "text-white" : "text-text-primary"
            }`}
        >
          Les Fuseaux Asseventois
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-[5px] p-3 -mr-1"
          aria-label="Menu"
        >
          <span
            className={`block w-5 h-[2px] transition-all duration-300 ${isLightMode ? "bg-white" : "bg-text-primary"
              } ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block w-5 h-[2px] transition-all duration-300 ${isLightMode ? "bg-white" : "bg-text-primary"
              } ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-[2px] transition-all duration-300 ${isLightMode ? "bg-white" : "bg-text-primary"
              } ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div
          className={`lg:hidden border-t px-5 pb-5 pt-3 transition-colors duration-300 ${isLightMode
            ? "bg-[#B2C5A8] border-white/20"
            : "bg-background border-accent-gold/30"
            }`}
        >
          <ul className="flex flex-col gap-4">
            {leftLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-satoshi text-base font-medium transition-colors ${isLightMode
                    ? "text-white hover:text-white"
                    : "text-text-body hover:text-text-primary"
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className={`font-satoshi text-base font-medium transition-colors ${isLightMode
                  ? "text-white hover:text-white"
                  : "text-text-body hover:text-text-primary"
                  }`}
              >
                Coordonnées
              </Link>
            </li>
            <li className="pt-2">
              <Link
                href="/adhesion"
                onClick={() => setMenuOpen(false)}
                className={`font-satoshi text-sm font-medium px-5 py-2.5 rounded-full inline-block transition-colors ${isLightMode
                  ? "bg-white text-[#B2C5A8] hover:bg-white/90"
                  : "bg-text-primary text-background hover:bg-text-body"
                  }`}
              >
                Nous rejoindre
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
