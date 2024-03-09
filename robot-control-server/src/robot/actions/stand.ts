import { robot } from "..";
import { ActionStep } from "./types";

export const standSteps: ActionStep<"STAND">[] = [
  (_, __, allServos) => {
    return Promise.all(
      Object.entries(allServos).map(([position, servo]) =>
        servo.setTargetAngle(robot.postures.STAND[position])
      )
    );
  },
];
