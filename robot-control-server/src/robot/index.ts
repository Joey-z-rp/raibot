import { Position, Posture, positions } from "../command-interface";
import { readFromJson, writeToJson } from "../utils/json-helper";
import { positionToOperationLimitMap } from "./constants";
import { Servo } from "./servo";

class Robot {
  private allServos: Record<Position, Servo>;

  constructor() {
    this.allServos = positions.reduce(
      (servos, position) => ({
        ...servos,
        [position]: new Servo({
          position,
          operationLimit: positionToOperationLimitMap[position],
        }),
      }),
      {} as Record<Position, Servo>
    );
  }

  get servos() {
    return this.allServos;
  }

  savePosture(posture: Posture) {
    const servoAngles = Object.entries(this.allServos).reduce(
      (angles, [position, servo]) => ({
        ...angles,
        [position]: servo.currentAngle,
      }),
      {}
    );
    const configPath = "./src/config/postures.json";
    const postures = readFromJson(configPath);
    writeToJson(configPath, { ...postures, [posture]: servoAngles });
  }
}

export const robot = new Robot();
