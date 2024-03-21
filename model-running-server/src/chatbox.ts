import { createInterface } from "readline";
import { playAudio } from "./audio-io";
import { startSttProcessor } from "./speech-to-text";
import { startTtsProcessor } from "./text-to-speech";
import { runModel } from "./language-model";
import { AutoRecorder } from "./audio-io";

const autoRecorder = new AutoRecorder();

(async () => {
  const { transcribe } = startSttProcessor();
  const { convert } = startTtsProcessor();
  const { ask } = runModel();

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question("Start talking to interact with the model", () => {});

  const listen = () => {
    const handleRecord = async (filePath: string | undefined) => {
      if (!filePath) return listen();

      const transcribedText = await transcribe(filePath);
      const answer = await ask(transcribedText);
      if (answer) {
        const audioFile = await convert(answer);
        await playAudio(audioFile);
      } else {
        console.info("No answer. Ask another question");
      }
      autoRecorder.startRecording(handleRecord);
    };

    autoRecorder.startAutoRecording(handleRecord);
  };

  listen();
})();
