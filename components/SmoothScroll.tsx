"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { cancelFrame, frame, type FrameData } from "motion/react";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, autoRaf: false });
    // Drive Lenis from Motion's frame loop so scroll position and every scroll-linked
    // transform resolve in the same frame — two separate rAF loops drift by one.
    const update = ({ timestamp }: FrameData) => lenis.raf(timestamp);
    frame.update(update, true);

    // In-page anchors glide instead of jumping
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const target = document.querySelector(a.getAttribute("href")!);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -24, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelFrame(update);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);
  return null;
}
