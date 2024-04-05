import { getMessage } from "../utils";
import { SendMessage } from "./types";

export const buildSendSetCurrentTask =
  (sendMessage: SendMessage) =>
  ({ currentTask }: { currentTask: string }) => {
    sendMessage(
      getMessage("SET_CURRENT_TASK", {
        currentTask,
      })
    );
  };
