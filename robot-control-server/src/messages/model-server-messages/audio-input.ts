import { getMessage } from "../utils";
import { SendMessage } from "./types";

export const buildSendAudioInput =
  (sendMessage: SendMessage) =>
  ({ data }: { data: Buffer }) => {
    sendMessage(getMessage("AUDIO_INPUT", { data: data.toString("base64") }));
  };
