import { SendMessage } from "./types";

export const buildSendExecuteCode =
  (sendMessage: SendMessage) =>
  ({ code }: { code: string }) => {
    sendMessage({
      command: "EXECUTE_CODE",
      args: {
        code,
      },
    });
  };
