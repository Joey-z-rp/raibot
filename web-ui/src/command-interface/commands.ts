import { LimbPosition, Position } from "./positions";

export type Posture = "STAND" | "REST";

export const availableCommands = [
  "MOVE",
  "MOVE_LEG",
  "TURN_TO_ANGLE",
  "SAVE_POSTURE",
] as const;

export type Command = (typeof availableCommands)[number];

export type MoveLegDirection = "UP" | "DOWN" | "FORWARD" | "BACKWARD";

export type CommandArguments = {
  MOVE: {
    position: Position;
    amount: number;
  };
  MOVE_LEG: {
    position: LimbPosition;
    direction: MoveLegDirection;
    distance: number;
  };
  TURN_TO_ANGLE: {
    position: Position;
    angle: number;
  };
  SAVE_POSTURE: {
    postureName: Posture;
  };
};

export type CommandObject = {
  command: Command;
  args: CommandArguments[Command];
};

export const availableServerMessages = ["SERVO_ANGLES"] as const;

export type ServerMessage = (typeof availableServerMessages)[number];

export type ServerMessageContents = {
  SERVO_ANGLES: Record<Position, number>;
};

export type ServerMessageObject = {
  type: ServerMessage;
  content: ServerMessageContents[ServerMessage];
};
