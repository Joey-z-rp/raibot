import { rotateServo } from "../utils/servo-driver";
import {
  Position,
  positionToChannelMap,
  positionToMovementDirectionMap,
} from "./constants";

type OperationLimit = {
  high: number;
  low: number;
};

export class Servo {
  private angle: number;

  private operationLimit: OperationLimit;

  private position: Position;

  constructor({
    operationLimit,
    position,
  }: {
    operationLimit: OperationLimit;
    position: Position;
  }) {
    this.angle = 90;
    this.operationLimit = operationLimit;
    this.position = position;
  }

  turnToAngle() {
    rotateServo(positionToChannelMap[this.position], this.angle);
  }

  setAngle(angle: number) {
    if (angle < this.operationLimit.low || angle > this.operationLimit.high) {
      return console.warn(`Angle ${angle} exceeds operation limit`);
    }
    this.angle = angle;
    this.turnToAngle();
  }

  move(amount: number) {
    this.setAngle(
      this.angle + amount * positionToMovementDirectionMap[this.position]
    );
  }
}
