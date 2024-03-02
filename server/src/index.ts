import { createInterface } from "readline";
import { startRecording, stopRecording, playAudio } from "./audio-io";
import { startSttProcessor } from "./speech-to-text";
import { startTtsProcessor } from "./text-to-speech";
import { TEMP_AUDIO_FOLDER_PATH } from "./shared/constants";

const { transcribe } = startSttProcessor();
const { convert } = startTtsProcessor();

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let isRecording = false;

const listen = () => {
  readline.question("", () => {
    if (isRecording) {
      stopRecording();
      isRecording = false;
    } else {
      isRecording = true;
      startRecording((filePath) =>
        transcribe(filePath)
          .then((text) => convert(text))
          .then((fileName) => {
            playAudio(fileName);
          })
      );
    }

    listen();
  });
};

listen();
