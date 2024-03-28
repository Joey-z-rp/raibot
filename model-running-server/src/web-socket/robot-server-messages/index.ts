import {
  RobotServerMessage,
  RobotServerMessageContents,
  RobotServerMessageObject,
} from "../../command-interface";
import { processAudioInputMessage } from "./audio-input";
import { processCheckAudioTriggerMessage } from "./check-audio-trigger";
import { processDetectObjectMessage } from "./detect-object";
import { processEnvUpdatesMessage } from "./env-updates";

type MessageHandler<T extends RobotServerMessage = RobotServerMessage> = (
  content: RobotServerMessageContents[T]
) => void;

const messageHandlers: Record<RobotServerMessage, MessageHandler> = {
  ROBOT_STATUS: () => {},
  CAPTURED_IMAGE: () => {},
  ENV_UPDATES: processEnvUpdatesMessage,
  CHECK_AUDIO_TRIGGER: processCheckAudioTriggerMessage,
  AUDIO_INPUT: processAudioInputMessage,
  DETECT_OBJECT: processDetectObjectMessage,
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
