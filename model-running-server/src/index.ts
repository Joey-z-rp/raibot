import { createInterface } from "readline";
import { startRecording, stopRecording, playAudio } from "./audio-io";
import { startSttProcessor } from "./speech-to-text";
import { startTtsProcessor } from "./text-to-speech";
import { runModel } from "./language-model";
import { initialiseWebSocket } from "./web-socket";

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
        const process = async () => {
          const recordedFile = await startRecording();
          const transcribedText = await transcribe(recordedFile);
          const answer = await ask(transcribedText);
          const audioFile = answer && (await convert(answer));
          if (audioFile) await playAudio(audioFile);
        };
        process();
      }

      listen();
    });
  };

  listen();
})();

initialiseWebSocket();
