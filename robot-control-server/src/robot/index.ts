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
import { LedControl } from "./led-control";
import { Limb } from "./limb";
import { RobotControl } from "./robot-control";
import { Servo } from "./servo";

const CONFIG_PATH = "./src/config/postures.json";

class Robot {
  private allServos: Record<Position, Servo>;

  private limbs: Record<LimbPosition, Limb>;

  private robotControl: RobotControl;

  private robotPostures: Record<Posture, Record<Position, number>>;

  private ledControl: LedControl;

  private speed: number;

  constructor() {
    this.speed = 5;
    this.allServos = positions.reduce(
      (servos, position) => ({
        ...servos,
        [position]: new Servo({
          position,
          operationLimit: positionToOperationLimitMap[position],
          startingAngle: this.readPostures()["REST"][position],
          speed: this.speed,
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

    this.robotControl = new RobotControl({
      limbs: this.limbs,
      allServos: this.allServos,
    });
    this.ledControl = new LedControl();
  }

  init() {
    Object.values(this.allServos).forEach((servo) => servo.init());
  }

  get servos() {
    return this.allServos;
  }

  get control() {
    return this.robotControl;
  }

  get postures() {
    if (!this.robotPostures) {
      this.robotPostures = this.readPostures();
    }
    return this.robotPostures;
  }

  get led() {
    return this.ledControl;
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
    const newPostures = { ...postures, [posture]: servoAngles };
    writeToJson(CONFIG_PATH, newPostures);
    this.robotPostures = newPostures;
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

  get status() {
    return {
      speed: this.speed,
      servoAngles: this.getServoAngles(),
    };
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

  setSpeed(speed: number) {
    if (speed < 1 || speed > 6)
      return console.warn(`Speed ${speed} exceeds limit`);
    this.speed = speed;
    Object.values(this.allServos).forEach((servo) =>
      servo.setSpeed(this.speed)
    );
  }
}

export const robot = new Robot();
robot.init();
