import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Subtitle } from "../components/Subtitle";

const LINES = [
  { text: "你在别人的故事里流过自己的眼泪，", from: 20, to: 130 },
  { text: "也在一个陌生人的背影里，", from: 140, to: 240 },
  { text: "认出了某种熟悉的东西。", from: 250, to: 350 },
  { text: "那一刻，孤独被拆穿，", from: 360, to: 450 },
  { text: "我们原来从未真正分开过。", from: 460, to: 530 },
];

const RIPPLES = [
  { x: 560, y: 380, at: 25, rgb: "255,180,140" },
  { x: 1380, y: 470, at: 145, rgb: "255,140,190" },
  { x: 960, y: 740, at: 255, rgb: "190,170,255" },
  { x: 400, y: 600, at: 365, rgb: "160,220,255" },
  { x: 1520, y: 620, at: 465, rgb: "255,200,150" },
];

export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#07070A" }}>
      {RIPPLES.map((r, i) => {
        const t = frame - r.at;
        if (t < 0) return null;
        const rad = interpolate(t, [0, 130], [0, 520], {
          easing: Easing.out(Easing.cubic),
          extrapolateRight: "clamp",
        });
        const op = interpolate(t, [0, 18, 100, 165], [0, 0.8, 0.32, 0], {
          extrapolateRight: "clamp",
        });
        const ring = 2 + (1 - Math.min(t / 130, 1)) * 2;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: r.x - rad, top: r.y - rad,
              width: rad * 2, height: rad * 2,
              borderRadius: "50%",
              border: `${ring}px solid rgba(${r.rgb},${op})`,
              boxShadow: `0 0 ${40 * (op + 0.2)}px rgba(${r.rgb},${op * 0.6}) inset`,
            }}
          />
        );
      })}
      <Subtitle lines={LINES} />
    </AbsoluteFill>
  );
};
