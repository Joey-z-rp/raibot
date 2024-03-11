import {
  ServerMessage,
  ServerMessageContents,
  ServerMessageObject,
} from "@/command-interface";
import { processRobotStatusMessage } from "./robot-status";
import { SetServerState } from "@/types/server-context";

const messageHandlers: Record<
  ServerMessage,
  (
    content: ServerMessageContents[ServerMessage],
    setServerState: SetServerState
  ) => void
> = {
  ROBOT_STATUS: processRobotStatusMessage,
};

export const processServerMessages = (
  message: ServerMessageObject | null,
  setServerState: SetServerState
) => {
  if (!message) return;

  const handler = messageHandlers[message.type];
  if (!handler) {
    return console.warn(`Message type ${message.type} is invalid`);
  }
  handler(message.content, setServerState);
};
