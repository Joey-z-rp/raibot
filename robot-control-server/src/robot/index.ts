import { Position, Posture, positions } from "../command-interface";
import { readFromJson, writeToJson } from "../utils/json-helper";
import { positionToOperationLimitMap } from "./constants";
import { Servo } from "./servo";

const CONFIG_PATH = "./src/config/postures.json"

class Robot {
  private allServos: Record<Position, Servo>;

  constructor() {
    this.allServos = positions.reduce(
      (servos, position) => ({
        ...servos,
        [position]: new Servo({
          position,
          operationLimit: positionToOperationLimitMap[position],
          startingAngle: this.readPostures()["REST"][position]
        }),
      }),
      {} as Record<Position, Servo>
    );
  }

  init() {
    Object.values(this.allServos).forEach(servo => servo.init())
  }

  get servos() {
    return this.allServos;
  }

  readPostures() {
    return readFromJson(CONFIG_PATH) as Record<Posture, Record<Position, number>>;
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
}

export const robot = new Robot();
robot.init();
