import {
  RobotServerMessage,
  RobotServerMessageContents,
  RobotServerMessageObject,
} from "../../command-interface";
import { processEnvUpdatesMessage } from "./env-updates";

type MessageHandler<T extends RobotServerMessage = RobotServerMessage> = (
  content: RobotServerMessageContents[T]
) => void;

const messageHandlers: Record<RobotServerMessage, MessageHandler> = {
  ROBOT_STATUS: () => {},
  CAPTURED_IMAGE: () => {},
  ENV_UPDATES: processEnvUpdatesMessage,
};

export const processRobotServerMessages = (
  message: RobotServerMessageObject | null
) => {
  if (!message) return;

  const handler = messageHandlers[message.type];
  if (!handler) {
    return console.warn(`Message type ${message.type} is invalid`);
  }
  handler(message.content);
};
