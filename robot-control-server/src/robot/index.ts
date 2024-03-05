import { Position, positionToOperationLimitMap, positions } from "./constants";
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
}

export const robot = new Robot();
