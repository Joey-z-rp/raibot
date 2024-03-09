export const legServoPositions = [
  "frontLeftLow",
  "frontLeftHigh",
  "rearLeftLow",
  "rearLeftHigh",
  "rearRightHigh",
  "rearRightLow",
  "frontRightHigh",
  "frontRightLow",
] as const;

export const positions = [
  ...legServoPositions,
  "frontLeftShoulder",
  "rearLeftShoulder",
  "rearRightShoulder",
  "frontRightShoulder",
  "head",
] as const;

export type LegServoPosition = (typeof legServoPositions)[number];

export type Position = (typeof positions)[number];

export const limbPositions = [
  "frontRight",
  "frontLeft",
  "rearRight",
  "rearLeft",
] as const;

export type LimbPosition = (typeof limbPositions)[number];
