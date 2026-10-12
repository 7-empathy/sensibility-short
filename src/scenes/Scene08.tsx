import React from "react";
import {
  AbsoluteFill, Easing, interpolate, random, useCurrentFrame,
} from "remotion";
import { Subtitle } from "../components/Subtitle";

const LINES = [
  { text: "感性让你柔软，", from: 20, to: 130 },
  { text: "也让你容易被划伤。", from: 140, to: 250 },
  { text: "但正是这些伤口，", from: 260, to: 360 },
  { text: "让你能认出另一个人的疼。", from: 370, to: 490 },
];

const CRACKS = new Array(28).fill(0).map((_, i) => {
  const angle = (i / 28) * Math.PI * 2 + random(`ca${i}`) * 0.4;
  const len = random(`cl${i}`) * 420 + 180;
  const delay = 60 + random(`cd${i}`) * 280;
  return { angle, len, delay };
});

export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#07070A" }}>
      <div
        style={{
          position: "absolute", left: "50%", top: "50%",
          width: 16, height: 16, marginLeft: -8, marginTop: -8,
          borderRadius: "50%", background: "#FFFFFF",
          boxShadow:
            "0 0 40px 16px rgba(255,200,180,0.7), 0 0 90px 40px rgba(255,160,140,0.3)",
          opacity: interpolate(frame, [0, 40, 420, 500], [0, 1, 1, 0.4], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <svg
        width={1920} height={1080} viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        {CRACKS.map((c, i) => {
          const p = interpolate(frame, [c.delay, c.delay + 60], [0, 1], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const x2 = 960 + Math.cos(c.angle) * c.len;
          const y2 = 540 + Math.sin(c.angle) * c.len;
          return (
            <line
              key={i}
              x1={960} y1={540} x2={x2} y2={y2}
              stroke={`rgba(255,${180 + (i % 40)},${160 + (i % 60)},0.85)`}
              strokeWidth={1.4}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - p}
              style={{ filter: "drop-shadow(0 0 6px rgba(255,180,160,0.6))" }}
            />
          );
        })}
      </svg>
      <Subtitle lines={LINES} />
    </AbsoluteFill>
  );
};
