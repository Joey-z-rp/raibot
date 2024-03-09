import { ActionStep } from "./types";

export const moveLegSteps: ActionStep<"MOVE_LEG">[] = [
  (action, limbs) => {
    const { position, direction, distance } = action.args;
    return limbs[position].moveLeg(direction, distance);
  },
];
