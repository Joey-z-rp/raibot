export const positions = [
  "frontLeftLow",
  "frontLeftHigh",
  "frontLeftShoulder",
  "rearLeftLow",
  "rearLeftHigh",
  "rearLeftShoulder",
  "rearRightShoulder",
  "rearRightHigh",
  "rearRightLow",
  "frontRightShoulder",
  "frontRightHigh",
  "frontRightLow",
  "head",
] as const;

export type Position = (typeof positions)[number];

export type Posture = "STAND" | "REST";

export const availableCommands = [
  "MOVE",
  "TURN_TO_ANGLE",
  "SAVE_POSTURE",
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
};
