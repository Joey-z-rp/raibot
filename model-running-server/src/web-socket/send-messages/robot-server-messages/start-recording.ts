import { SendMessage } from "./types";

export const buildSendStartRecoding = (sendMessage: SendMessage) => () => {
  sendMessage({
    command: "START_RECORDING",
    args: {},
  });
};
