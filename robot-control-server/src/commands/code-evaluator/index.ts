import { spawn } from "child_process";
import {
  ActionPerformedMessage,
  DetectObjectMessage,
  DetectedObjectMessage,
  EvaluateCodeMessage,
  GetDistanceMessage,
  LatestDistanceMessage,
  PerformActionMessage,
  ReadyMessage,
} from "./types";
import { robot } from "../../robot";
import { ActionType } from "../../command-interface";
import { sendDetectObject } from "../../messages";

type MessageWithId<T extends any> = T & {
  operationId: string;
};

class CodeEvaluator {
  private childProcess: ReturnType<typeof spawn>;
  private code: string | undefined;

  constructor() {
    this.childProcess = null;
  }

  private sendMessage(
    message:
      | EvaluateCodeMessage
      | ActionPerformedMessage
      | LatestDistanceMessage
      | DetectedObjectMessage
  ) {
    this.childProcess.send(message);
  }

  private async processMessage(
    message:
      | ReadyMessage
      | MessageWithId<PerformActionMessage>
      | MessageWithId<GetDistanceMessage>
      | MessageWithId<DetectObjectMessage>
  ) {
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
      }
      case "GET_DISTANCE": {
        const distance = await robot.ultrasonic.getDistance();
        this.sendMessage({
          type: "LATEST_DISTANCE",
          distance,
          operationId: message.operationId,
        });
      }
      case "DETECT_OBJECT": {
        const image = await robot.camera.captureImage();
        const offCenterAngle = await sendDetectObject({
          image,
          name: (message as DetectObjectMessage).name,
          operationId: message.operationId,
        });

        this.sendMessage({
          type: "DETECTED_OBJECT",
          offCenterAngle,
          operationId: message.operationId,
        });
      }
    }
  }

  evaluate(code: string) {
    this.stop();

    return new Promise((resolve, reject) => {
      this.code = code;
      this.childProcess = spawn("node");

      this.childProcess.on("message", this.processMessage);
      this.childProcess.stderr.on("data", (data) => console.info(data));
      this.childProcess.on("close", (code) => {
        if (code === 0) {
          resolve(undefined);
        } else {
          reject(`Child process exited with code ${code}`);
        }
      });

      this.childProcess.on("error", (err) => {
        reject(err);
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
