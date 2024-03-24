import { v4 } from "uuid";
import { writeFileSync } from "fs";

import { CommandArguments } from "../command-interface";
import { playAudio as playAudioFile } from "../audio-io/output";

const TEMP_AUDIO_FOLDER_PATH = "../temp-audio-files";

export const playAudio = async ({ data }: CommandArguments["PLAY_AUDIO"]) => {
  const filePath = `${TEMP_AUDIO_FOLDER_PATH}/${v4()}.wav`;
  writeFileSync(filePath, Buffer.from(data, "base64"));
  await playAudioFile(filePath);
};
