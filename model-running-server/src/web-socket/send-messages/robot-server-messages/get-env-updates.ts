import { SendMessage } from "./types";

export const buildSendGetEnvUpdates = (sendMessage: SendMessage) => () => {
  sendMessage({
    command: "GET_ENV_UPDATES",
    args: {},
  });
};
