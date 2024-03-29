import { ActionStep, StartingCoordinates } from "./types";
import { getStatingCoordinates } from "./utils";

export const moveForwardSteps: ActionStep<
  "MOVE_FORWARD",
  StartingCoordinates
>[] = [
  async (_, limbs) => {
    const startingCoordinates = getStatingCoordinates(limbs);
    await Promise.all([
      limbs.frontLeft.moveTo(
        startingCoordinates.frontLeft.x + 10,
        startingCoordinates.frontLeft.y - 3
      ),
      limbs.rearRight.moveTo(
        startingCoordinates.rearRight.x + 10,
        startingCoordinates.rearRight.y - 3
      ),
      limbs.frontRight.moveTo(
        startingCoordinates.frontRight.x - 10,
        startingCoordinates.frontRight.y
      ),
      limbs.rearLeft.moveTo(
        startingCoordinates.rearLeft.x - 10,
        startingCoordinates.rearLeft.y
      ),
    ]);
    return startingCoordinates;
  },
  async (_, limbs, __, startingCoordinates) => {
    await Promise.all([
      limbs.frontLeft.moveTo(
        startingCoordinates.frontLeft.x + 20,
        startingCoordinates.frontLeft.y
      ),
      limbs.rearRight.moveTo(
        startingCoordinates.rearRight.x + 20,
        startingCoordinates.rearRight.y
      ),
      limbs.frontRight.moveTo(
        startingCoordinates.frontRight.x - 20,
        startingCoordinates.frontRight.y
      ),
      limbs.rearLeft.moveTo(
        startingCoordinates.rearLeft.x - 20,
        startingCoordinates.rearLeft.y
      ),
    ]);
    return startingCoordinates;
  },
  async (_, limbs, __, startingCoordinates) => {
    await Promise.all([
      limbs.frontLeft.moveTo(
        startingCoordinates.frontLeft.x - 10,
        startingCoordinates.frontLeft.y
      ),
      limbs.rearRight.moveTo(
        startingCoordinates.rearRight.x - 10,
        startingCoordinates.rearRight.y
      ),
      limbs.frontRight.moveTo(
        startingCoordinates.frontRight.x - 10,
        startingCoordinates.frontRight.y - 3
      ),
      limbs.rearLeft.moveTo(
        startingCoordinates.rearLeft.x - 10,
        startingCoordinates.rearLeft.y - 3
      ),
    ]);
    return startingCoordinates;
  },
  async (_, limbs, __, startingCoordinates) => {
    await Promise.all([
      limbs.frontLeft.moveTo(
        startingCoordinates.frontLeft.x,
        startingCoordinates.frontLeft.y
      ),
      limbs.rearRight.moveTo(
        startingCoordinates.rearRight.x,
        startingCoordinates.rearRight.y
      ),
      limbs.frontRight.moveTo(
        startingCoordinates.frontRight.x,
        startingCoordinates.frontRight.y
      ),
      limbs.rearLeft.moveTo(
        startingCoordinates.rearLeft.x,
        startingCoordinates.rearLeft.y
      ),
    ]);
    return startingCoordinates;
  },
];
