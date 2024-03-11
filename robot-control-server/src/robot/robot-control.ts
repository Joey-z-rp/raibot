import { Action, LimbPosition, Position } from "../command-interface";
import { delay } from "../utils/delay";
import { executeAction } from "./actions";
import { preActions } from "./constants";
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
    await delay(100);
    await this.executeActions();
  }

  performActions(actions: Action[]) {
    const firstActionType = actions[0].type;
    const preAction = preActions[firstActionType]
      ? { type: preActions[firstActionType], args: {}, repeat: 1 }
      : undefined;
    if (this.actionQueue[0]) {
      const isDifferentAction = this.actionQueue[0].type !== firstActionType;
      this.actionQueue = [
        { ...this.actionQueue[0], repeat: 1 },
        ...(isDifferentAction && preAction ? [preAction] : []),
        ...actions,
      ];
      return;
    }

    this.actionQueue = [...(preAction ? [preAction] : []), ...actions];
    return this.executeActions();
  }

  stopActions() {
    this.isStopping = true;
  }
}
