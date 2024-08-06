import { RobotServerMessageContents } from "../../command-interface";
import { robotState } from "../../robot-state";
import {
  sendStartMonitoringAudioInput,
  sendStartRecoding,
  sendStopActions,
} from "../send-messages";
import { transcribeAudio } from "./utils";

const TRIGGER_WORD = "robot";
const STOP_WORD = "stop";

export const processCheckAudioTriggerMessage = async (
  content: RobotServerMessageContents["CHECK_AUDIO_TRIGGER"]
) => {
  const transcribedText = await transcribeAudio(content.data);
  console.info({ transcribedText });
  const hasTrigger = transcribedText?.includes(TRIGGER_WORD);
  const hasStop = transcribedText?.includes(STOP_WORD);
  if (hasStop) {
    sendStopActions();
    sendStartMonitoringAudioInput();
  } else if (hasTrigger) {
    robotState.setIsRecording(true);
    robotState.setEnvUpdates({
      updatedTime: Date.now(),
      ultrasonicSensorReading: content.referenceDistance,
    });
    sendStartRecoding();
  } else {
    sendStartMonitoringAudioInput();
  }
};
