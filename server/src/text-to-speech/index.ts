import { spawn } from "child_process";

let isConverting = false;

export const startTtsProcessor = () => {
  const processor = spawn(
    "cd ../audio-processing && poetry run python ./text-to-speech/text-to-speech.py",
    { shell: true }
  );

  processor.stderr.on("data", (data) => {
    console.error(`TTS processor error:\n${data}`);
  });

  processor.on("exit", function (code, signal) {
    console.info(`TTS processor exited with code ${code} and signal ${signal}`);
  });

  const convert = (text: string) =>
    new Promise<string>((res, rej) => {
      if (isConverting) return rej("Another TTS conversion is in progress");

      isConverting = true;
      let timer: NodeJS.Timeout;

      const processResult = (result: Buffer) => {
        if (timer) clearTimeout(timer);

        processor.stdout.removeListener("data", processResult);
        isConverting = false;

        const match = result
          .toString()
          .match(/<tts-output>(.*?)<\/tts-output>/);
        if (match) {
          res(match[1]);
        } else {
          rej(new Error("TTS failed to convert"));
        }
      };

      processor.stdout.on("data", processResult);

      timer = setTimeout(() => {
        processor.stdout.removeListener("data", processResult);
        rej(new Error("TTS processing timed out after 10s"));
      }, 10000);

      processor.stdin.write(`${text}\n`);
    });

  return { convert };
};
