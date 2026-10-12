import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Subtitle } from "../components/Subtitle";

const LINES = [
  { text: "一种气味，能带你回到二十年前的夏天。", from: 20, to: 130 },
  { text: "一首歌，能让某个下午重新变得潮湿。", from: 140, to: 250 },
  { text: "记忆从不按时间排列，", from: 260, to: 370 },
  { text: "它按温度，按光线，按心跳的频率排列。", from: 380, to: 490 },
];

const BANDS = [
  { y: 120, h: 200, c: "rgba(255,160,140,0.20)", speed: 0.7, offset: 0 },
  { y: 340, h: 240, c: "rgba(255,140,190,0.18)", speed: -0.5, offset: 600 },
  { y: 580, h: 220, c: "rgba(200,170,255,0.20)", speed: 0.6, offset: 1200 },
  { y: 800, h: 180, c: "rgba(140,200,255,0.16)", speed: -0.9, offset: 400 },
];

const DUST = new Array(60).fill(0).map((_, i) => ({
  seed: i * 13.7,
  s: (i % 3) + 1,
  o: 0.3 + (i % 5) * 0.08,
}));

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#07070A" }}>
      {BANDS.map((b, i) => {
        const travel = (b.offset + frame * b.speed) % 2400;
        const x = travel - 240;
        return (
          <div
            key={i}
            style={{
              position: "absolute", top: b.y, left: x,
              width: 1200, height: b.h,
              background: `linear-gradient(90deg, transparent, ${b.c}, transparent)`,
              filter: "blur(50px)", opacity: 0.9,
            }}
          />
        );
      })}
      {DUST.map((d, i) => {
        const x = (d.seed * 71 + frame * 0.4) % 1920;
        const y = (d.seed * 97 + Math.sin(frame / 40 + i) * 30 + 1080) % 1080;
        return (
          <div
            key={i}
            style={{
              position: "absolute", left: x, top: y,
              width: d.s, height: d.s, borderRadius: "50%",
              background: "rgba(255,240,220,0.65)", opacity: d.o,
            }}
          />
        );
      })}
      <Subtitle lines={LINES} />
    </AbsoluteFill>
  );
};
