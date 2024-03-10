import {
  Action,
  ActionType,
  LimbPosition,
  Position,
} from "../../command-interface";
import { delay } from "../../utils/delay";
import { Limb } from "../limb";
import { Servo } from "../servo";
import { moveBackwardSteps } from "./move-backward";
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
  MOVE_BACKWARD: moveBackwardSteps,
};

export const executeAction = async (
  action: Action,
  limbs: Record<LimbPosition, Limb>,
  allServos: Record<Position, Servo>
) => {
  let result = undefined;
  for (const step of actionSteps[action.type]) {
    result = await step(action, limbs, allServos, result);
    await delay(20);
  }
};
