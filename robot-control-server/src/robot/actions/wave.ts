import { robot } from "..";
import { ActionStep } from "./types";
import { getStartingShoulderAngles, getStatingCoordinates } from "./utils";

export const waveSteps: ActionStep<"WAVE">[] = [
  (_, __, allServos) => {
    return Promise.all(
      Object.entries(allServos).map(([position, servo]) =>
        servo.setTargetAngle(robot.postures.REST[position])
      )
    );
  },
  async (_, limbs, allServos) => {
    const startingCoordinates = getStatingCoordinates(limbs);
    const angles = getStartingShoulderAngles(allServos);

    await Promise.all([
      limbs.frontLeft.moveTo(
        startingCoordinates.frontLeft.x,
        startingCoordinates.frontLeft.y + 10
      ),
      limbs.frontRight.moveTo(
        startingCoordinates.frontRight.x,
        startingCoordinates.frontRight.y + 10
      ),
      allServos.frontRightShoulder.setTargetAngle(
        angles.frontRightShoulder + 10
      ),
    ]);
    return { angles };
  },
  async (_, __, allServos, { angles }) => {
    await Promise.all([
      allServos.frontRightShoulder.setTargetAngle(
        angles.frontRightShoulder - 10
      ),
    ]);
    return { angles };
  },
  async (_, __, allServos, { angles }) => {
    await Promise.all([
      allServos.frontRightShoulder.setTargetAngle(
        angles.frontRightShoulder + 10
      ),
    ]);
    return { angles };
  },
  (_, __, allServos) => {
    return Promise.all(
      Object.entries(allServos).map(([position, servo]) =>
        servo.setTargetAngle(robot.postures.STAND[position])
      )
    );
  },
];
