import { robot } from "..";
import { ActionStep } from "./types";

export const restSteps: ActionStep<"REST">[] = [
  (_, __, allServos) => {
    return Promise.all(
      Object.entries(allServos).map(([position, servo]) =>
        servo.setTargetAngle(robot.postures.REST[position])
      )
    );
  },
];
