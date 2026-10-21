"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { site } from "@/lib/site";
import { Reveal, WordRise } from "./Reveal";

export function Contact({ number }: { number: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordmarkY = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden border-t border-line pt-32 md:pt-44">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-mute">{number} — Contact</p>
        </Reveal>
        <h2 className="max-w-4xl font-serif text-[clamp(2.8rem,7vw,6.4rem)] leading-[0.95] tracking-[-0.02em]">
          <WordRise text="Let’s build something" inView />{" "}
          <br />
          <span className="italic text-accent">
            <WordRise text="worth wearing." inView delay={0.15} />
          </span>
        </h2>

        <Reveal delay={0.2} className="mt-12 flex flex-wrap items-center gap-3">
          {site.email && (
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 rounded-full bg-paper px-6 py-3.5 text-[15px] font-medium text-ink transition-transform duration-500 ease-[var(--ease-out)] hover:scale-[1.03] active:scale-[0.98]"
            >
              {site.email}
              <Arrow />
            </a>
          )}
          {site.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3.5 text-[15px] text-paper/90 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.04]"
            >
              {l.label}
              <Arrow />
            </a>
          ))}
        </Reveal>
      </div>

      <div className="mx-auto mt-28 flex max-w-6xl items-center justify-between px-6 text-[12px] text-faint">
        <span>© Noah Presler</span>
        <span className="font-mono uppercase tracking-[0.2em]">presler.me</span>
      </div>

      {/* oversized wordmark that rises into place as you reach the end */}
      <div className="pointer-events-none mt-6 select-none overflow-hidden" aria-hidden>
        <motion.p
          style={{
            y: wordmarkY,
            backgroundImage: "linear-gradient(180deg, rgba(244,241,236,0.18), rgba(244,241,236,0.015) 80%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
          className="whitespace-nowrap pb-[2vw] text-center font-serif text-[40vw] leading-[0.8] tracking-[-0.045em] text-transparent"
        >
          Presler
        </motion.p>
      </div>
    </section>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`size-3.5 transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <path d="M5 11 11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
