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
import { stepLeftSteps } from "./step-left";
import { stepRightSteps } from "./step-right";
import { turnLeftSteps } from "./turn-left";
import { turnRightSteps } from "./turn-right";
import { ActionStep } from "./types";

const actionSteps: Record<ActionType, ActionStep<ActionType>[]> = {
  MOVE_LEG: moveLegSteps,
  STAND: standSteps,
  REST: restSteps,
  MOVE_FORWARD: moveForwardSteps,
  MOVE_BACKWARD: moveBackwardSteps,
  STEP_LEFT: stepLeftSteps,
  STEP_RIGHT: stepRightSteps,
  TURN_LEFT: turnLeftSteps,
  TURN_RIGHT: turnRightSteps,
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
