import React from "react";
import { Composition } from "remotion";
import { SensibilityShort } from "./SensibilityShort";

export const Root: React.FC = () => (
  <Composition
    id="SensibilityShort"
    component={SensibilityShort}
    durationInFrames={4500}
    fps={30}
    width={1920}
    height={1080}
  />
);
