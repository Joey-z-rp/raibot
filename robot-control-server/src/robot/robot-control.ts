import { Action, LimbPosition, Position } from "../command-interface";
import { delay } from "../utils/delay";
import { executeAction } from "./actions";
import { preActions } from "./constants";
import { Limb } from "./limb";
import { Servo } from "./servo";

const CHECK_REST_INTERVAL = 10000;

export class RobotControl {
  private allServos: Record<Position, Servo>;

  private limbs: Record<LimbPosition, Limb>;

  private actionQueue: Action[];

  private isStopping: boolean;

  private checkRestTimer: NodeJS.Timeout;

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

  private checkRest() {
    if (this.checkRestTimer) clearTimeout(this.checkRestTimer);

    this.checkRestTimer = setTimeout(() => {
      if (!this.actionQueue.length) {
        executeAction(
          {
            type: "REST",
            args: {},
            repeat: 1,
          },
          this.limbs,
          this.allServos
        );
      } else {
        this.checkRest();
      }
    }, CHECK_REST_INTERVAL);
  }

  private async executeActions() {
    this.checkRest();

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
    await delay(action.delay || 100);
    await this.executeActions();
  }

  performActions(actions: Action[]) {
    const firstActionType = actions[0].type;
    const preAction = preActions[firstActionType]
      ? { type: preActions[firstActionType], args: {}, repeat: 1, delay: 200 }
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
