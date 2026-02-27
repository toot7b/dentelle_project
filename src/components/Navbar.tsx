"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const leftLinks = [
  { label: "L'Atelier", href: "#atelier" },
  { label: "Galerie", href: "#galerie" },
  { label: "Cours", href: "#cours" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    gsap.fromTo(navRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  });

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-background opacity-0"
      style={{ borderBottom: "1px solid rgba(194, 174, 76, 0.5)" }}
    >
      {/* Desktop layout */}
      <div className="hidden lg:grid px-8 py-4 grid-cols-3 items-center">
        {/* Left links */}
        <ul className="flex items-center gap-8">
          {leftLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-satoshi text-sm font-medium text-text-body relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-accent-gold after:transition-all after:duration-300 hover:text-text-primary hover:after:w-full transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Center — Logo */}
        <div className="group flex items-center justify-center gap-3">
          <span className="text-accent-gold text-xs transition-transform duration-300 group-hover:rotate-90">
            ✦
          </span>
          <Link
            href="/"
            className="font-neulis text-2xl font-semibold text-text-primary tracking-wide"
          >
            Les Fuseaux Asseventois
          </Link>
          <span className="text-accent-gold text-xs transition-transform duration-300 group-hover:-rotate-90">
            ✦
          </span>
        </div>

        {/* Right — Contact + CTA */}
        <ul className="flex items-center justify-end gap-6">
          <li>
            <Link
              href="#contact"
              className="font-satoshi text-sm font-medium text-text-body relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-accent-gold after:transition-all after:duration-300 hover:text-text-primary hover:after:w-full transition-colors duration-200"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="#rejoindre"
              className="font-satoshi text-sm font-medium px-5 py-2 bg-text-primary text-background rounded-full hover:bg-text-body transition-colors duration-200"
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
          className="font-neulis text-lg font-semibold text-text-primary tracking-wide"
        >
          Les Fuseaux Asseventois
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-[5px] p-3 -mr-1"
          aria-label="Menu"
        >
          <span className={`block w-5 h-[2px] bg-text-primary transition-transform duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block w-5 h-[2px] bg-text-primary transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[2px] bg-text-primary transition-transform duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="lg:hidden border-t border-accent-gold/30 bg-background px-5 pb-5 pt-3">
          <ul className="flex flex-col gap-4">
            {leftLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-satoshi text-base font-medium text-text-body hover:text-text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="font-satoshi text-base font-medium text-text-body hover:text-text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
            <li className="pt-2">
              <Link
                href="#rejoindre"
                onClick={() => setMenuOpen(false)}
                className="font-satoshi text-sm font-medium px-5 py-2.5 bg-text-primary text-background rounded-full hover:bg-text-body transition-colors inline-block"
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
