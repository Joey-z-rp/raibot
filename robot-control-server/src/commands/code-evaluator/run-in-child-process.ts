import { v4 } from "uuid";
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

const promiseMap: Record<string, (value?: any) => void> = {};

const sendMessage = (
  message:
    | ReadyMessage
    | PerformActionMessage
    | GetDistanceMessage
    | ClearCurrentTaskMessage
    | GetEnvUpdateMessage
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

const clearCurrentTask = () => sendMessage({ type: "CLEAR_CURRENT_TASK" });

const getEnvUpdate = () => sendMessage({ type: "GET_ENV_UPDATE" });

const processMessage = async (
  message: EvaluateCodeMessage | ActionPerformedMessage | LatestDistanceMessage
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
  }

  if (message.operationId) {
    delete promiseMap[message.operationId];
  }
};

process.on("message", processMessage);
