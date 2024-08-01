import { LimbPosition } from "./positions";

export type MoveLegDirection = "UP" | "DOWN" | "FORWARD" | "BACKWARD";

export const actionTypes = [
  "MOVE_LEG",
  "STAND",
  "REST",
  "WAVE",
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
  WAVE: {};
  MOVE_FORWARD: {};
  MOVE_BACKWARD: {};
  STEP_LEFT: {};
  STEP_RIGHT: {};
  TURN_LEFT: {};
  TURN_RIGHT: {};
};

export type Action<T extends ActionType = ActionType> = {
  type: T;
  args: ActionArgs[T];
  repeat: number;
  delay?: number;
};
