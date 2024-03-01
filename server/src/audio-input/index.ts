import * as mic from "mic";
import { createWriteStream } from "fs";
import { v4 } from "uuid";

let micInstance = null;

export const startRecording = (onComplete: (filePath: string) => void) => {
  if (micInstance) return;

  micInstance = mic({
    rate: "16000",
    channels: "1",
    debug: false,
    exitOnSilence: 0,
    fileType: "wav",
  });

  const filePath = `../temp-audio-files/${v4()}.wav`;
  const micInputStream = micInstance.getAudioStream();

  micInputStream.on("startComplete", () => {
    micInputStream.pipe(createWriteStream(filePath));
    console.info("Recording...");
  });

  micInputStream.on("stopComplete", () => {
    micInstance = null;
    onComplete(filePath);
    console.log("Recording completed");
  });

  micInstance.start();
};

export const stopRecording = () => {
  if (micInstance) micInstance.stop();
};
