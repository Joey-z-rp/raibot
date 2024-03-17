import {
  ModelServerMessage,
  ModelServerMessageContents,
  ModelServerMessageObject,
} from "@/command-interface";

import {
  SetEnvUpdates,
  processCalculatedEnvUpdatesMessage,
} from "./calculated-env-updates";

type MessageHandler<T extends ModelServerMessage = ModelServerMessage> = (
  content: ModelServerMessageContents[T],
  setEnvUpdates: SetEnvUpdates
) => void;

const messageHandlers: Record<ModelServerMessage, MessageHandler> = {
  CALCULATED_ENV_UPDATES: processCalculatedEnvUpdatesMessage,
};

export const processModelServerMessages = (
  message: ModelServerMessageObject | null,
  setEnvUpdates: SetEnvUpdates
) => {
  if (!message) return;

  const handler = messageHandlers[message.type];
  if (!handler) {
    return console.warn(`Message type ${message.type} is invalid`);
  }
  handler(message.content, setEnvUpdates);
};
