import { Action } from "./actions";
import { Position } from "./positions";

export type Posture = "STAND" | "REST";

export type RenderLedAction = "FLOW_COLOR" | "OFF";

export type CaptureImageAction = "STILL" | "VIDEO" | "OFF";

export const availableCommands = [
  "MOVE",
  "TURN_TO_ANGLE",
  "SAVE_POSTURE",
  "PERFORM_ACTIONS",
  "STOP_ACTIONS",
  "SET_SPEED",
  "RENDER_LED",
  "MEASURE_DISTANCE",
  "CAPTURE_IMAGE",
  "GET_ENV_UPDATES",
] as const;

export type Command = (typeof availableCommands)[number];

export type CommandArguments = {
  MOVE: {
    position: Position;
    amount: number;
  };
  TURN_TO_ANGLE: {
    position: Position;
    angle: number;
  };
  SAVE_POSTURE: {
    postureName: Posture;
  };
  PERFORM_ACTIONS: {
    actions: Action[];
  };
  STOP_ACTIONS: {};
  SET_SPEED: {
    speed: number;
  };
  RENDER_LED: {
    action: RenderLedAction;
  };
  MEASURE_DISTANCE: {};
  CAPTURE_IMAGE: {
    action: CaptureImageAction;
  };
  GET_ENV_UPDATES: {};
};

export type CommandObject = {
  command: Command;
  args: CommandArguments[Command];
};
