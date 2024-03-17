import { spawn } from "child_process";

type EstimationInput = {
  file_path: string;
  reference_distance: number;
  objects: {
    name: string;
    coordinate: number[];
  }[];
};

type EstimationResult = Record<string, number>;

let isEstimating = false;

const startDepthEstimationProcessor = () => {
  const processor = spawn(
    "cd ../depth-estimation && conda run --no-capture-output -n midas-py310 python depth_estimation.py",
    { shell: true }
  );

  processor.stderr.on("data", (data) => {
    console.error(`Depth estimation processor error:\n${data}`);
  });

  processor.on("exit", function (code, signal) {
    console.info(
      `Depth estimation processor exited with code ${code} and signal ${signal}`
    );
  });

  const estimate = (input: EstimationInput) =>
    new Promise<EstimationResult>((res, rej) => {
      if (isEstimating) return rej("Another depth estimation is in progress");

      isEstimating = true;
      let timer: NodeJS.Timeout;

      const processResult = (result: Buffer) => {
        const match = result
          .toString()
          .match(/<depth-estimation-output>(.*?)<\/depth-estimation-output>/);
        if (match) {
          if (timer) clearTimeout(timer);
          processor.stdout.removeListener("data", processResult);
          isEstimating = false;

          res(JSON.parse(match[1]));
        }
      };

      processor.stdout.on("data", processResult);

      timer = setTimeout(() => {
        processor.stdout.removeListener("data", processResult);
        rej(new Error("Depth estimation timed out after 10s"));
      }, 10000);

      processor.stdin.write(`${JSON.stringify(input)}\n`);
    });

  return { estimate };
};

const { estimate } = startDepthEstimationProcessor();

export { estimate };
