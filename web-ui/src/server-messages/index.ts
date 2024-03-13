import {
  ServerMessage,
  ServerMessageContents,
  ServerMessageObject,
} from "@/command-interface";
import { processRobotStatusMessage } from "./robot-status";
import { SetCapturedImage, SetServerState } from "@/types/server-context";
import { processCapturedImageMessage } from "./captured-image";

type MessageHandler<T extends ServerMessage = ServerMessage> = (
  content: ServerMessageContents[T],
  setServerState: SetServerState,
  setCapturedImage: SetCapturedImage
) => void;

const messageHandlers: Record<ServerMessage, MessageHandler> = {
  ROBOT_STATUS: processRobotStatusMessage as MessageHandler,
  CAPTURED_IMAGE: processCapturedImageMessage as MessageHandler,
};

export const processServerMessages = (
  message: ServerMessageObject | null,
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
