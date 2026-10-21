"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { EASE } from "./Reveal";

const LINKS = [
  { href: "#wearables", label: "Wearables" },
  { href: "#work", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 240 && y > prev + 2);
    if (y < prev - 2) setHidden(false);
    setSolid(y > 40);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -90 : 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 sm:px-5 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid
            ? "border border-white/[0.07] bg-ink/60 backdrop-blur-xl backdrop-saturate-150"
            : "border border-transparent"
        }`}
      >
        <a href="#top" className="group flex items-center gap-2.5 text-[15px] tracking-tight">
          <span className="relative grid size-7 place-items-center rounded-full bg-paper text-ink sm:size-6">
            <span className="font-serif text-[16px] italic leading-none sm:text-[15px]">n</span>
          </span>
          {/* Phones carry the name in the hero, keeping the bar to a mark and three links. */}
          <span className="whitespace-nowrap font-medium max-sm:sr-only">Noah Presler</span>
        </a>
        <ul className="flex items-center gap-0.5 text-[14px] text-mute sm:gap-1 sm:text-[13px]">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-2 transition-colors duration-300 sm:py-1.5 hover:bg-white/[0.06] hover:text-paper"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
