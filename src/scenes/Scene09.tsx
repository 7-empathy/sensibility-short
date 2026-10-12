import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Subtitle } from "../components/Subtitle";

const LINES = [
  { text: "感性，", from: 60, to: 150 },
  { text: "是人类尚未被算法翻译的那部分。", from: 160, to: 270 },
  { text: "它不能被优化，不能被量化，", from: 280, to: 380 },
  { text: "只能被感受。", from: 390, to: 470 },
  { text: "而你，正感受着。", from: 480, to: 560 },
];

export const Scene09: React.FC = () => {
  const frame = useCurrentFrame();
  const dotOpacity = interpolate(frame, [0, 40, 480, 560], [0, 1, 1, 0], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dotScale = interpolate(frame, [0, 40], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });
  const breathe = 1 + Math.sin(frame / 22) * 0.12;

  return (
    <AbsoluteFill style={{ backgroundColor: "#07070A" }}>
      <div
        style={{
          position: "absolute", left: "50%", top: "38%",
          width: 12, height: 12, marginLeft: -6, marginTop: -6,
          borderRadius: "50%", background: "#FFFFFF",
          opacity: dotOpacity,
          transform: `scale(${dotScale * breathe})`,
          boxShadow:
            "0 0 50px 20px rgba(255,255,255,0.5), 0 0 100px 50px rgba(200,180,255,0.2)",
        }}
      />
      <Subtitle lines={LINES} />
    </AbsoluteFill>
  );
};
