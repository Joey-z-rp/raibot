import { getMessage } from "../utils";
import { SendMessage } from "./types";

export const buildSendAudioInput =
  (sendMessage: SendMessage) =>
  ({
    data,
    cameraImage,
  }: {
    data: Buffer | undefined;
    cameraImage: string;
  }) => {
    sendMessage(
      getMessage("AUDIO_INPUT", { data: data?.toString("base64"), cameraImage })
    );
  };
