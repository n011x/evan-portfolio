import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { proof } from "@/content/projects";

export const alt = "EVAN — системы, веб, автоматизации";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The OG card is the hero's own logic in one frame: the name, the classification, the
 * dateline and the proof row. Built at build time, no external assets.
 *
 * next/og cannot read CSS variables, so the palette is restated here. Keep these in step
 * with `styles/tokens.css`: --paper #F2F1EE, --ink #0B0B0C, --graphite #3A3B3E,
 * --gray #65666B.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F2F1EE",
          color: "#0B0B0C",
          padding: "56px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 2, color: "#65666B" }}>
          <span>ОБНОВЛЕНО {profile.updated}</span>
          <span>PORTFOLIO / INDEX</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 190, fontWeight: 700, letterSpacing: -8, lineHeight: 1 }}>
            {profile.name}
          </span>
          <span style={{ fontSize: 44, letterSpacing: -1, marginTop: 8, color: "#0B0B0C" }}>
            {profile.roleLines.join("  ·  ")}
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ fontSize: 26, maxWidth: 620, lineHeight: 1.35, color: "#3A3B3E" }}>
            {profile.statement}
          </span>
          <div style={{ display: "flex", gap: 32, fontSize: 20, letterSpacing: 2, color: "#65666B" }}>
            {proof.map((item) => (
              <span key={item.label} style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 40, color: "#0B0B0C" }}>{item.value}</span>
                <span>{item.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
