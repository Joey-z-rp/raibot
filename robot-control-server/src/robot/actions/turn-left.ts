import {
  ActionStep,
  StartingCoordinates,
  StartingShoulderAngles,
} from "./types";
import { getStartingShoulderAngles, getStatingCoordinates } from "./utils";

export const turnLeftSteps: ActionStep<
  "TURN_LEFT",
  { coordinates: StartingCoordinates; angles: StartingShoulderAngles }
>[] = [
  async (_, limbs, allServos) => {
    const coordinates = getStatingCoordinates(limbs);
    const angles = getStartingShoulderAngles(allServos);

    await Promise.all([
      limbs.rearRight.moveTo(
        coordinates.rearRight.x,
        coordinates.rearRight.y - 5
      ),
      allServos.rearRightShoulder.setTargetAngle(angles.rearRightShoulder + 12),
    ]);
    return { coordinates, angles };
  },
  async (_, limbs, allServos, { coordinates, angles }) => {
    await Promise.all([
      limbs.frontLeft.moveTo(
        coordinates.frontLeft.x,
        coordinates.frontLeft.y - 5
      ),
      allServos.frontLeftShoulder.setTargetAngle(angles.frontLeftShoulder - 12),
    ]);
    return { coordinates, angles };
  },
  async (_, limbs, allServos, { coordinates, angles }) => {
    await Promise.all([
      limbs.frontLeft.moveTo(coordinates.frontLeft.x, coordinates.frontLeft.y),
      limbs.rearRight.moveTo(coordinates.rearRight.x, coordinates.rearRight.y),
    ]);
    return { coordinates, angles };
  },
  async (_, limbs, allServos, { coordinates, angles }) => {
    await Promise.all([
      allServos.frontLeftShoulder.setTargetAngle(angles.frontLeftShoulder),
      allServos.rearRightShoulder.setTargetAngle(angles.rearRightShoulder),
      allServos.frontRightShoulder.setTargetAngle(
        angles.frontRightShoulder + 12
      ),
      allServos.rearLeftShoulder.setTargetAngle(angles.rearLeftShoulder - 12),
    ]);
    return { coordinates, angles };
  },
  async (_, limbs, allServos, { coordinates, angles }) => {
    await Promise.all([
      limbs.rearLeft.moveTo(coordinates.rearLeft.x, coordinates.rearLeft.y - 5),
      allServos.rearLeftShoulder.setTargetAngle(angles.rearLeftShoulder),
    ]);
    return { coordinates, angles };
  },
  async (_, limbs, allServos, { coordinates, angles }) => {
    await Promise.all([
      limbs.frontRight.moveTo(
        coordinates.frontRight.x,
        coordinates.frontRight.y - 5
      ),
      allServos.frontRightShoulder.setTargetAngle(angles.frontRightShoulder),
    ]);
    return { coordinates, angles };
  },
  async (_, limbs, allServos, { coordinates, angles }) => {
    await Promise.all([
      allServos.frontLeftShoulder.setTargetAngle(angles.frontLeftShoulder),
      allServos.rearRightShoulder.setTargetAngle(angles.rearRightShoulder),
      limbs.frontRight.moveTo(
        coordinates.frontRight.x,
        coordinates.frontRight.y
      ),
      allServos.frontRightShoulder.setTargetAngle(angles.frontRightShoulder),
      limbs.rearLeft.moveTo(coordinates.rearLeft.x, coordinates.rearLeft.y),
      allServos.rearLeftShoulder.setTargetAngle(angles.rearLeftShoulder),
    ]);
    return { coordinates, angles };
  },
];