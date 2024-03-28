import { RobotServerMessageContents } from "../../command-interface";
import { askExternal, convert } from "../../processors";
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
      detectedObjects: robotState.envUpdates.detectedObjects.map((o) => ({
        name: o.name,
        offCenterAngle: o.offCenterAngle,
      })),
    };
    const answer = await askExternal(JSON.stringify(input));

    const parsedAnswer = JSON.parse(answer);

    robotState.setCurrentTask(parsedAnswer.currentTask);
    sendExecuteCode({ code: parsedAnswer.codeToExecute });

    sendRenderLed("OFF");
    if (parsedAnswer.vocalResponse) {
      const audioFile = await convert(parsedAnswer.vocalResponse);
      await playAudio(audioFile);
    }
    if (parsedAnswer.isExpectingAudioInput) {
      sendStartRecoding();
    } else {
      sendStartMonitoringAudioInput();
    }
  } else {
    sendStartMonitoringAudioInput();
  }
};
