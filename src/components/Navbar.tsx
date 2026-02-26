"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const navLinks = [
  { label: "L'Atelier", href: "#atelier" },
  { label: "Galerie", href: "#galerie" },
  { label: "Cours", href: "#cours" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  });

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between bg-background/80 backdrop-blur-sm"
    >
      <Link
        href="/"
        className="font-neulis text-xl font-semibold text-text-primary tracking-tight"
      >
        Dentelle
      </Link>

      <ul className="flex items-center gap-8">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-satoshi text-sm font-medium text-text-body hover:text-text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="#rejoindre"
            className="font-satoshi text-sm font-medium px-5 py-2.5 bg-text-primary text-background rounded-full hover:bg-text-body transition-colors duration-200"
          >
            Nous rejoindre
          </Link>
        </li>
      </ul>
    </nav>
  );
}
