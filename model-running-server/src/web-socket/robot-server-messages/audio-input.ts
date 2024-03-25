import { RobotServerMessageContents } from "../../command-interface";
import { convert } from "../../processors";
import { sendRenderLed, sendStartMonitoringAudioInput } from "../send-messages";
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
    console.log({ transcribedText });
    sendRenderLed("FLOW_COLOR");
    // Send to LLM
    await new Promise((res) => setTimeout(res, 3000));

    const audioFile = await convert("Hi, what can I do for you?");

    sendRenderLed("OFF");
    playAudio(audioFile);
  } else {
    sendStartMonitoringAudioInput();
  }
};
