import { RobotServerMessageContents } from "../../command-interface";
import { robotState } from "../../robot-state";
import {
  sendGetEnvUpdates,
  sendStartMonitoringAudioInput,
  sendStartRecoding,
} from "../send-messages";
import { transcribeAudio } from "./utils";

const TRIGGER_WORD = "kitty";

export const processCheckAudioTriggerMessage = async (
  content: RobotServerMessageContents["CHECK_AUDIO_TRIGGER"]
) => {
  const transcribedText = await transcribeAudio(content.data);
  if (transcribedText.includes(TRIGGER_WORD)) {
    robotState.setIsRecording(true);
    sendStartRecoding();
    if (!robotState.currentTask) sendGetEnvUpdates();
  } else {
    sendStartMonitoringAudioInput();
  }
};
