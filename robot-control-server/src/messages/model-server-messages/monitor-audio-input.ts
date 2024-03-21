import { autoRecorder } from "../../audio-io";
import { getMessage } from "../utils";
import { SendMessage } from "./types";

export const monitorAudioInput = (sendMessage: SendMessage) => {
  const startMonitoring = () => {
    autoRecorder.startAutoRecording((data) => {
      if (data) {
        sendMessage(
          getMessage("CHECK_AUDIO_TRIGGER", { data: data.toString("base64") })
        );
      } else {
        startMonitoring();
      }
    });
  };
  startMonitoring();
};
