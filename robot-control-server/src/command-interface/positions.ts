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

export const shoulderServoPositions = [
  "frontLeftShoulder",
  "rearLeftShoulder",
  "rearRightShoulder",
  "frontRightShoulder",
] as const;

export const positions = [
  ...legServoPositions,
  ...shoulderServoPositions,
  "head",
] as const;

export type LegServoPosition = (typeof legServoPositions)[number];

export type ShoulderServoPosition = (typeof shoulderServoPositions)[number];

export type Position = (typeof positions)[number];

export const limbPositions = [
  "frontRight",
  "frontLeft",
  "rearRight",
  "rearLeft",
] as const;

export type LimbPosition = (typeof limbPositions)[number];
