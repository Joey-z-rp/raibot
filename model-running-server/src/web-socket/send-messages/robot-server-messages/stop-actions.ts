import { SendMessage } from "./types";

export const buildSendStopActions = (sendMessage: SendMessage) => () => {
  sendMessage({
    command: "STOP_ACTIONS",
    args: {},
  });
};
