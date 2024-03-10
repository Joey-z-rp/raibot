import {
  LimbPosition,
  Position,
  limbPositions,
  shoulderServoPositions,
} from "../../command-interface";
import { Limb } from "../limb";
import { Servo } from "../servo";
import { StartingCoordinates, StartingShoulderAngles } from "./types";

export const getStatingCoordinates = (limbs: Record<LimbPosition, Limb>) =>
  limbPositions.reduce(
    (coordinates, position) => ({
      ...coordinates,
      [position]: limbs[position].getCurrentCoordinate(),
    }),
    {} as StartingCoordinates
  );

export const getStartingShoulderAngles = (allServos: Record<Position, Servo>) =>
  shoulderServoPositions.reduce(
    (angles, position) => ({
      ...angles,
      [position]: allServos[position].currentAngle,
    }),
    {} as StartingShoulderAngles
  );
