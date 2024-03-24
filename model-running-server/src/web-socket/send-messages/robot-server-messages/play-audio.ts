import { SendMessage } from "./types";

export const buildSendPlayAudio =
  (sendMessage: SendMessage) =>
  ({ data }: { data: string }) => {
    sendMessage({
      command: "PLAY_AUDIO",
      args: {
        data,
      },
    });
  };
