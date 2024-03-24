import { RobotServerMessageContents } from "../../command-interface";
import { convert } from "../../processors";
import { sendRenderLed } from "../send-messages";
import { transcribeAudio } from "./utils";
import { playAudio } from "../../audio-io";

export const processAudioInputMessage = async (
  content: RobotServerMessageContents["AUDIO_INPUT"]
) => {
  const transcribedText = await transcribeAudio(content.data);
  if (transcribedText) {
    console.log({ transcribedText });
    sendRenderLed("FLOW_COLOR");
    // Send to LLM
    await new Promise((res) => setTimeout(res, 3000));

    const audioFile = await convert("Hi, what can I do for you?");

    sendRenderLed("OFF");
    playAudio(audioFile);
  }
};
