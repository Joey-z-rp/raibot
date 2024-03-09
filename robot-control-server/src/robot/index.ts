import {
  LimbPosition,
  MoveLegDirection,
  Position,
  Posture,
  limbPositions,
  positions,
} from "../command-interface";
import { readFromJson, writeToJson } from "../utils/json-helper";
import { positionToOperationLimitMap } from "./constants";
import { Limb } from "./limb";
import { Servo } from "./servo";

const CONFIG_PATH = "./src/config/postures.json";

class Robot {
  private allServos: Record<Position, Servo>;

  private limbs: Record<LimbPosition, Limb>;

  constructor() {
    this.allServos = positions.reduce(
      (servos, position) => ({
        ...servos,
        [position]: new Servo({
          position,
          operationLimit: positionToOperationLimitMap[position],
          startingAngle: this.readPostures()["REST"][position],
        }),
      }),
      {} as Record<Position, Servo>
    );

    this.limbs = limbPositions.reduce(
      (limbs, limbPosition) => ({
        ...limbs,
        [limbPosition]: new Limb({
          limbPosition,
          servos: {
            shoulder: this.allServos[`${limbPosition}Shoulder`],
            upper: this.allServos[`${limbPosition}High`],
            lower: this.allServos[`${limbPosition}Low`],
          },
        }),
      }),
      {} as Record<LimbPosition, Limb>
    );
  }

  init() {
    Object.values(this.allServos).forEach((servo) => servo.init());
  }

  get servos() {
    return this.allServos;
  }

  readPostures() {
    return readFromJson(CONFIG_PATH) as Record<
      Posture,
      Record<Position, number>
    >;
  }

  savePosture(posture: Posture) {
    const servoAngles = this.getServoAngles();
    const postures = this.readPostures();
    writeToJson(CONFIG_PATH, { ...postures, [posture]: servoAngles });
  }

  getServoAngles() {
    return Object.entries(this.allServos).reduce(
      (angles, [position, servo]) => ({
        ...angles,
        [position]: servo.currentAngle,
      }),
      {} as Record<Position, number>
    );
  }

  moveLeg({
    position,
    direction,
    distance,
  }: {
    position: LimbPosition;
    direction: MoveLegDirection;
    distance: number;
  }) {
    return this.limbs[position].moveLeg(direction, distance);
  }
}

export const robot = new Robot();
robot.init();
