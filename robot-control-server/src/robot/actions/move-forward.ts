import { ActionStep } from "./types";

export const moveForwardSteps: ActionStep<"MOVE_FORWARD">[] = [
  (_, limbs) => {
    return Promise.all([
      limbs.frontLeft.moveLeg("UP", 4),
      limbs.rearRight.moveLeg("UP", 4),
    ]);
  },
  (_, limbs) => {
    return Promise.all([
      limbs.frontLeft.moveLeg("FORWARD", 4),
      limbs.rearRight.moveLeg("FORWARD", 4),
    ]);
  },
  (_, limbs) => {
    return Promise.all([
      limbs.frontLeft.moveLeg("DOWN", 4),
      limbs.rearRight.moveLeg("DOWN", 4),
    ]);
  },
  (_, limbs) => {
    return Promise.all([
      limbs.frontRight.moveLeg("UP", 4),
      limbs.rearLeft.moveLeg("UP", 4),
    ]);
  },
  (_, limbs) => {
    return Promise.all([
      limbs.frontRight.moveLeg("FORWARD", 4),
      limbs.rearLeft.moveLeg("FORWARD", 4),
    ]);
  },
  (_, limbs) => {
    return Promise.all([
      limbs.frontRight.moveLeg("DOWN", 4),
      limbs.rearLeft.moveLeg("DOWN", 4),
    ]);
  },
];
