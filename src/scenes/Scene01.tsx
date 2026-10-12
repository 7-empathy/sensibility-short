import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Subtitle } from "../components/Subtitle";

const LINES = [
  { text: "如果有一天，", from: 150, to: 220 },
  { text: "你不再为一件事心动，", from: 230, to: 300 },
  { text: "你还是你吗？", from: 310, to: 355 },
];

const PARTICLES = new Array(90).fill(0).map((_, i) => ({
  x0: random(`x${i}`) * 1920,
  y0: random(`y${i}`) * 1080,
  angle: random(`a${i}`) * Math.PI * 2,
  dist: random(`d${i}`) * 500 + 120,
  size: random(`s${i}`) * 2.5 + 1,
  hue: random(`h${i}`) * 60 + 250,
}));

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const converge = interpolate(frame, [0, 140], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateRight: "clamp",
  });
  const scatter = interpolate(frame, [180, 300], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const t = converge * (1 - scatter);
  const glowR = interpolate(frame, [80, 180, 260, 340], [0, 200, 180, 60], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });
  const glowO = interpolate(frame, [80, 160, 280, 355], [0, 0.7, 0.5, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#07070A" }}>
      {PARTICLES.map((p, i) => {
        const targetR = p.dist * (1 - t * 0.75);
        const targetX = 960 + Math.cos(p.angle) * targetR;
        const targetY = 540 + Math.sin(p.angle) * targetR;
        const x = p.x0 + (targetX - p.x0) * t;
        const y = p.y0 + (targetY - p.y0) * t;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x, top: y,
              width: p.size * 2, height: p.size * 2,
              marginLeft: -p.size, marginTop: -p.size,
              borderRadius: "50%",
              background: `hsl(${p.hue}, 70%, 75%)`,
              opacity: 0.5 + t * 0.5,
              boxShadow: `0 0 ${8 + t * 14}px hsla(${p.hue}, 80%, 70%, ${0.4 + t * 0.5})`,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          left: "50%", top: "50%",
          width: glowR * 2, height: glowR * 2,
          marginLeft: -glowR, marginTop: -glowR,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(210,190,255,0.55) 0%, rgba(150,120,220,0.2) 40%, rgba(0,0,0,0) 72%)",
          opacity: glowO,
        }}
      />
      <Subtitle lines={LINES} position="center" />
    </AbsoluteFill>
  );
};
