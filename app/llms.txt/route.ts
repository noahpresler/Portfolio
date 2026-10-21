import { projects, wearables } from "@/lib/content";
import { llmsTxt } from "@/lib/seo";

export function GET() {
  return new Response(llmsTxt(projects, wearables), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
