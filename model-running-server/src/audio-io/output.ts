import { play } from "sound-play";
import { TEMP_AUDIO_FOLDER_PATH } from "../shared/constants";
import { deleteFile } from "../utils";

export const playAudio = async (fileName: string) => {
  const filePath = `${TEMP_AUDIO_FOLDER_PATH}/${fileName}`;
  await play(filePath);
  deleteFile(filePath);
};
