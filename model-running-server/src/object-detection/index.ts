import { spawn } from "child_process";

type DetectionResult = {
  name: string;
  confidence: number;
  coordinate: number[];
};

let isDetecting = false;

const startObjectDetectionProcessor = () => {
  const processor = spawn(
    "cd ../object-detection && poetry run python ./object-detection/object_detection.py",
    { shell: true }
  );

  processor.stderr.on("data", (data) => {
    console.error(`Object detection processor error:\n${data}`);
  });

  processor.on("exit", function (code, signal) {
    console.info(
      `Object detection processor exited with code ${code} and signal ${signal}`
    );
  });

  const detect = (filePath: string, name?: string) =>
    new Promise<DetectionResult[]>((res, rej) => {
      if (isDetecting) return rej("Another object detection is in progress");

      isDetecting = true;
      let timer: NodeJS.Timeout;

      const processResult = (result: Buffer) => {
        const match = result
          .toString()
          .match(/<object-detection-output>(.*?)<\/object-detection-output>/);
        if (match) {
          if (timer) clearTimeout(timer);
          processor.stdout.removeListener("data", processResult);
          isDetecting = false;

          res(JSON.parse(match[1]));
        }
      };

      processor.stdout.on("data", processResult);

      timer = setTimeout(() => {
        processor.stdout.removeListener("data", processResult);
        rej(new Error("Object detection timed out after 10s"));
      }, 10000);

      processor.stdin.write(`${filePath}${name ? `,${name}` : ""}\n`);
    });

  return { detect };
};

const { detect } = startObjectDetectionProcessor();

export { detect };
