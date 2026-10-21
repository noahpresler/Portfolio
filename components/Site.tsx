import type { ReactNode } from "react";
import { Contact } from "./Contact";
import { Nav } from "./Nav";
import { Projects } from "./Projects";
import { Wearables } from "./Wearables";
import { projects, wearables } from "@/lib/content";

export function Site({ hero }: { hero: ReactNode }) {
  return (
    <>
      <Nav />
      <main>
        {hero}
        <Wearables devices={wearables} number="01" />
        <Projects projects={projects} number="02" />
        <Contact number="03" />
      </main>
    </>
  );
}
