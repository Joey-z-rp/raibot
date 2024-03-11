import {
  ActionStep,
  StartingCoordinates,
  StartingShoulderAngles,
} from "./types";
import { getStartingShoulderAngles, getStatingCoordinates } from "./utils";

export const stepLeftSteps: ActionStep<
  "STEP_LEFT",
  { coordinates: StartingCoordinates; angles: StartingShoulderAngles }
>[] = [
    async (_, limbs, allServos) => {
      const coordinates = getStatingCoordinates(limbs);
      const angles = getStartingShoulderAngles(allServos);

      await Promise.all([
        limbs.rearRight.moveTo(
          coordinates.rearRight.x,
          coordinates.rearRight.y - 3
        ),
        allServos.rearRightShoulder.setTargetAngle(angles.rearRightShoulder - 10),
      ]);
      return { coordinates, angles };
    },
    async (_, limbs, allServos, { coordinates, angles }) => {
      await Promise.all([
        limbs.frontLeft.moveTo(
          coordinates.frontLeft.x,
          coordinates.frontLeft.y - 3
        ),
        allServos.frontLeftShoulder.setTargetAngle(angles.frontLeftShoulder - 10),
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
          angles.frontRightShoulder + 10
        ),
        allServos.rearLeftShoulder.setTargetAngle(angles.rearLeftShoulder + 10),
      ]);
      return { coordinates, angles };
    },

    async (_, limbs, allServos, { coordinates, angles }) => {
      await Promise.all([
        limbs.rearLeft.moveTo(
          coordinates.rearRight.x,
          coordinates.rearRight.y - 3
        ),
        allServos.rearLeftShoulder.setTargetAngle(angles.rearLeftShoulder),
      ]);
      return { coordinates, angles };
    },
    async (_, limbs, allServos, { coordinates, angles }) => {
      await Promise.all([
        limbs.rearLeft.moveTo(
          coordinates.rearRight.x,
          coordinates.rearRight.y - 3
        ),
        allServos.rearLeftShoulder.setTargetAngle(angles.rearLeftShoulder),
      ]);
      return { coordinates, angles };
    },
    async (_, limbs, allServos, { coordinates, angles }) => {
      await Promise.all([
        limbs.frontRight.moveTo(
          coordinates.frontRight.x,
          coordinates.frontRight.y - 3
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
  ]