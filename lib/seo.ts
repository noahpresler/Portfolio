import type { Project, Wearable } from "./content";
import { site } from "./site";

const abs = (path: string) => new URL(path, site.url).toString();
const PERSON_ID = `${site.url}/#person`;

/** One schema.org graph describing Noah, the site, the devices he led and the apps he built. */
export function jsonLd(projects: Project[], wearables: Wearable[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: site.name,
        url: site.url,
        image: abs("/opengraph-image"),
        jobTitle: site.jobTitle,
        description: site.description,
        worksFor: { "@type": "Organization", ...site.employer },
        knowsAbout: site.knowsAbout,
        sameAs: site.links.map((l) => l.href),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profile`,
        url: site.url,
        name: site.title,
        isPartOf: { "@id": `${site.url}/#website` },
        mainEntity: { "@id": PERSON_ID },
        hasPart: [{ "@id": `${site.url}/#wearables` }, { "@id": `${site.url}/#work` }],
      },
      {
        "@type": "ItemList",
        "@id": `${site.url}/#wearables`,
        name: "Fitbit & Pixel Watch devices led as PM Lead at Google",
        itemListElement: wearables.map((d, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Product",
            name: d.officialName || d.name,
            description: d.tagline,
            brand: { "@type": "Brand", name: d.name.startsWith("Pixel") ? "Google Pixel" : "Fitbit" },
            manufacturer: { "@type": "Organization", name: "Google" },
            releaseDate: d.blogDate,
            image: abs(d.images[0].path),
            url: d.blogUrl,
            subjectOf: { "@type": "BlogPosting", headline: d.blogTitle, url: d.blogUrl, datePublished: d.blogDate },
          },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${site.url}/#work`,
        name: "Software built by Noah Presler",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SoftwareApplication",
            name: p.name,
            headline: p.oneLiner,
            description: p.description,
            url: p.url,
            applicationCategory: "LifestyleApplication",
            operatingSystem: p.platform,
            image: abs(p.images[0].path),
            featureList: p.features.map((f) => f.title),
            author: { "@id": PERSON_ID },
          },
        })),
      },
    ],
  };
}

/** The same story as plain Markdown, for LLMs and agents (https://llmstxt.org). */
export function llmsTxt(projects: Project[], wearables: Wearable[]) {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `Role: ${site.jobTitle} at ${site.employer.name}. Product Leader · Builder · Father.`,
    `Mission: helping people live a longer, healthier life — through wearables, and personal projects for the moments that matter.`,
    "",
    "## Links",
    "",
    `- [Website](${site.url})`,
    ...site.links.map((l) => `- [${l.label}](${l.href})`),
    "",
    "## Wearables led at Google (newest first)",
    "",
    "Fitbit devices help people live longer, healthier lives with the Google Health Coach powered by Gemini; Pixel Watches add Gemini Intelligence and connectivity.",
    "",
  ];
  for (const d of wearables) {
    lines.push(`### ${d.officialName || d.name} (${d.year})`, "", d.tagline, "", `- Launch post: [${d.blogTitle}](${d.blogUrl})`);
    for (const a of d.accolades) {
      const credit = [a.source, a.score, a.award].filter(Boolean).join(", ");
      lines.push(`- ${d.firstLook ? "Early hands-on" : "Review"} — ${credit}: “${a.quote}” ([source](${a.url}))`);
    }
    lines.push("");
  }
  lines.push("## Software built on his own time", "");
  for (const p of projects) {
    lines.push(`### ${p.name}`, "", `**${p.oneLiner}** ${p.tagline} ${p.description}`, "", `- Live: ${p.url}`, `- Platform: ${p.platform}`);
    for (const f of p.features) lines.push(`- ${f.title}: ${f.body}`);
    lines.push("");
  }
  return lines.join("\n");
}
