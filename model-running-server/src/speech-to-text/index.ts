import { spawn } from "child_process";
import { deleteFile } from "../utils";

let isTranscribing = false;

export const startSttProcessor = () => {
  const processor = spawn(
    "cd ../audio-processing && poetry run python ./speech-to-text/speech_to_text.py",
    { shell: true }
  );

  processor.stderr.on("data", (data) => {
    console.error(`STT processor error:\n${data}`);
  });

  processor.on("exit", function (code, signal) {
    console.info(`STT processor exited with code ${code} and signal ${signal}`);
  });

  const transcribe = (filePath: string) =>
    new Promise<string>((res, rej) => {
      if (isTranscribing)
        return rej("Another STT transcription is in progress");

      isTranscribing = true;
      let timer: NodeJS.Timeout;

      const processResult = (result: Buffer) => {
        if (timer) clearTimeout(timer);

        processor.stdout.removeListener("data", processResult);
        deleteFile(filePath);
        isTranscribing = false;

        const match = result
          .toString()
          .match(/<stt-output>(.*?)<\/stt-output>/);
        if (match) {
          res(match[1].trim());
        } else {
          rej(new Error("Failed to transcribe"));
        }
      };

      processor.stdout.on("data", processResult);

      timer = setTimeout(() => {
        processor.stdout.removeListener("data", processResult);
        rej(new Error("STT processing timed out after 10s"));
      }, 10000);

      processor.stdin.write(`${filePath}\n`);
    });

  return { transcribe };
};
