import { createInterface } from "readline";
import { startRecording, stopRecording, playAudio } from "./audio-io";
import { startSttProcessor } from "./speech-to-text";
import { startTtsProcessor } from "./text-to-speech";
import { runModel } from "./language-model";

(async () => {
  const { transcribe } = startSttProcessor();
  const { convert } = startTtsProcessor();
  const { ask } = await runModel();

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
            .then((text) => ask(text))
            .then((answer) => {
              if (answer) return convert(answer);
            })
            .then((fileName) => {
              if (fileName) return playAudio(fileName);
            })
        );
      }

      listen();
    });
  };

  listen();
})();
