import { readFileSync } from "fs";

import { RobotServerMessageContents } from "../../command-interface";
import { convert } from "../../processors";
import { sendPlayAudio, sendRenderLed } from "../send-messages";
import { transcribeAudio } from "./utils";
import { deleteFile } from "../../utils";

export const processAudioInputMessage = async (
  content: RobotServerMessageContents["AUDIO_INPUT"]
) => {
  const transcribedText = await transcribeAudio(content.data);
  if (transcribedText) {
    console.log({ transcribedText });
    sendRenderLed("FLOW_COLOR");
    // Send to LLM
    await new Promise((res) => setTimeout(res, 3000));

    const audioFilePath = await convert("Hi, what can I do for you?");
    const audioData = readFileSync(audioFilePath);
    sendPlayAudio({ data: audioData.toString("base64") });
    sendRenderLed("OFF");
    deleteFile(audioFilePath);
  }
};
