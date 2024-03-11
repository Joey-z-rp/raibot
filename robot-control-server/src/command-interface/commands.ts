import { Action } from "./actions";
import { Position } from "./positions";

export type Posture = "STAND" | "REST";

export const availableCommands = [
  "MOVE",
  "TURN_TO_ANGLE",
  "SAVE_POSTURE",
  "PERFORM_ACTIONS",
  "STOP_ACTIONS",
  "SET_SPEED",
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
};

export type CommandObject = {
  command: Command;
  args: CommandArguments[Command];
};

export const availableServerMessages = ["ROBOT_STATUS"] as const;

export type ServerMessage = (typeof availableServerMessages)[number];

export type ServerMessageContents = {
  ROBOT_STATUS: {
    servoAngles: Record<Position, number>;
    speed: number;
  };
};

export type ServerMessageObject = {
  type: ServerMessage;
  content: ServerMessageContents[ServerMessage];
};
