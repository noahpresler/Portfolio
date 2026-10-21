import { ImageResponse } from "next/og";

export const alt = "Noah Presler — Products that live close to people.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function font(family: string, italic = false) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}${italic ? ":ital@1" : ""}&display=swap`,
  ).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\) format/)?.[1];
  return fetch(url!).then((r) => r.arrayBuffer());
}

export default async function OpengraphImage() {
  const [serif, serifItalic] = await Promise.all([font("Instrument+Serif"), font("Instrument+Serif", true)]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(60% 80% at 85% 60%, #2a2419, #0b0b0c 70%)",
          color: "#f4f1ec",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 6, color: "rgba(244,241,236,0.55)", textTransform: "uppercase" }}>
          Noah Presler · presler.me
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Instrument Serif", fontSize: 112, lineHeight: 0.95 }}>
          <span>Products that live</span>
          <span style={{ fontFamily: "Instrument Serif Italic", color: "#e9d8b4" }}>close to people.</span>
        </div>
        <div style={{ fontSize: 26, color: "rgba(244,241,236,0.6)" }}>
          Fitbit &amp; Pixel Watch at Google · MiaraOS · NameWise · WeWatch · Semester.ly · Dual-Wear Compare
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal" },
        { name: "Instrument Serif Italic", data: serifItalic, style: "normal" },
      ],
    },
  );
}
