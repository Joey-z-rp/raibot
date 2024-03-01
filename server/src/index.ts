import { createInterface } from "readline";
import { startRecording, stopRecording } from "./audio-input";
import { startSttProcessor } from "./speech-to-text";

const { transcribe } = startSttProcessor();

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
        transcribe(filePath).then((r) => console.info(r))
      );
    }

    listen();
  });
};

listen();
