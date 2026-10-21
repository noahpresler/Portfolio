import projectsJson from "@/content/projects.json";
import reelJson from "@/content/reel.json";
import wearablesJson from "@/content/wearables.json";

export type Img = {
  path: string;
  width: number;
  height: number;
  alt: string;
  kind?: "desktop" | "mobile" | "icon" | "og" | "crop";
  note?: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  /** What it is, in one line — for the at-a-glance row. */
  oneLiner: string;
  description: string;
  url: string;
  repo?: string;
  year?: string | number;
  platform?: string;
  stack?: string[] | string;
  facts?: string[];
  tint: string;
  /** The walkthrough shown beside the pinned intro, in scroll order. */
  features: Feature[];
  images: Img[];
};

export type Feature = {
  title: string;
  body: string;
  media: { src: string; frame: "none" | "browser" | "phone" }[];
};

export type Accolade = {
  quote: string;
  source: string;
  author?: string;
  score?: string | null;
  award?: string | null;
  url: string;
  /** Verbatim excerpt of `quote` used for display. */
  short: string;
};

export type Wearable = {
  slug: string;
  name: string;
  year: string | number;
  tagline: string;
  blogUrl: string;
  blogTitle?: string;
  blogDate?: string;
  officialName: string;
  /** Noah is a credited author on the launch post. */
  byline: boolean;
  /** Only hands-on/first-impression coverage exists so far. */
  firstLook: boolean;
  images: Img[];
  accolades: Accolade[];
};

/** A hero-reel tile: a tight crop of one standout UI moment. */
export type ReelShot = Img & { label: string; href: string };

export const projects = projectsJson as unknown as Project[];
export const wearables = wearablesJson as unknown as Wearable[];
export const reel = reelJson as ReelShot[];
