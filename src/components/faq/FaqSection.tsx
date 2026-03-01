"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import FaqIllustration from "./FaqIllustration";

const faqItems = [
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Mauris ultrices eros in cursus turpis massa tincidunt dui. Id leo in vitae turpis massa sed elementum tempus. At urna condimentum mattis pellentesque. Aliquam id diam maecenas ultricies mi eget mauris.",
  },
  {
    question: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?",
    answer:
      "Consectetur purus ut faucibus pulvinar elementum integer. Diam quam nulla porttitor massa id. Velit ut tortor pretium viverra suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada.",
  },
  {
    question: "Ut enim ad minim veniam, quis nostrud exercitation ullamco?",
    answer:
      "Aliquam ut porttitor leo a diam sollicitudin tempor id eu. Non diam phasellus vestibulum lorem sed risus ultricies tristique nulla. Adipiscing elit pellentesque habitant morbi tristique senectus et. Ut etiam sit amet nisl.",
  },
  {
    question: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum?",
    answer:
      "Feugiat pretium nibh ipsum consequat nisl vel. Eget nullam non nisi est sit. Facilisis sed odio morbi quis commodo odio aenean. Tincidunt augue interdum velit euismod in pellentesque. Turpis tincidunt id aliquet risus feugiat.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="shrink-0"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="#9A7558"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#E9BA85]/40">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 md:py-8 text-left cursor-pointer group"
      >
        <span className="font-neulis text-lg md:text-xl text-text-primary pr-4 group-hover:text-text-muted transition-colors duration-200">
          {question}
        </span>
        <ChevronIcon open={isOpen} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="font-satoshi text-base md:text-lg text-text-body leading-relaxed pb-5 md:pb-6 pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set([0]));

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Animate left column
      gsap.from("[data-faq-left]", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // Animate FAQ items staggered
      gsap.from("[data-faq-item]", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-faq-right]",
          start: "top 70%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="faq-section"
      className="relative w-full"
      style={{ backgroundColor: "#FEF5EB" }}
    >
      <div className="w-full px-6 md:px-16 lg:px-24 pt-12 md:pt-16 lg:pt-20 pb-24 md:pb-32 lg:pb-40">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 xl:gap-24">
          {/* Left column — title + CTA + illustration pushed to bottom */}
          <div
            data-faq-left
            className="lg:w-[30%] shrink-0"
          >
            <h2 className="font-neulis text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary leading-tight mb-4 md:mb-6">
              Vos Questions,
              <br />
              Nos Réponses
            </h2>
            <p className="font-satoshi text-base md:text-lg text-text-body leading-relaxed mb-8">
              Tout ce qu'il faut savoir avant de rejoindre
              nos séances de dentelle aux fuseaux.
            </p>
            <a
              href="#contact-section"
              className="inline-block w-fit font-satoshi text-sm font-medium px-5 lg:px-6 py-2.5 lg:py-3 border border-text-muted text-text-primary rounded-full hover:border-text-primary transition-colors duration-200"
            >
              Nous contacter
            </a>

            <div className="hidden lg:block lg:mt-16" />

            {/* Illustration SVG avec fuseaux */}
            <div className="hidden lg:flex w-full mt-8 max-w-[260px] items-center justify-center pointer-events-none relative z-10">
              <FaqIllustration />
            </div>
          </div>

          {/* Right column — accordion */}
          <div data-faq-right className="flex-1">
            <div className="border-t border-[#E9BA85]/40">
              {faqItems.map((item, i) => (
                <div key={i} data-faq-item>
                  <FaqItem
                    question={item.question}
                    answer={item.answer}
                    isOpen={openIndexes.has(i)}
                    onToggle={() =>
                      setOpenIndexes(prev => {
                        const next = new Set(prev);
                        next.has(i) ? next.delete(i) : next.add(i);
                        return next;
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
