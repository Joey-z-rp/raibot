import { LimbPosition } from "./positions";

export type MoveLegDirection = "UP" | "DOWN" | "FORWARD" | "BACKWARD";

export const actionTypes = ["MOVE_LEG"] as const;

export type ActionType = (typeof actionTypes)[number];

export type ActionArgs = {
  MOVE_LEG: {
    position: LimbPosition;
    direction: MoveLegDirection;
    distance: number;
  };
};

export type Action = {
  type: ActionType;
  args: ActionArgs[ActionType];
  repeat: number;
};
