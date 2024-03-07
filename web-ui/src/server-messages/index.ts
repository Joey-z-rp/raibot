import {
  ServerMessage,
  ServerMessageContents,
  ServerMessageObject,
} from "@/command-interface";
import { processServoAnglesMessage } from "./server-angles";
import { SetServerState } from "@/types/server-context";

const messageHandlers: Record<
  ServerMessage,
  (
    content: ServerMessageContents[ServerMessage],
    setServerState: SetServerState
  ) => void
> = {
  SERVO_ANGLES: processServoAnglesMessage,
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
