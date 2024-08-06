import { RobotServerMessageContents } from "../../command-interface";
import {
  sendExecuteCode,
  sendRenderLed,
  sendStartRecoding,
} from "../send-messages";
import { robotState } from "../../robot-state";
import { ask, convert } from "../../processors";
import { playAudio } from "../../audio-io";

export const processEnvUpdatesMessage = async (
  content: RobotServerMessageContents["ENV_UPDATES"]
) => {
  sendRenderLed("FLOW_COLOR");

  const input = {
    type: "env-update",
    currentTask: robotState.currentTask,
    ultrasonicSensorReading: content.referenceDistance,
  };

  const answer = await ask(JSON.stringify(input), content.image);
  sendRenderLed("OFF");

  if (!answer) return;

  const parsedAnswer = JSON.parse(answer);

  robotState.setCurrentTask(parsedAnswer.currentTask);
  sendExecuteCode({ code: parsedAnswer.codeToExecute });

  if (parsedAnswer.vocalResponse) {
    const audioFile = await convert(parsedAnswer.vocalResponse);
    robotState.setIsPlaying({ isPlaying: true });
    await playAudio(audioFile);
    robotState.setIsPlaying({
      isPlaying: false,
      clearQueuedMessage: parsedAnswer.expectAudioInput,
    });
  }
  if (parsedAnswer.expectAudioInput) {
    sendStartRecoding();
  }
};
