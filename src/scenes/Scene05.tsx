import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../fonts";

const ITEMS = [
  { text: "我们总试图用语言去捕捉它，", at: 20 },
  { text: "却总在词不达意处，", at: 140 },
  { text: "触碰到一种更精确的模糊。", at: 260 },
  { text: "语言是感性的影子，不是它本身。", at: 380 },
];

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#07070A",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex", flexDirection: "column",
          gap: 40, alignItems: "center",
        }}
      >
        {ITEMS.map((it, i) => {
          const local = frame - it.at;
          if (local < 0) return null;
          const chars = Math.max(
            0,
            Math.min(it.text.length, Math.floor(local / 2.2))
          );
          const shown = it.text.slice(0, chars);
          const next = ITEMS[i + 1];
          let blur = 0;
          let op = 1;
          if (next) {
            const dt = frame - next.at;
            if (dt > 0) {
              blur = interpolate(dt, [0, 45], [0, 13], {
                easing: Easing.out(Easing.cubic),
                extrapolateRight: "clamp",
              });
              op = interpolate(dt, [0, 45], [1, 0.16], {
                easing: Easing.out(Easing.cubic),
                extrapolateRight: "clamp",
              });
            }
          }
          const isLast = i === ITEMS.length - 1;
          return (
            <div
              key={i}
              style={{
                fontFamily,
                fontSize: isLast ? 54 : 44,
                letterSpacing: 8,
                color: isLast ? "#FFFFFF" : "rgba(255,255,255,0.85)",
                filter: `blur(${blur}px)`,
                opacity: op,
                textShadow: isLast ? "0 0 36px rgba(200,180,255,0.35)" : "none",
              }}
            >
              {shown}
              {chars < it.text.length && <span style={{ opacity: 0.55 }}>|</span>}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
