import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Subtitle } from "../components/Subtitle";

const LINES = [
  { text: "理性帮你判断对错，感性帮你判断值不值得。", from: 20, to: 140 },
  { text: "理性计算距离，", from: 185, to: 290 },
  { text: "感性决定谁值得翻山越岭。", from: 300, to: 410 },
  { text: "它们从不对立，只是用不同的方式爱你。", from: 420, to: 530 },
];

const LEFT = [0, 1, 2, 3, 4, 5].map((i) => ({
  y: 280 + i * 100,
  w: 260 + ((i * 137) % 3) * 130,
  d: 15 + i * 10,
}));

const RIGHT_CURVES = [
  "M 1920 260 C 1700 320 1560 420 1500 560",
  "M 1920 420 C 1740 470 1610 560 1540 680",
  "M 1920 580 C 1760 620 1650 700 1580 800",
  "M 1920 740 C 1790 770 1700 830 1640 900",
];

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const flash = interpolate(frame, [150, 156, 178], [0, 0.92, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#07070A" }}>
      {LEFT.map((l, i) => {
        const p = interpolate(frame, [l.d, l.d + 45], [0, 1], {
          easing: Easing.out(Easing.cubic),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute", left: 0, top: l.y,
              height: 2, width: l.w,
              background:
                "linear-gradient(90deg, rgba(120,180,255,0.95), rgba(120,180,255,0))",
              transform: `scaleX(${p})`,
              transformOrigin: "left center",
              boxShadow: "0 0 18px rgba(120,180,255,0.45)",
            }}
          />
        );
      })}
      <svg
        width={1920} height={1080} viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        {RIGHT_CURVES.map((d, i) => {
          const p = interpolate(frame, [15 + i * 12, 15 + i * 12 + 55], [0, 1], {
            easing: Easing.inOut(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="rgba(255,150,110,0.9)"
              strokeWidth={2}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - p}
              style={{ filter: "drop-shadow(0 0 10px rgba(255,140,100,0.5))" }}
            />
          );
        })}
      </svg>
      <AbsoluteFill style={{ backgroundColor: "#FFFFFF", opacity: flash }} />
      <Subtitle lines={LINES} />
    </AbsoluteFill>
  );
};
