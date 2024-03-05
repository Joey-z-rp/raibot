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

export const positionToChannelMap = {
  frontLeftLow: 2,
  frontLeftHigh: 3,
  frontLeftShoulder: 4,
  rearLeftLow: 5,
  rearLeftHigh: 6,
  rearLeftShoulder: 7,
  rearRightShoulder: 8,
  rearRightHigh: 9,
  rearRightLow: 10,
  frontRightShoulder: 11,
  frontRightHigh: 12,
  frontRightLow: 13,
  head: 15,
};

export const positionToMovementDirectionMap = {
  frontLeftLow: 1,
  frontLeftHigh: -1,
  frontLeftShoulder: -1,
  rearLeftLow: 1,
  rearLeftHigh: -1,
  rearLeftShoulder: -1,
  rearRightShoulder: 1,
  rearRightHigh: 1,
  rearRightLow: -1,
  frontRightShoulder: 1,
  frontRightHigh: 1,
  frontRightLow: -1,
  head: 1,
};

export const positionToOperationLimitMap = {
  frontLeftLow: { low: 30, high: 150 },
  frontLeftHigh: { low: 30, high: 150 },
  frontLeftShoulder: { low: 30, high: 150 },
  rearLeftLow: { low: 30, high: 150 },
  rearLeftHigh: { low: 30, high: 150 },
  rearLeftShoulder: { low: 30, high: 150 },
  rearRightShoulder: { low: 30, high: 150 },
  rearRightHigh: { low: 30, high: 150 },
  rearRightLow: { low: 30, high: 150 },
  frontRightShoulder: { low: 30, high: 150 },
  frontRightHigh: { low: 30, high: 150 },
  frontRightLow: { low: 30, high: 150 },
  head: { low: 30, high: 150 },
};

export type Position = (typeof positions)[number];
