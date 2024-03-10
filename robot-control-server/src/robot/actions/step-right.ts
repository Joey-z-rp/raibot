import {
  ActionStep,
  StartingCoordinates,
  StartingShoulderAngles,
} from "./types";
import { getStartingShoulderAngles, getStatingCoordinates } from "./utils";

export const stepRightSteps: ActionStep<
  "STEP_RIGHT",
  { coordinates: StartingCoordinates; angles: StartingShoulderAngles }
>[] = [
  async (_, limbs, allServos) => {
    const coordinates = getStatingCoordinates(limbs);
    const angles = getStartingShoulderAngles(allServos);

    await Promise.all([
      limbs.frontLeft.moveTo(
        coordinates.frontLeft.x,
        coordinates.frontLeft.y - 3
      ),
      allServos.frontLeftShoulder.setTargetAngle(angles.frontLeftShoulder + 4),
      limbs.rearRight.moveTo(
        coordinates.rearRight.x,
        coordinates.rearRight.y - 3
      ),
      allServos.rearRightShoulder.setTargetAngle(angles.rearRightShoulder + 4),
      allServos.frontRightShoulder.setTargetAngle(
        angles.frontRightShoulder - 4
      ),
      allServos.rearLeftShoulder.setTargetAngle(angles.rearLeftShoulder - 4),
    ]);
    return { coordinates, angles };
  },
  async (_, limbs, allServos, { coordinates, angles }) => {
    await Promise.all([
      limbs.frontLeft.moveTo(coordinates.frontLeft.x, coordinates.frontLeft.y),
      allServos.frontLeftShoulder.setTargetAngle(angles.frontLeftShoulder + 8),
      limbs.rearRight.moveTo(coordinates.rearRight.x, coordinates.rearRight.y),
      allServos.rearRightShoulder.setTargetAngle(angles.rearRightShoulder + 8),
      allServos.frontRightShoulder.setTargetAngle(
        angles.frontRightShoulder - 8
      ),
      allServos.rearLeftShoulder.setTargetAngle(angles.rearLeftShoulder - 8),
    ]);
    return { coordinates, angles };
  },
  async (_, limbs, allServos, { coordinates, angles }) => {
    await Promise.all([
      allServos.frontLeftShoulder.setTargetAngle(angles.frontLeftShoulder + 4),
      allServos.rearRightShoulder.setTargetAngle(angles.rearRightShoulder + 4),
      limbs.frontRight.moveTo(
        coordinates.frontRight.x,
        coordinates.frontRight.y - 3
      ),
      allServos.frontRightShoulder.setTargetAngle(
        angles.frontRightShoulder - 4
      ),
      limbs.rearLeft.moveTo(coordinates.rearLeft.x, coordinates.rearLeft.y - 3),
      allServos.rearLeftShoulder.setTargetAngle(angles.rearLeftShoulder - 4),
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
