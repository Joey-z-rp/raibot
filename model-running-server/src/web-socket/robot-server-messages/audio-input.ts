import { RobotServerMessageContents } from "../../command-interface";
import { transcribeAudio } from "./utils";

export const processAudioInputMessage = async (
  content: RobotServerMessageContents["AUDIO_INPUT"]
) => {
  const transcribedText = await transcribeAudio(content.data);
  if (transcribedText) {
    console.log({ transcribedText });
    // Send to LLM
  }
};
