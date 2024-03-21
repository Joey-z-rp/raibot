import { writeFileSync } from "fs";
import { v4 } from "uuid";
import { RobotServerMessageContents } from "../../command-interface";
import { TEMP_IMAGE_FOLDER_PATH } from "../../shared/constants";
import { transcribe } from "../../processors";

const TRIGGER_WORD = "robot";

export const processCheckAudioTriggerMessage = async (
  content: RobotServerMessageContents["CHECK_AUDIO_TRIGGER"]
) => {
  const filePath = `${TEMP_IMAGE_FOLDER_PATH}/${v4()}.wav`;
  writeFileSync(filePath, Buffer.from(content.data, "base64"));
  const transcribedText = await transcribe(filePath);
  if (transcribedText.includes(TRIGGER_WORD)) {
    // Send record command to robot server
  }
};
