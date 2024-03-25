import { SendMessage } from "./types";

export const buildSendStartMonitoringAudioInput =
  (sendMessage: SendMessage) => () => {
    sendMessage({
      command: "START_MONITORING_AUDIO_INPUT",
      args: {},
    });
  };
