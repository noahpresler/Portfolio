"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import type { Accolade, Wearable } from "@/lib/content";
import { Arrow } from "./Contact";
import { EASE, Reveal, WordRise } from "./Reveal";

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (min-height: 640px)");
    const set = () => setDesktop(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return desktop;
}

export function Wearables({ devices, number }: { devices: Wearable[]; number: string }) {
  const desktop = useIsDesktop();

  return (
    <section id="wearables" className="relative pt-32 md:pt-48">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-mute">
            {number} — PM Lead · Fitbit &amp; Pixel Watch at Google
          </p>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
          <h2 className="font-serif text-[clamp(2.6rem,5.6vw,5rem)] leading-[0.98] tracking-[-0.02em]">
            <WordRise text="Industry leading wearables." inView />{" "}
            <br />
            <span className="italic text-accent">
              <WordRise text="Worn by Millions." inView delay={0.12} />
            </span>
          </h2>
          <Reveal delay={0.15}>
            <p className="max-w-md text-[17px] leading-relaxed text-mute">
              Fitbit devices help real people live longer, healthier lives – with the world’s best AI health coach – the Google Health
              Coach powered by Gemini. While Pixel Watches also help you stay connected and ahead with Gemini Intelligence and pan-planet
              connectivity.
            </p>
          </Reveal>
        </div>
      </div>

      <AccoladeTicker devices={devices} />

      <div className="mt-8 md:mt-12">
        {desktop ? <PinnedGallery devices={devices} /> : <StackedGallery devices={devices} />}
      </div>
    </section>
  );
}

/* ---------- desktop: vertical scroll drives a horizontal track ---------- */

function PinnedGallery({ devices }: { devices: Wearable[] }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);

  return (
    <div ref={outer} style={{ height: `calc(100svh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <motion.div
          ref={track}
          style={{ x }}
          className="flex w-max gap-6 pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] pr-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] will-change-transform"
        >
          {devices.map((d, i) => (
            <DevicePanel key={d.slug} device={d} index={i} total={devices.length} progress={smooth} />
          ))}
        </motion.div>
        <Progress devices={devices} progress={smooth} />
      </div>
    </div>
  );
}

function DevicePanel({
  device: d,
  index,
  total,
  progress,
}: {
  device: Wearable;
  index: number;
  total: number;
  progress?: MotionValue<number>;
}) {
  const hero = d.images[0];
  const [lead, ...rest] = d.accolades;
  // The photo drifts slightly against the track for depth.
  const still = useMotionValue(0);
  const imgX = useTransform(progress ?? still, [0, 1], [`${index * 0.4}%`, `${(index - total + 1) * 0.4}%`]);

  return (
    <article className="group relative flex w-[min(88vw,calc(52svh*16/9),1120px)] shrink-0 flex-col overflow-hidden rounded-[28px] border border-white/[0.07] bg-ink-2">
      <div className="relative aspect-video overflow-hidden bg-[#e9e7e3]">
        <motion.div style={progress ? { x: imgX } : undefined} className="absolute inset-y-0 -inset-x-[2%]">
          <Image
            src={hero.path}
            alt={hero.alt}
            fill
            sizes="(min-width: 900px) 70vw, 100vw"
            className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-out)] group-hover:scale-[1.025]"
          />
        </motion.div>
        <div className="absolute left-5 top-5 flex gap-2">
          <Pill>{d.year}</Pill>
        </div>
      </div>

      <div className="grid gap-8 p-7 lg:grid-cols-[1fr_1.15fr_0.85fr] lg:gap-10 lg:p-9">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <h3 className="mt-2 font-serif text-[clamp(2rem,2.6vw,2.6rem)] leading-none tracking-[-0.02em]">{d.name}</h3>
          <p className="mt-3 text-[14px] leading-relaxed text-mute">{d.tagline}</p>
        </div>

        {lead && <Quote a={lead} firstLook={d.firstLook} />}

        <div className="flex flex-col">
          <ul className="flex flex-wrap gap-1.5">
            {rest.map((a) => (
              <li key={a.url + a.short}>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  title={`“${a.quote}”`}
                  className="inline-flex rounded-full border border-white/10 px-2.5 py-1 text-[11.5px] text-mute transition-colors duration-300 hover:border-white/25 hover:text-paper"
                >
                  {a.source}
                  {(a.award || a.score) && <span className="ml-1.5 text-accent/90">{a.award ?? a.score}</span>}
                </a>
              </li>
            ))}
          </ul>
          <LaunchLink href={d.blogUrl} />
        </div>
      </div>
    </article>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-black/45 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
      {children}
    </span>
  );
}

function LaunchLink({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group/link mt-auto inline-flex items-center gap-2 whitespace-nowrap pt-5 text-[13.5px] text-paper">
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[var(--ease-out)] group-hover/link:bg-[length:100%_1px]">
        Launch post on The Keyword
      </span>
      <Arrow className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
    </a>
  );
}

function Quote({ a, firstLook }: { a: Accolade; firstLook?: boolean }) {
  return (
    <figure className="border-l border-accent/40 pl-5">
      {firstLook && <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">Early hands-on</p>}
      <blockquote className="font-serif text-[clamp(1.4rem,1.9vw,1.85rem)] italic leading-[1.15] text-paper/95">
        &ldquo;{a.short}&rdquo;
      </blockquote>
      <figcaption className="mt-3 text-[12.5px] text-mute">
        <a href={a.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-paper">
          {a.source}
          {a.author ? ` · ${a.author}` : ""}
        </a>
        {(a.award || a.score) && <span className="ml-2 text-accent">{[a.award, a.score].filter(Boolean).join(" · ")}</span>}
      </figcaption>
    </figure>
  );
}

function Progress({ devices, progress }: { devices: Wearable[]; progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div className="mx-auto mt-8 flex w-full max-w-6xl items-center gap-6 px-6">
      <div className="relative h-px flex-1 bg-white/10">
        <motion.div style={{ scaleX }} className="absolute inset-0 origin-left bg-paper/80" />
      </div>
      <div className="hidden gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-faint xl:flex">
        {devices.map((d, i) => (
          <ProgressLabel key={d.slug} label={d.name} index={i} total={devices.length} progress={progress} />
        ))}
      </div>
    </div>
  );
}

function ProgressLabel({ label, index, total, progress }: { label: string; index: number; total: number; progress: MotionValue<number> }) {
  const c = index / Math.max(1, total - 1);
  const w = 0.6 / Math.max(1, total - 1);
  const opacity = useTransform(progress, [c - w, c, c + w], [0.4, 1, 0.4]);
  const color = useTransform(progress, [c - w, c, c + w], ["#f4f1ec52", "#f4f1ec", "#f4f1ec52"]);
  return (
    <motion.span style={{ opacity, color }} className="whitespace-nowrap">
      {label.replace("Fitbit ", "").replace("Pixel Watch", "PW")}
    </motion.span>
  );
}

/* ---------- mobile: stacked cards ---------- */

function StackedGallery({ devices }: { devices: Wearable[] }) {
  return (
    <div className="space-y-5 px-4">
      {devices.map((d, i) => (
        <Reveal key={d.slug} y={32}>
          <article className="overflow-hidden rounded-[24px] border border-white/[0.07] bg-ink-2">
            <div className="relative aspect-video bg-[#e9e7e3]">
              <Image src={d.images[0].path} alt={d.images[0].alt} fill sizes="100vw" className="object-cover" />
              <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                <Pill>{d.year}</Pill>
              </div>
            </div>
            <div className="space-y-6 p-6">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                  {String(i + 1).padStart(2, "0")} / {String(devices.length).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-serif text-[2.3rem] leading-none tracking-[-0.02em]">{d.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mute">{d.tagline}</p>
              </div>
              {d.accolades[0] && <Quote a={d.accolades[0]} firstLook={d.firstLook} />}
              <LaunchLink href={d.blogUrl} />
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- press ticker ---------- */

function AccoladeTicker({ devices }: { devices: Wearable[] }) {
  const items = devices.filter((d) => !d.firstLook).flatMap((d) => d.accolades.map((a) => ({ ...a, device: d.name })));
  if (!items.length) return null;
  // Deal quotes alternately into two rows that drift in opposite directions.
  const rows = [items.filter((_, i) => i % 2 === 0), items.filter((_, i) => i % 2 === 1)];
  return (
    <motion.div
      className="group/ticker relative mt-16 overflow-hidden border-y border-line py-16 md:mt-24 md:py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      <p className="mb-10 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-faint md:mb-14">What reviewers said</p>
      <div className="space-y-8 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] md:space-y-12">
        {rows.map((row, r) => (
          <QuoteRow key={r} quotes={row} reverse={r === 1} />
        ))}
      </div>
    </motion.div>
  );
}

function QuoteRow({ quotes, reverse }: { quotes: (Accolade & { device: string })[]; reverse: boolean }) {
  const row = [...quotes, ...quotes];
  return (
    <div
      className="flex w-max animate-[ticker_var(--dur)_linear_infinite] gap-20 group-hover/ticker:[animation-play-state:paused]"
      style={{ ["--dur" as string]: `${quotes.length * 9}s`, ["--gap" as string]: "5rem", animationDirection: reverse ? "reverse" : "normal" }}
    >
      {row.map((a, i) => (
        <a
          key={i}
          href={a.url}
          target="_blank"
          rel="noreferrer"
          tabIndex={i >= quotes.length ? -1 : undefined}
          aria-hidden={i >= quotes.length || undefined}
          className="flex shrink-0 items-baseline gap-4 whitespace-nowrap transition-opacity duration-300 hover:opacity-70"
        >
          <span className={`font-serif italic ${reverse ? "text-paper/70" : "text-paper/90"} text-[28px] md:text-[44px]`}>&ldquo;{a.short}&rdquo;</span>
          <span className="text-[12px] text-mute md:text-[13px]">
            {a.source} · {a.device}
          </span>
        </a>
      ))}
    </div>
  );
}
