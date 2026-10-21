"use client";

import { motion, type HTMLMotionProps } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades content up from a soft blur the first time it enters the viewport. */
export function Reveal({
  delay = 0,
  y = 24,
  className,
  children,
  ...rest
}: { delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Splits a line into words that rise in from a mask, one after another. */
export function WordRise({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  inView = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  inView?: boolean;
}) {
  const words = text.split(" ");
  const animate = { y: "0%", opacity: 1 };
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%", opacity: 0 }}
            {...(inView
              ? { whileInView: animate, viewport: { once: true, margin: "0px 0px -10% 0px" } }
              : { animate })}
            transition={{ duration: 1.2, ease: EASE, delay: delay + i * stagger }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
