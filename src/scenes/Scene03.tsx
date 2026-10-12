import React from "react";
import {
  AbsoluteFill, Easing, interpolate, spring,
  useCurrentFrame, useVideoConfig,
} from "remotion";
import { Subtitle } from "../components/Subtitle";

const LINES = [
  { text: "感动的时候，眼眶会先于理智做出反应。", from: 20, to: 130 },
  { text: "那是身体替你做的决定。", from: 140, to: 250 },
  { text: "心跳、呼吸、指尖的微颤——", from: 260, to: 360 },
  { text: "都是它写给你的信。", from: 370, to: 460 },
];

const HEAD =
  "M 960 300 C 895 300 860 348 860 402 C 860 458 895 500 960 500 C 1025 500 1060 458 1060 402 C 1060 348 1025 300 960 300 Z";
const BODY =
  "M 960 505 C 895 525 825 568 795 648 C 765 728 778 806 808 876 C 828 922 898 936 960 936 C 1022 936 1092 922 1112 876 C 1142 806 1155 728 1125 648 C 1095 568 1025 525 960 505 Z";
const ARMS =
  "M 800 648 C 728 690 688 768 678 858 M 1120 648 C 1192 690 1232 768 1242 858";

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = (start: number, dur: number) =>
    interpolate(frame, [start, start + dur], [0, 1], {
      easing: Easing.inOut(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  const p1 = draw(10, 60);
  const p2 = draw(60, 70);
  const p3 = draw(120, 50);
  const pulse = spring({
    fps, frame: frame - 120,
    config: { damping: 12, stiffness: 60 },
  });
  const fadeOutPulse = interpolate(frame, [380, 470], [0, 1], {
    extrapolateRight: "clamp",
  });
  const pulseO = interpolate(pulse, [0, 1], [0, 0.7]) * (1 - fadeOutPulse * 0.7);

  const stroke = "rgba(220,205,255,0.85)";
  const common = {
    fill: "none", stroke, strokeWidth: 2,
    strokeLinecap: "round" as const,
    pathLength: 1, strokeDasharray: 1,
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#07070A" }}>
      <svg
        width={1920} height={1080} viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <path d={HEAD} {...common} strokeDashoffset={1 - p1} />
        <path d={BODY} {...common} strokeDashoffset={1 - p2} />
        <path d={ARMS} {...common} strokeDashoffset={1 - p3} />
      </svg>
      <div
        style={{
          position: "absolute", left: 960 - 160, top: 520 - 160,
          width: 320, height: 320, borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,170,150,0.55) 0%, rgba(255,120,140,0.18) 45%, rgba(0,0,0,0) 72%)",
          opacity: pulseO,
        }}
      />
      <Subtitle lines={LINES} />
    </AbsoluteFill>
  );
};
