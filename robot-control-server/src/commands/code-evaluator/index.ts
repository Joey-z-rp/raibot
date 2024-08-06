import { fork } from "child_process";
import {
  ActionPerformedMessage,
  ClearCurrentTaskMessage,
  EvaluateCodeMessage,
  GetDistanceMessage,
  GetEnvUpdateMessage,
  LatestDistanceMessage,
  PerformActionMessage,
  ReadyMessage,
} from "./types";
import { robot } from "../../robot";
import { ActionType } from "../../command-interface";
import { sendSetCurrentTask } from "../../messages";
import { getEnvUpdates } from "../get-env-updates";

type MessageWithId<T extends any> = T & {
  operationId: string;
};

class CodeEvaluator {
  private childProcess: ReturnType<typeof fork>;
  private code: string | undefined;

  constructor() {
    this.childProcess = null;
  }

  private sendMessage(
    message:
      | EvaluateCodeMessage
      | ActionPerformedMessage
      | LatestDistanceMessage
  ) {
    this.childProcess?.send(message);
  }

  private processMessage = async (
    message:
      | ReadyMessage
      | MessageWithId<PerformActionMessage>
      | MessageWithId<GetDistanceMessage>
      | ClearCurrentTaskMessage
      | GetEnvUpdateMessage
  ) => {
    switch (message.type) {
      case "READY": {
        this.sendMessage({
          type: "EVALUATE_CODE",
          code: this.code,
        });
        return;
      }
      case "PERFORM_ACTION": {
        await robot.control.performActions([
          {
            type: message.action as ActionType,
            args: {},
            repeat: 1,
          },
        ]);
        this.sendMessage({
          type: "ACTION_PERFORMED",
          operationId: message.operationId,
        });
        break;
      }
      case "GET_DISTANCE": {
        const distance = await robot.ultrasonic.getDistance();
        this.sendMessage({
          type: "LATEST_DISTANCE",
          distance,
          operationId: message.operationId,
        });
        break;
      }
      case "GET_ENV_UPDATE": {
        getEnvUpdates();
        break;
      }
      case "CLEAR_CURRENT_TASK": {
        sendSetCurrentTask({ currentTask: "" });
        break;
      }
    }
  };

  evaluate(code: string) {
    this.stop();

    return new Promise((resolve) => {
      this.code = code;
      this.childProcess = fork(
        "src/commands/code-evaluator/run-in-child-process.js"
      );

      this.childProcess.on("message", this.processMessage);

      this.childProcess.on("close", (code) => {
        if (!code || code === 0) {
          resolve(undefined);
        } else {
          console.info(`Code executing child process exited with code ${code}`);
        }
      });

      this.childProcess.on("error", (err) => {
        console.info(err);
      });
    });
  }

  stop() {
    this.code = undefined;
    if (this.childProcess) {
      this.childProcess.kill();
      this.childProcess = null;
    }
  }
}

export const codeEvaluator = new CodeEvaluator();
