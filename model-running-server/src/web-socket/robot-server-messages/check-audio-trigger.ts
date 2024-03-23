import { RobotServerMessageContents } from "../../command-interface";
import { sendStartRecoding } from "../send-messages";
import { transcribeAudio } from "./utils";

const TRIGGER_WORD = "robot";

export const processCheckAudioTriggerMessage = async (
  content: RobotServerMessageContents["CHECK_AUDIO_TRIGGER"]
) => {
  const transcribedText = await transcribeAudio(content.data);
  if (transcribedText.includes(TRIGGER_WORD)) {
    sendStartRecoding();
  }
};
