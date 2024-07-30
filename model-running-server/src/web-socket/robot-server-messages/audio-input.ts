import { RobotServerMessageContents } from "../../command-interface";
import { ask, convert } from "../../processors";
import {
  sendExecuteCode,
  sendRenderLed,
  sendStartMonitoringAudioInput,
  sendStartRecoding,
} from "../send-messages";
import { transcribeAudio } from "./utils";
import { playAudio } from "../../audio-io";
import { robotState } from "../../robot-state";

export const processAudioInputMessage = async (
  content: RobotServerMessageContents["AUDIO_INPUT"]
) => {
  robotState.setIsRecording(false);
  robotState.clearRefreshEnvTimer();
  const transcribedText = await transcribeAudio(content.data);
  if (transcribedText) {
    sendRenderLed("FLOW_COLOR");

    const input = {
      vocalCommand: transcribedText,
      currentTask: robotState.currentTask,
      ultrasonicSensorReading: robotState.envUpdates.ultrasonicSensorReading,
    };

    const answer = await ask(JSON.stringify(input), content.cameraImage);
    sendRenderLed("OFF");

    if (!answer) return;

    const parsedAnswer = JSON.parse(answer);

    robotState.setCurrentTask(parsedAnswer.currentTask);
    sendExecuteCode({ code: parsedAnswer.codeToExecute });

    if (parsedAnswer.vocalResponse) {
      const audioFile = await convert(parsedAnswer.vocalResponse);
      await playAudio(audioFile);
    }
    if (parsedAnswer.expectAudioInput) {
      sendStartRecoding();
    } else {
      sendStartMonitoringAudioInput();
    }
  } else {
    sendStartMonitoringAudioInput();
  }
};
