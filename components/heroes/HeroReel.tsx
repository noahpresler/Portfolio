"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Img, ReelShot, Wearable } from "@/lib/content";
import { EASE, WordRise } from "../Reveal";

// A reel tile: one device photo, or one tightly cropped product moment.
type Shot = { img: Img; label: string; href: string };

/** The work itself in motion: two counter-drifting reels of real product imagery. */
export function HeroReel({ devices, shots }: { devices: Wearable[]; shots: ReelShot[] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const shift = useTransform(scrollYProgress, [0, 1], [0, 320]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const deviceShots: Shot[] = devices.map((d) => ({ img: d.images[0], label: d.name, href: "#wearables" }));
  const productShots: Shot[] = shots.map(({ label, href, ...img }) => ({ img, label, href }));

  return (
    <section ref={ref} id="top" className="relative flex min-h-svh flex-col overflow-hidden pt-24 pb-6 sm:justify-center sm:pt-28 sm:pb-10">
      {/* On phones the copy centres in the space above the reels, which anchor to the bottom. */}
      <motion.div style={{ opacity: fade }} className="mx-auto my-auto w-full max-w-6xl px-6 text-center sm:my-0">
        <motion.p
          className="mb-5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-mute sm:mb-6 sm:text-[11px] sm:tracking-[0.22em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <span className="mb-2.5 block text-paper/85 sm:mb-0 sm:inline sm:text-mute">
            Noah Presler<span className="max-sm:hidden"> · </span>
          </span>
          Product Leader · Builder · Father
        </motion.p>
        <h1 className="font-serif text-[clamp(3.2rem,14.5vw,4.2rem)] leading-[0.95] tracking-[-0.025em] sm:text-[clamp(3rem,6.6vw,6.2rem)] sm:leading-[0.93]">
          <WordRise text="Products that live" delay={0.2} />{" "}
          <br />
          <span className="italic text-accent">
            <WordRise text="close to people." delay={0.36} />
          </span>
        </h1>
        <motion.p
          className="mx-auto mt-5 max-w-[21rem] text-balance text-[15.5px] leading-relaxed text-mute sm:mt-6 sm:max-w-xl sm:text-[16px] md:text-[17px]"
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.7 }}
        >
          Helping people live a longer, healthier life – through wearables, and personal projects for the moments that matter.
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-10 space-y-3 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] sm:mt-12 sm:space-y-4 md:mt-14"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.85 }}
      >
        <Reel shots={deviceShots} direction={-1} shift={shift} seconds={70} />
        <Reel shots={productShots} direction={1} shift={shift} seconds={80} />
      </motion.div>
    </section>
  );
}

function Reel({ shots, direction, shift, seconds }: { shots: Shot[]; direction: 1 | -1; shift: MotionValue<number>; seconds: number }) {
  // Scrolling pushes each reel further along its own direction on top of the idle drift.
  const x = useTransform(shift, (v) => v * direction);
  const row = [...shots, ...shots];
  return (
    <motion.div style={{ x }}>
      <div
        className="group/reel flex w-max gap-4 hover:[animation-play-state:paused]"
        style={{
          animation: `ticker ${seconds}s linear infinite`,
          animationDirection: direction === 1 ? "reverse" : "normal",
          ["--gap" as string]: "1rem",
        }}
      >
        {row.map((s, i) => (
          <a
            key={i}
            href={s.href}
            aria-hidden={i >= shots.length || undefined}
            tabIndex={i >= shots.length ? -1 : undefined}
            className="group relative block h-[clamp(112px,15svh,150px)] sm:h-[clamp(130px,19svh,210px)] shrink-0 overflow-hidden rounded-[16px] border border-white/[0.07] bg-ink-2"
            // Tiles take the shot's own shape, so a crop is never cropped again.
            style={{ aspectRatio: String(Math.min(2.1, Math.max(1.2, s.img.width / s.img.height))) }}
          >
            <Image
              src={s.img.path}
              alt={s.img.alt}
              fill
              sizes="420px"
              className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.05]"
            />
            <span className="absolute bottom-2.5 left-2.5 max-w-[90%] truncate rounded-full bg-black/55 px-2.5 py-1 text-[11px] text-white/90 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
              {s.label}
            </span>
          </a>
        ))}
      </div>
    </motion.div>
  );
}
