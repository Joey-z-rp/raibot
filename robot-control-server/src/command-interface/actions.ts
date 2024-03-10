import { LimbPosition } from "./positions";

export type MoveLegDirection = "UP" | "DOWN" | "FORWARD" | "BACKWARD";

export const actionTypes = [
  "MOVE_LEG",
  "STAND",
  "REST",
  "MOVE_FORWARD",
  "MOVE_BACKWARD",
  "STEP_LEFT",
  "STEP_RIGHT",
  "TURN_LEFT",
  "TURN_RIGHT",
] as const;

export type ActionType = (typeof actionTypes)[number];

export type ActionArgs = {
  MOVE_LEG: {
    position: LimbPosition;
    direction: MoveLegDirection;
    distance: number;
  };
  STAND: {};
  REST: {};
  MOVE_FORWARD: {};
  MOVE_BACKWARD: {};
  STEP_LEFT: {};
  STEP_RIGHT: {};
  TURN_LEFT: {};
  TURN_RIGHT: {};
};

export type Action<T extends ActionType = any> = {
  type: T;
  args: ActionArgs[T];
  repeat: number;
};
