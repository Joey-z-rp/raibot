import {
  Action,
  ActionType,
  LimbPosition,
  Position,
} from "../../command-interface";
import { Limb } from "../limb";
import { Servo } from "../servo";

export type ActionStep<T extends ActionType, R extends any = any> = (
  action: Action<T>,
  limbs: Record<LimbPosition, Limb>,
  allServos: Record<Position, Servo>,
  argsFromLastStep?: R
) => Promise<R>;
