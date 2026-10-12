import React from "react";
import {
  AbsoluteFill, Easing, interpolate, random, spring,
  useCurrentFrame, useVideoConfig,
} from "remotion";
import { Subtitle } from "../components/Subtitle";

const LINES = [
  { text: "你闭上眼，世界没有消失。", from: 20, to: 110 },
  { text: "它只是变成了另一种存在——", from: 120, to: 220 },
  { text: "风有重量，沉默有温度，", from: 230, to: 330 },
  { text: "而一段回忆，会在某个瞬间让胸口微微发紧。", from: 340, to: 460 },
];

const PARTICLES = new Array(110).fill(0).map((_, i) => ({
  x: random(`px${i}`) * 1920,
  y: random(`py${i}`) * 1080,
  r: random(`pr${i}`) * 2.2 + 0.8,
  s: random(`ps${i}`) * 0.5 + 0.15,
  o: random(`po${i}`) * 0.5 + 0.15,
}));

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dot = spring({ fps, frame, config: { damping: 14, stiffness: 70 } });
  const breathe = Math.sin(frame / 22) * 0.1 + 1;
  const dotScale = dot * breathe;
  const glowR = interpolate(frame, [0, 130], [0, 460], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });
  const glowO = interpolate(frame, [0, 50, 140, 480], [0, 0.55, 0.35, 0.25], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#07070A" }}>
      {PARTICLES.map((p, i) => {
        const drift = frame * p.s;
        const x = (p.x + drift * 26) % 1920;
        const y = (p.y + Math.sin(drift * 0.6 + i) * 36 + 1080) % 1080;
        const appear = interpolate(frame, [0, 30], [0, 1], {
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute", left: x, top: y,
              width: p.r * 2, height: p.r * 2, borderRadius: "50%",
              background: "#DCD2FF", opacity: p.o * appear,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute", left: "50%", top: "50%",
          width: glowR * 2, height: glowR * 2,
          marginLeft: -glowR, marginTop: -glowR, borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(190,170,255,0.45) 0%, rgba(120,100,200,0.18) 42%, rgba(0,0,0,0) 72%)",
          opacity: glowO,
        }}
      />
      <div
        style={{
          position: "absolute", left: "50%", top: "50%",
          width: 14, height: 14, marginLeft: -7, marginTop: -7,
          borderRadius: "50%", background: "#F2ECFF",
          transform: `scale(${dotScale})`,
          boxShadow:
            "0 0 30px 10px rgba(200,180,255,0.55), 0 0 80px 30px rgba(140,110,220,0.25)",
        }}
      />
      <Subtitle lines={LINES} />
    </AbsoluteFill>
  );
};
