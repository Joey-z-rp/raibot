import { LegServoPosition, Position } from "../command-interface";

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
  frontLeftLow: { low: 2, high: 168 },
  frontLeftHigh: { low: 2, high: 154 },
  frontLeftShoulder: { low: 2, high: 88 },
  rearLeftLow: { low: 2, high: 152 },
  rearLeftHigh: { low: 26, high: 180 },
  rearLeftShoulder: { low: 2, high: 102 },
  rearRightShoulder: { low: 67, high: 180 },
  rearRightHigh: { low: 2, high: 142 },
  rearRightLow: { low: 4, high: 180 },
  frontRightShoulder: { low: 72, high: 180 },
  frontRightHigh: { low: 20, high: 180 },
  frontRightLow: { low: 10, high: 180 },
  head: { low: 46, high: 136 },
};

export const positionToIKAngleConversionsMap: Record<
  LegServoPosition,
  [(actualAngle: number) => number, (iKAngle: number) => number]
> = {
  frontLeftLow: [
    (actualAngle) => 184 - actualAngle,
    (iKAngle) => 184 - iKAngle,
  ],
  frontLeftHigh: [(actualAngle) => actualAngle + 12, (iKAngle) => iKAngle - 12],
  rearLeftLow: [(actualAngle) => 174 - actualAngle, (iKAngle) => 174 - iKAngle],
  rearLeftHigh: [(actualAngle) => actualAngle - 2, (iKAngle) => iKAngle + 2],
  rearRightHigh: [
    (actualAngle) => 164 - actualAngle,
    (iKAngle) => 164 - iKAngle,
  ],
  rearRightLow: [(actualAngle) => actualAngle + 16, (iKAngle) => iKAngle - 16],
  frontRightHigh: [
    (actualAngle) => 184 - actualAngle,
    (iKAngle) => 184 - iKAngle,
  ],
  frontRightLow: [(actualAngle) => actualAngle + 6, (iKAngle) => iKAngle - 6],
};
