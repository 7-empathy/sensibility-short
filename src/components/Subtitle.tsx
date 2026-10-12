import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../fonts";

export type Line = { text: string; from: number; to: number };
const FADE = 8;

export const Subtitle: React.FC<{
  lines: Line[];
  position?: "bottom" | "center";
}> = ({ lines, position = "bottom" }) => {
  const frame = useCurrentFrame();
  const isCenter = position === "center";

  return (
    <AbsoluteFill
      style={{
        justifyContent: isCenter ? "center" : "flex-end",
        alignItems: "center",
        paddingBottom: isCenter ? 0 : 110,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          alignItems: "center",
        }}
      >
        {lines.map((l, i) => {
          if (frame < l.from - FADE || frame > l.to + FADE) return null;
          const opacity = interpolate(
            frame,
            [l.from, l.from + FADE, l.to - FADE, l.to],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const y = interpolate(frame, [l.from, l.from + FADE], [18, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          const blur = interpolate(frame, [l.from, l.from + FADE], [9, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                filter: `blur(${blur}px)`,
                fontFamily,
                fontSize: isCenter ? 46 : 40,
                letterSpacing: 6,
                whiteSpace: "nowrap",
                color: "rgba(255,255,255,0.94)",
                textShadow: "0 2px 26px rgba(180,160,255,0.35)",
              }}
            >
              {l.text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
