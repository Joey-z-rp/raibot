import { Action, LimbPosition, Position } from "../command-interface";
import { delay } from "../utils/delay";
import { executeAction } from "./actions";
import { Limb } from "./limb";
import { Servo } from "./servo";

export class RobotControl {
  private allServos: Record<Position, Servo>;

  private limbs: Record<LimbPosition, Limb>;

  private actionQueue: Action[];

  private isStopping: boolean;

  constructor({
    allServos,
    limbs,
  }: {
    allServos: Record<Position, Servo>;
    limbs: Record<LimbPosition, Limb>;
  }) {
    this.allServos = allServos;
    this.limbs = limbs;
    this.actionQueue = [];
    this.isStopping = false;
  }

  async executeActions() {
    if (this.isStopping) {
      this.actionQueue = [];
      this.isStopping = false;
      return;
    }

    const action = this.actionQueue[0];
    if (!action) return;

    await executeAction(action, this.limbs, this.allServos);
    if (action.repeat > 1) {
      action.repeat--;
    } else {
      this.actionQueue.shift();
    }
    await delay(20);
    await this.executeActions();
  }

  performActions(actions: Action[]) {
    if (this.actionQueue[0]) {
      this.actionQueue = [{ ...this.actionQueue[0], repeat: 1 }, ...actions];
      return;
    }

    this.actionQueue = [...actions];
    return this.executeActions();
  }

  stopActions() {
    this.isStopping = true;
  }
}
