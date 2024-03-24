import { play as macPlay } from "sound-play";
import { exec } from "child_process";
import { promisify } from "util";

import { deleteFile } from "../utils/file";
import { isMacOs } from "../utils/platform";

const execPromise = promisify(exec);

const raspBerryPlay = async (filePath: string) =>
  execPromise(`aplay ${filePath}`, { windowsHide: true });

const play = async (filePath: string) =>
  isMacOs() ? macPlay(filePath) : raspBerryPlay(filePath);

export const playAudio = async (filePath: string) => {
  await play(filePath);
  deleteFile(filePath);
};
