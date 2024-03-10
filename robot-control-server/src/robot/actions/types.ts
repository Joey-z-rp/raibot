import {
  Action,
  ActionType,
  LimbPosition,
  Position,
  ShoulderServoPosition,
} from "../../command-interface";
import { Limb } from "../limb";
import { Servo } from "../servo";

export type ActionStep<T extends ActionType, R extends any = any> = (
  action: Action<T>,
  limbs: Record<LimbPosition, Limb>,
  allServos: Record<Position, Servo>,
  argsFromLastStep?: R
) => Promise<R>;

export type StartingCoordinates = Record<
  LimbPosition,
  { x: number; y: number }
>;

export type StartingShoulderAngles = Record<ShoulderServoPosition, number>;
