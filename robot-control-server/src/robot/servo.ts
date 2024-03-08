import { Position } from "../command-interface";
import {
  positionToChannelMap,
  positionToMovementDirectionMap,
} from "./constants";

const MOVE_INTERVAL = 20; // 20ms
const BASE_MOVE_AMOUNT = 1; // 1 degree

const rotateServo =
  process.platform === "darwin"
    ? (position: string, angle: number) =>
        console.log("Rotating servo: ", { position, angle })
    : require("../utils/servo-driver").rotateServo;

type OperationLimit = {
  high: number;
  low: number;
};

export class Servo {
  private angle: number;

  private targetAngle: number;

  private operationLimit: OperationLimit;

  private position: Position;

  private speed: number;

  private isMoving: boolean;

  private movingTimer: NodeJS.Timeout;

  constructor({
    operationLimit,
    position,
  }: {
    operationLimit: OperationLimit;
    position: Position;
  }) {
    this.angle = 90;
    this.targetAngle = 90;
    this.operationLimit = operationLimit;
    this.position = position;
    this.speed = 5;
    this.isMoving = false;
  }

  turnToAngle() {
    this.isMoving = true;

    return new Promise((res) => {
      const turn = () => {
        const movingAmount = BASE_MOVE_AMOUNT * this.speed;
        const movingDirection = this.targetAngle - this.angle > 0 ? 1 : -1;
        const resultingAngle = this.angle + movingAmount * movingDirection;
        const isDone =
          (movingDirection === 1 && resultingAngle >= this.targetAngle) ||
          (movingDirection === -1 && resultingAngle <= this.targetAngle);
        const targetAngleForThisInterval = isDone
          ? this.targetAngle
          : resultingAngle;
        rotateServo(
          positionToChannelMap[this.position],
          targetAngleForThisInterval
        );

        if (!isDone) {
          this.movingTimer = setTimeout(turn, MOVE_INTERVAL);
        } else {
          this.isMoving = false;
          res(undefined);
        }
      };

      turn();
    });
  }

  stop() {
    if (this.movingTimer) clearTimeout(this.movingTimer);
    this.isMoving = false;
  }

  setTargetAngle(angle: number) {
    if (angle < this.operationLimit.low || angle > this.operationLimit.high) {
      return console.warn(`Angle ${angle} exceeds operation limit`);
    }
    this.targetAngle = angle;
    this.turnToAngle();
  }

  move(amount: number) {
    if (this.isMoving) return;

    this.setTargetAngle(
      this.angle + amount * positionToMovementDirectionMap[this.position]
    );
  }

  get currentAngle() {
    return this.angle;
  }
}
