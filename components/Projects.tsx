"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import type { Feature, Img, Project } from "@/lib/content";
import { Arrow } from "./Contact";
import { BrowserFrame, PhoneFrame } from "./Frames";
import { EASE, Reveal, WordRise } from "./Reveal";

export function Projects({ projects, number }: { projects: Project[]; number: string }) {
  return (
    <section id="work" className="relative pt-24 md:pt-48">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-mute">{number} — Things I build</p>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
          <h2 className="font-serif text-[clamp(2.6rem,5.6vw,5rem)] leading-[0.98] tracking-[-0.02em]">
            <WordRise text="Software for the" inView />{" "}
            <br />
            <span className="italic text-accent">
              <WordRise text="moments that matter." inView delay={0.12} />
            </span>
          </h2>
          <Reveal delay={0.15}>
            <p className="max-w-md text-[17px] leading-relaxed text-mute">
              Nights and weekends, I design, build and ship my own products end to end — a baby log, a name finder, a household watchlist,
              the course scheduler I started in college, and a tracker-comparison lab.
            </p>
          </Reveal>
        </div>
      </div>

      <Glance projects={projects} />

      <div className="mx-auto mt-28 max-w-6xl space-y-28 px-4 md:mt-40 md:space-y-44 md:px-6">
        {projects.map((p, i) => (
          <Chapter key={p.slug} project={p} index={i} total={projects.length} />
        ))}
      </div>
    </section>
  );
}

/** Every app on one row — the breadth first, before the deep dives. */
function Glance({ projects }: { projects: Project[] }) {
  return (
    <div className="mx-auto mt-16 max-w-6xl px-4 md:mt-24 md:px-6">
      <ol className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-5">
        {projects.map((p, i) => {
          const icon = p.images.find((im) => /\/(icon|logo)\./.test(im.path));
          return (
            <motion.li
              key={p.slug}
              className={i === projects.length - 1 ? "sm:max-lg:col-span-2" : undefined}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 1.1, ease: EASE, delay: i * 0.06 }}
            >
                <a
                  href={`#${p.slug}`}
                  className="group relative grid h-full grid-cols-[44px_1fr] gap-x-4 overflow-hidden rounded-[20px] border border-white/[0.07] bg-ink-2 p-4 transition-[border-color,transform] sm:flex sm:flex-col sm:p-5 duration-500 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-white/15 lg:min-h-[268px]"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ backgroundImage: `radial-gradient(90% 70% at 100% 0%, ${p.tint}2e, transparent 70%)` }}
                  />
                  <span className="relative row-span-3 flex items-start justify-between">
                    {icon ? (
                      <Image
                        src={icon.path}
                        alt=""
                        width={44}
                        height={44}
                        className="size-11 rounded-[12px] object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="grid size-11 place-items-center rounded-[12px] font-serif text-xl italic text-ink"
                        style={{ background: p.tint }}
                      >
                        {p.name[0]}
                      </span>
                    )}
                    <span className="font-mono text-[11px] tracking-[0.2em] text-faint max-sm:hidden">{String(i + 1).padStart(2, "0")}</span>
                  </span>
                  <span className="relative mt-0.5 font-serif text-[23px] leading-none tracking-[-0.01em] text-paper sm:mt-6 sm:text-[26px] md:mt-10">{p.name}</span>
                  <span className="relative mt-2 text-[14px] leading-snug text-mute sm:mt-2.5">{p.oneLiner}</span>
                  <span className="relative mt-auto flex items-center justify-between pt-3 font-mono sm:pt-5 text-[10px] uppercase tracking-[0.18em] text-faint">
                    {p.platform}
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden
                      className="size-3.5 text-paper/60 transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M8 3v10M3.5 8.5 8 13l4.5-4.5" />
                    </svg>
                  </span>
                </a>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

function Chapter({ project: p, index, total }: { project: Project; index: number; total: number }) {
  const [active, setActive] = useState(0);
  const img = (src: string) => p.images.find((im) => im.path === src)!;

  return (
    <article id={p.slug} className="relative grid scroll-mt-24 gap-10 md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] md:gap-14">
      {/* pinned intro */}
      <div className="px-2 md:px-0">
        <div className="md:sticky md:top-28">
          <Reveal>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              <span>
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="h-px w-6 bg-white/15" />
              <span>{[p.platform, p.year].filter(Boolean).join(" · ")}</span>
            </div>
            <h3 className="mt-5 font-serif text-[clamp(2.8rem,5vw,4.4rem)] leading-none tracking-[-0.02em]">{p.name}</h3>
            <p className="mt-4 text-xl leading-snug md:text-[22px]" style={{ color: p.tint }}>
              {p.tagline}
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mute">{p.description}</p>
          </Reveal>

          <ol className="mt-9 hidden space-y-1 md:block">
            {p.features.map((f, i) => (
              <li key={f.title} className="flex items-center gap-3 py-1 text-[14px]">
                <span className="relative grid size-4 place-items-center">
                  <motion.span
                    className="absolute size-1.5 rounded-full"
                    animate={{ scale: i === active ? 1 : 0.6, opacity: i === active ? 1 : 0.35 }}
                    style={{ background: i === active ? p.tint : "var(--paper)" }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </span>
                <motion.span
                  animate={{ color: i === active ? "#f4f1ec" : "rgba(244,241,236,0.38)", x: i === active ? 2 : 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {f.title}
                </motion.span>
              </li>
            ))}
          </ol>

          <Reveal delay={0.1} className="mt-9">
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink transition-transform duration-500 ease-[var(--ease-out)] hover:scale-[1.03] active:scale-[0.98]"
            >
              Visit {p.name}
              <Arrow />
            </a>
          </Reveal>
        </div>
      </div>

      {/* walkthrough */}
      <div className="space-y-6 md:space-y-10">
        {p.features.map((f, i) => (
          <FeatureBlock key={f.title} feature={f} tint={p.tint} url={p.url} img={img} index={i} onActive={setActive} />
        ))}
      </div>
    </article>
  );
}

function FeatureBlock({
  feature: f,
  tint,
  url,
  img,
  index,
  onActive,
}: {
  feature: Feature;
  tint: string;
  url: string;
  img: (src: string) => Img;
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // The feature crossing the middle of the viewport lights up in the pinned list.
  const centered = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (centered) onActive(index);
  }, [centered, index, onActive]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const pair = f.media.length > 1;

  return (
    <Reveal y={40}>
      <div ref={ref}>
        <div
          className="relative overflow-hidden rounded-[24px] border border-white/[0.06] bg-ink-2 px-3.5 py-6 sm:px-5 sm:py-8 md:px-10 md:py-12"
          style={{
            backgroundImage: `radial-gradient(80% 70% at 50% 110%, ${tint}30, transparent 70%), radial-gradient(60% 50% at 0% 0%, ${tint}12, transparent 70%)`,
          }}
        >
          <motion.div style={{ y }} className={pair ? "grid grid-cols-2 gap-4 md:gap-6" : "flex justify-center"}>
            {f.media.map((m) => (
              <Media key={m.src} img={img(m.src)} frame={m.frame} url={url} pair={pair} />
            ))}
          </motion.div>
        </div>
        <div className="mt-5 grid gap-1 px-2 md:grid-cols-[0.8fr_1.2fr] md:gap-8">
          <h4 className="text-[17px] font-medium tracking-tight text-paper">{f.title}</h4>
          <p className="text-[15px] leading-relaxed text-mute">{f.body}</p>
        </div>
      </div>
    </Reveal>
  );
}

function Media({ img, frame, url, pair }: { img: Img; frame: "none" | "browser" | "phone"; url: string; pair: boolean }) {
  if (frame === "browser") return <BrowserFrame img={img} url={url} sizes="(min-width: 768px) 55vw, 92vw" className="w-full" />;
  if (frame === "phone") return <PhoneFrame img={img} className="w-[min(74%,280px)] sm:w-[min(62%,280px)]" sizes="280px" />;
  const portrait = img.height > img.width;
  return (
    <Image
      src={img.path}
      alt={img.alt}
      width={img.width}
      height={img.height}
      sizes={pair ? "(min-width: 768px) 27vw, 45vw" : "(min-width: 768px) 55vw, 92vw"}
      className={`block h-auto rounded-[16px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.07)] ${
        pair ? "w-full" : portrait ? "w-[min(78%,340px)] sm:w-[min(64%,340px)]" : "w-full"
      }`}
    />
  );
}
