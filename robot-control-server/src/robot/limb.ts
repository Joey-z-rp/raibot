import { LimbPosition, MoveLegDirection } from "../command-interface";
import {
  convertAngleToCoordinate,
  convertCoordinateToAngle,
} from "../utils/inverse-kinematics";
import { Servo } from "./servo";

const UPPER_LEG_LENGTH = 55; // mm
const LOWER_LEG_LENGTH = 58;

type LimbServos = Record<"shoulder" | "upper" | "lower", Servo>;

export class Limb {
  private limbPosition: LimbPosition;

  private servos: LimbServos;

  constructor({
    limbPosition,
    servos,
  }: {
    limbPosition: LimbPosition;
    servos: LimbServos;
  }) {
    this.limbPosition = limbPosition;
    this.servos = servos;
  }

  getCurrentCoordinate() {
    return convertAngleToCoordinate({
      upperLength: UPPER_LEG_LENGTH,
      lowerLength: LOWER_LEG_LENGTH,
      upperAngle: this.servos.upper.iKAngel,
      lowerAngle: this.servos.lower.iKAngel,
    });
  }

  isLegMoving() {
    return this.servos.upper.isMoving || this.servos.lower.isMoving;
  }

  private move(xDistance: number, yDistance: number) {
    if (this.isLegMoving()) return;

    const { x, y } = this.getCurrentCoordinate();
    const { upperAngle, lowerAngle } = convertCoordinateToAngle({
      upperLength: UPPER_LEG_LENGTH,
      lowerLength: LOWER_LEG_LENGTH,
      x: x + xDistance,
      y: y + yDistance,
    });

    return Promise.all([
      this.servos.upper.setTargetAngle(
        Math.round(this.servos.upper.convertIKAngleToAngle(upperAngle))
      ),
      this.servos.lower.setTargetAngle(
        Math.round(this.servos.lower.convertIKAngleToAngle(lowerAngle))
      ),
    ]);
  }

  moveLeg(direction: MoveLegDirection, distance: number) {
    const getDistances = (): [number, number] => {
      switch (direction) {
        case "UP":
          return [0, distance * -1];
        case "DOWN":
          return [0, distance];
        case "FORWARD":
          return [distance, 0];
        case "BACKWARD":
          return [distance * -1, 0];
        default:
          return [0, 0];
      }
    };
    return this.move(...getDistances());
  }

  get position() {
    return this.limbPosition;
  }
}
