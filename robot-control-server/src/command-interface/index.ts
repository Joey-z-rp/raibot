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

export const availableCommands = ["MOVE", "TURN_TO_ANGLE"] as const;

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
};
