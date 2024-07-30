import { writeFileSync } from "fs";
import { v4 } from "uuid";
import { TEMP_IMAGE_FOLDER_PATH } from "../../shared/constants";
import { transcribe } from "../../processors";

export const transcribeAudio = async (base64Data: string) => {
  if (!base64Data) return;

  const filePath = `${TEMP_IMAGE_FOLDER_PATH}/${v4()}.wav`;
  writeFileSync(filePath, Buffer.from(base64Data, "base64"));
  const transcribedText = await transcribe(filePath);
  return transcribedText;
};
