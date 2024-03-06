import { Position } from "../command-interface";

export const positionToChannelMap: Record<Position, number> = {
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

export const positionToMovementDirectionMap: Record<Position, number> = {
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

export const positionToOperationLimitMap: Record<
  Position,
  { low: number; high: number }
> = {
  frontLeftLow: { low: 15, high: 165 },
  frontLeftHigh: { low: 15, high: 165 },
  frontLeftShoulder: { low: 15, high: 165 },
  rearLeftLow: { low: 15, high: 165 },
  rearLeftHigh: { low: 15, high: 165 },
  rearLeftShoulder: { low: 15, high: 165 },
  rearRightShoulder: { low: 15, high: 165 },
  rearRightHigh: { low: 15, high: 165 },
  rearRightLow: { low: 15, high: 165 },
  frontRightShoulder: { low: 15, high: 165 },
  frontRightHigh: { low: 15, high: 165 },
  frontRightLow: { low: 15, high: 165 },
  head: { low: 15, high: 165 },
};
