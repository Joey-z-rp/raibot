import { existsSync, mkdirSync } from "fs";
import { TEMP_AUDIO_FOLDER_PATH } from "../shared/constants";

const createTempFolder = () => {
  if (!existsSync(TEMP_AUDIO_FOLDER_PATH)) {
    mkdirSync(TEMP_AUDIO_FOLDER_PATH);
  }
};

createTempFolder();

export * from "./auto-recording";
export * from "./input";
export * from "./output";
