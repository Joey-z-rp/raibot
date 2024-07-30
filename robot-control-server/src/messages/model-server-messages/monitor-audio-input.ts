import { autoRecorder } from "../../audio-io";
import { robot } from "../../robot";
import { getMessage } from "../utils";
import { SendMessage } from "./types";

export const monitorAudioInput = (sendMessage: SendMessage) => {
  const startMonitoring = () => {
    autoRecorder.startAutoRecording(async (data) => {
      if (data) {
        sendMessage(
          getMessage("CHECK_AUDIO_TRIGGER", {
            data: data.toString("base64"),
            referenceDistance: await robot.ultrasonic.getDistance(),
          })
        );
      } else {
        startMonitoring();
      }
    });
  };
  startMonitoring();
};
