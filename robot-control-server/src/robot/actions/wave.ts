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
        startingCoordinates.frontLeft.x - 30,
        startingCoordinates.frontLeft.y + 30
      ),
      limbs.frontRight.moveTo(
        startingCoordinates.frontRight.x - 30,
        startingCoordinates.frontRight.y + 30
      ),
    ]);
    return { angles, startingCoordinates };
  },
  async (_, __, allServos, { angles, startingCoordinates }) => {
    await Promise.all([
      allServos.frontRightShoulder.setTargetAngle(
        angles.frontRightShoulder + 60
      ),
    ]);
    return { angles, startingCoordinates };
  },
  async (_, limbs, __, { angles, startingCoordinates }) => {
    await Promise.all([
      limbs.frontRight.moveTo(
        startingCoordinates.frontRight.x - 10,
        startingCoordinates.frontRight.y + 10
      ),
    ]);
    return { angles, startingCoordinates };
  },
  async (_, __, allServos, { angles, startingCoordinates }) => {
    await Promise.all([
      allServos.frontRightShoulder.setTargetAngle(
        angles.frontRightShoulder + 50
      ),
    ]);
    return { angles, startingCoordinates };
  },
  async (_, limbs, __, { angles, startingCoordinates }) => {
    await Promise.all([
      limbs.frontRight.moveTo(
        startingCoordinates.frontRight.x - 30,
        startingCoordinates.frontRight.y + 30
      ),
    ]);
    return { angles, startingCoordinates };
  },
  async (_, __, allServos, { angles, startingCoordinates }) => {
    await Promise.all([
      allServos.frontRightShoulder.setTargetAngle(
        angles.frontRightShoulder + 60
      ),
    ]);
    return { angles, startingCoordinates };
  },
  async (_, limbs, __, { angles, startingCoordinates }) => {
    await Promise.all([
      limbs.frontRight.moveTo(
        startingCoordinates.frontRight.x - 10,
        startingCoordinates.frontRight.y + 10
      ),
    ]);
    return { angles, startingCoordinates };
  },
  async (_, __, allServos, { angles, startingCoordinates }) => {
    await Promise.all([
      allServos.frontRightShoulder.setTargetAngle(
        angles.frontRightShoulder + 50
      ),
    ]);
    return { angles, startingCoordinates };
  },
  async (_, limbs, __, { angles, startingCoordinates }) => {
    await Promise.all([
      limbs.frontRight.moveTo(
        startingCoordinates.frontRight.x - 30,
        startingCoordinates.frontRight.y + 30
      ),
    ]);
    return { angles, startingCoordinates };
  },
  async (_, __, allServos, { angles, startingCoordinates }) => {
    await Promise.all([
      allServos.frontRightShoulder.setTargetAngle(
        angles.frontRightShoulder + 60
      ),
    ]);
    return { angles, startingCoordinates };
  },
  async (_, limbs, __, { angles, startingCoordinates }) => {
    await Promise.all([
      limbs.frontRight.moveTo(
        startingCoordinates.frontRight.x - 10,
        startingCoordinates.frontRight.y + 10
      ),
    ]);
    return { angles, startingCoordinates };
  },
  async (_, __, allServos, { angles, startingCoordinates }) => {
    await Promise.all([
      allServos.frontRightShoulder.setTargetAngle(
        angles.frontRightShoulder + 50
      ),
    ]);
    return { angles, startingCoordinates };
  },
  async (_, limbs, __, { angles, startingCoordinates }) => {
    await Promise.all([
      limbs.frontRight.moveTo(
        startingCoordinates.frontRight.x - 30,
        startingCoordinates.frontRight.y + 30
      ),
    ]);
    return { angles, startingCoordinates };
  },
  async (_, __, allServos, { angles, startingCoordinates }) => {
    await Promise.all([
      allServos.frontRightShoulder.setTargetAngle(
        angles.frontRightShoulder + 60
      ),
    ]);
    return { angles, startingCoordinates };
  },
  async (_, limbs, __, { angles, startingCoordinates }) => {
    await Promise.all([
      limbs.frontRight.moveTo(
        startingCoordinates.frontRight.x - 10,
        startingCoordinates.frontRight.y + 10
      ),
    ]);
    return { angles, startingCoordinates };
  },
  async (_, __, allServos, { angles, startingCoordinates }) => {
    await Promise.all([
      allServos.frontRightShoulder.setTargetAngle(
        angles.frontRightShoulder + 50
      ),
    ]);
    return { angles, startingCoordinates };
  },
  async (_, limbs, __, { angles, startingCoordinates }) => {
    await Promise.all([
      limbs.frontRight.moveTo(
        startingCoordinates.frontRight.x - 30,
        startingCoordinates.frontRight.y + 30
      ),
    ]);
    return { angles, startingCoordinates };
  },
  async (_, __, allServos, { angles, startingCoordinates }) => {
    await Promise.all([
      allServos.frontRightShoulder.setTargetAngle(
        angles.frontRightShoulder + 60
      ),
    ]);
    return { angles, startingCoordinates };
  },
  (_, __, allServos) => {
    return Promise.all(
      Object.entries(allServos).map(([position, servo]) =>
        servo.setTargetAngle(robot.postures.STAND[position])
      )
    );
  },
];
