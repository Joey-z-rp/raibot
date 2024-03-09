import {
  Action,
  ActionType,
  LimbPosition,
  Position,
} from "../../command-interface";
import { Limb } from "../limb";
import { Servo } from "../servo";
import { moveForwardSteps } from "./move-forward";
import { moveLegSteps } from "./move-leg";
import { restSteps } from "./rest";
import { standSteps } from "./stand";
import { ActionStep } from "./types";

const actionSteps: Record<ActionType, ActionStep<ActionType>[]> = {
  MOVE_LEG: moveLegSteps,
  STAND: standSteps,
  REST: restSteps,
  MOVE_FORWARD: moveForwardSteps,
};

export const executeAction = async (
  action: Action,
  limbs: Record<LimbPosition, Limb>,
  allServos: Record<Position, Servo>
) => {
  for (const step of actionSteps[action.type]) {
    await step(action, limbs, allServos);
  }
};
