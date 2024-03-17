import {
  RobotServerMessage,
  RobotServerMessageContents,
  RobotServerMessageObject,
} from "@/command-interface";
import { processRobotStatusMessage } from "./robot-status";
import { SetCapturedImage, SetServerState } from "@/types/server-context";
import { processCapturedImageMessage } from "./captured-image";

type MessageHandler<T extends RobotServerMessage = RobotServerMessage> = (
  content: RobotServerMessageContents[T],
  setServerState: SetServerState,
  setCapturedImage: SetCapturedImage
) => void;

const messageHandlers: Record<RobotServerMessage, MessageHandler> = {
  ROBOT_STATUS: processRobotStatusMessage as MessageHandler,
  CAPTURED_IMAGE: processCapturedImageMessage as MessageHandler,
  ENV_UPDATES: () => {},
};

export const processRobotServerMessages = (
  message: RobotServerMessageObject | null,
  setServerState: SetServerState,
  setCapturedImage: SetCapturedImage
) => {
  if (!message) return;

  const handler = messageHandlers[message.type];
  if (!handler) {
    return console.warn(`Message type ${message.type} is invalid`);
  }
  handler(message.content, setServerState, setCapturedImage);
};
