import { RobotServerMessageContents } from "../../command-interface";
import { robotState } from "../../robot-state";
import {
  sendStartMonitoringAudioInput,
  sendStartRecoding,
  sendStopActions,
} from "../send-messages";
import { transcribeAudio } from "./utils";

const TRIGGER_WORD = "terminator";
const STOP_WORD = "stop";

export const processCheckAudioTriggerMessage = async (
  content: RobotServerMessageContents["CHECK_AUDIO_TRIGGER"]
) => {
  const transcribedText = await transcribeAudio(content.data);
  process.env.DEBUG && console.info({ transcribedText });
  const hasTrigger = transcribedText?.toLowerCase().includes(TRIGGER_WORD);
  const hasStop = transcribedText?.toLocaleLowerCase().includes(STOP_WORD);
  if (hasStop) {
    robotState.setCurrentTask("");
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
