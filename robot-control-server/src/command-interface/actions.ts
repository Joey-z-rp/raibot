import { LimbPosition } from "./positions";

export type MoveLegDirection = "UP" | "DOWN" | "FORWARD" | "BACKWARD";

export const actionTypes = [
  "MOVE_LEG",
  "STAND",
  "REST",
  "MOVE_FORWARD",
  "MOVE_BACKWARD",
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
};

export type Action<T extends ActionType = any> = {
  type: T;
  args: ActionArgs[T];
  repeat: number;
};
