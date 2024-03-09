import { Action, LimbPosition, Position } from "../../command-interface";
import { Limb } from "../limb";
import { Servo } from "../servo";

export type ActionStep = (
  action: Action,
  limbs: Record<LimbPosition, Limb>,
  allServos: Record<Position, Servo>
) => Promise<any>;
