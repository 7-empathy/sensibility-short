import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Scene01 } from "./scenes/Scene01";
import { Scene02 } from "./scenes/Scene02";
import { Scene03 } from "./scenes/Scene03";
import { Scene04 } from "./scenes/Scene04";
import { Scene05 } from "./scenes/Scene05";
import { Scene06 } from "./scenes/Scene06";
import { Scene07 } from "./scenes/Scene07";
import { Scene08 } from "./scenes/Scene08";
import { Scene09 } from "./scenes/Scene09";

const SCENES: { C: React.FC; d: number }[] = [
  { C: Scene01, d: 360 },
  { C: Scene02, d: 480 },
  { C: Scene03, d: 480 },
  { C: Scene04, d: 510 },
  { C: Scene05, d: 510 },
  { C: Scene06, d: 540 },
  { C: Scene07, d: 540 },
  { C: Scene08, d: 510 },
  { C: Scene09, d: 570 },
];

const Fade: React.FC<{ duration: number; children: React.ReactNode }> = ({
  duration,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 12, duration - 12, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const scale = interpolate(
    frame,
    [0, 20, duration - 20, duration],
    [0.985, 1, 1, 1.015],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return (
    <AbsoluteFill style={{ opacity, transform: `scale(${scale})` }}>
      {children}
    </AbsoluteFill>
  );
};

export const SensibilityShort: React.FC = () => {
  let acc = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#07070A" }}>
      {SCENES.map((s, i) => {
        const from = acc;
        acc += s.d;
        const Comp = s.C;
        return (
          <Sequence key={i} from={from} durationInFrames={s.d}>
            <Fade duration={s.d}>
              <Comp />
            </Fade>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
