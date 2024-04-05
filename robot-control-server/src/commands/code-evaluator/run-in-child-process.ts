import { v4 } from "uuid";
import {
  ActionPerformedMessage,
  ClearCurrentTaskMessage,
  DetectObjectMessage,
  DetectedObjectMessage,
  EvaluateCodeMessage,
  GetDistanceMessage,
  LatestDistanceMessage,
  PerformActionMessage,
  ReadyMessage,
} from "./types";

const promiseMap: Record<string, (value?: any) => void> = {};

const sendMessage = (
  message:
    | ReadyMessage
    | PerformActionMessage
    | GetDistanceMessage
    | DetectObjectMessage
    | ClearCurrentTaskMessage
) => {
  const operationId = v4();
  process.send({
    ...message,
    operationId,
  });

  return new Promise((resolve) => {
    promiseMap[operationId] = resolve;
  });
};

sendMessage({ type: "READY" });

const performAction = async (action: string) =>
  sendMessage({ type: "PERFORM_ACTION", action });

const getUltrasonicSensorReading = async () =>
  sendMessage({ type: "GET_DISTANCE" });

const detectObject = async (name: string) =>
  sendMessage({ type: "DETECT_OBJECT", name });

const clearCurrentTask = () => sendMessage({ type: "CLEAR_CURRENT_TASK" });

const processMessage = async (
  message:
    | EvaluateCodeMessage
    | ActionPerformedMessage
    | LatestDistanceMessage
    | DetectedObjectMessage
) => {
  switch (message.type) {
    case "EVALUATE_CODE": {
      eval(`(async () => {${message.code}})()`);
      return;
    }
    case "ACTION_PERFORMED": {
      promiseMap[message.operationId]?.();
    }
    case "LATEST_DISTANCE": {
      promiseMap[message.operationId]?.(
        (message as LatestDistanceMessage).distance
      );
    }
    case "DETECTED_OBJECT": {
      const offCenterAngle = (message as DetectedObjectMessage).offCenterAngle;
      promiseMap[message.operationId]?.(
        offCenterAngle && {
          offCenterAngle,
        }
      );
    }
  }

  if (message.operationId) {
    delete promiseMap[message.operationId];
  }
};

process.on("message", processMessage);
