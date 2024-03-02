import { play } from "sound-play";
import { TEMP_AUDIO_FOLDER_PATH } from "../shared/constants";
import { unlink } from "fs";

export const playAudio = (fileName: string) => {
  const filePath = `${TEMP_AUDIO_FOLDER_PATH}/${fileName}`;
  play(filePath);

  setTimeout(() => {
    unlink(filePath, (err) => {
      if (err) console.error(err);
    });
  }, 5000);
};
