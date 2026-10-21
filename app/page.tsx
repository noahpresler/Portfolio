import { Site } from "@/components/Site";
import { HeroReel } from "@/components/heroes/HeroReel";
import { projects, reel, wearables } from "@/lib/content";
import { jsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(projects, wearables)).replace(/</g, "\\u003c") }}
      />
      <Site hero={<HeroReel devices={wearables} shots={reel} />} />
    </>
  );
}
