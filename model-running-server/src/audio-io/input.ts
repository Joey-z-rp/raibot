import * as mic from "mic";
import { createWriteStream } from "fs";
import { v4 } from "uuid";
import { TEMP_AUDIO_FOLDER_PATH } from "../shared/constants";

let micInstance = null;

export const startRecording = () =>
  new Promise<string>((res, rej) => {
    if (micInstance) return rej("Another recording is in progress");

    micInstance = mic({
      rate: "16000",
      channels: "1",
      debug: false,
      exitOnSilence: 0,
      fileType: "wav",
    });

    const filePath = `${TEMP_AUDIO_FOLDER_PATH}/${v4()}.wav`;
    const micInputStream = micInstance.getAudioStream();

    micInputStream.on("startComplete", () => {
      micInputStream.pipe(createWriteStream(filePath));
      console.info("Recording...");
    });

    micInputStream.on("stopComplete", () => {
      micInstance = null;
      console.info("Recording completed");
      res(filePath);
    });

    micInstance.start();
  });

export const stopRecording = () => {
  if (micInstance) micInstance.stop();
};
