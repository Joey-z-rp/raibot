import {
  Action,
  ActionType,
  LimbPosition,
  Position,
} from "../../command-interface";
import { Limb } from "../limb";
import { Servo } from "../servo";
import { moveLegSteps } from "./move-leg";
import { ActionStep } from "./types";

const actionSteps: Record<ActionType, ActionStep[]> = {
  MOVE_LEG: moveLegSteps,
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
