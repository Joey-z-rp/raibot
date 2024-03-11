import {
  LegServoPosition,
  Position,
  legServoPositions,
} from "../command-interface";
import {
  positionToChannelMap,
  positionToIKAngleConversionsMap,
  positionToMovementDirectionMap,
} from "./constants";

const TIME_TO_TURN = 20; // The time needed for the servo to turn to the target angle
const MOVE_INTERVAL = 20; // 20ms, can't be less than TIME_TO_TURN
const BASE_MOVE_AMOUNT = 0.8; // 1 degree

const rotateServo =
  process.platform === "darwin"
    ? (position: string, angle: number) =>
      console.info("Rotating servo: ", { position, angle })
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

  private isServoMoving: boolean;

  private movingTimer: NodeJS.Timeout;

  constructor({
    operationLimit,
    position,
    startingAngle,
  }: {
    operationLimit: OperationLimit;
    position: Position;
    startingAngle: number;
  }) {
    this.angle = startingAngle;
    this.targetAngle = startingAngle;
    this.operationLimit = operationLimit;
    this.position = position;
    this.speed = 5;
    this.isServoMoving = false;
  }

  init() {
    rotateServo(positionToChannelMap[this.position], this.angle);
  }

  turnToAngle() {
    this.isServoMoving = true;

    return new Promise((resolve) => {
      const turn = () => {
        const movingAmount =
          this.speed < 6
            ? BASE_MOVE_AMOUNT * this.speed
            : Math.abs(this.targetAngle - this.angle);
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
        new Promise(res => setTimeout(res, TIME_TO_TURN)).then(() => {
          this.angle = targetAngleForThisInterval;

          if (!isDone) {
            this.movingTimer = setTimeout(turn, MOVE_INTERVAL - TIME_TO_TURN);
          } else {
            this.isServoMoving = false;
            resolve(undefined);
          }
        })
      };

      turn();
    });
  }

  stop() {
    if (this.movingTimer) clearTimeout(this.movingTimer);
    this.isServoMoving = false;
  }

  setTargetAngle(angle: number) {
    if (
      Number.isNaN(angle) ||
      angle < this.operationLimit.low ||
      angle > this.operationLimit.high
    ) {
      return console.warn(
        `Angle ${angle} exceeds operation limit for ${this.position}`
      );
    }
    this.targetAngle = angle;
    return this.turnToAngle();
  }

  move(amount: number) {
    if (this.isServoMoving) return;

    return this.setTargetAngle(
      this.angle + amount * positionToMovementDirectionMap[this.position]
    );
  }

  private checkSupportIKAngle() {
    if (!legServoPositions.includes(this.position as LegServoPosition))
      throw new Error(
        `The position ${this.position} doesn't support IK calculation`
      );
  }

  convertIKAngleToAngle(iKAngle: number) {
    this.checkSupportIKAngle();
    return positionToIKAngleConversionsMap[this.position][1](iKAngle);
  }

  get currentAngle() {
    return this.angle;
  }

  // The angle used for inverse kinematics calculation
  get iKAngel() {
    this.checkSupportIKAngle();
    return positionToIKAngleConversionsMap[this.position][0](this.angle);
  }

  get isMoving() {
    return this.isServoMoving;
  }
}
