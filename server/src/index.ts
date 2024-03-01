import { startSttProcessor } from "./speech-to-text";

// const { spawn } = require("child_process");

// const child = spawn(
//   "cd ../audio-processing && poetry run python ./audio-processing/speech-to-text.py",
//   { shell: true }
// );

// child.stderr.on("data", (data) => {
//   console.error(`child stderr:\n${data}`);
// });
// child.on("exit", function (code, signal) {
//   console.log(
//     "child process exited with " + `code ${code} and signal ${signal}`
//   );
// });
// child.stdout.on("data", (data) => {
//   console.log(`child out:\n${data}`);
// });

const { transcribe } = startSttProcessor();

const mic = require("mic");
const fs = require("fs");

const audioConfig = {
  rate: "16000",
  channels: "1",
};

let index = 0;

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let isRecording = false;
let micInstance;
const loop = () => {
  rl.question("Listening...\n", function (input) {
    if (isRecording) {
      micInstance.stop();
    } else {
      micInstance = mic({
        rate: audioConfig.rate,
        channels: audioConfig.channels,
        debug: false,
        exitOnSilence: 6,
        fileType: "wav",
      });

      const micInputStream = micInstance.getAudioStream();
      micInputStream.on("startComplete", function () {
        micInputStream.pipe(
          fs.WriteStream(`../temp-audio-files/output-${index}.wav`)
        );

        console.log("Start recording");
      });

      micInputStream.on("stopComplete", function () {
        isRecording = false;
        transcribe(
          `/Users/joeyzheng/repos/raibot/temp-audio-files/output-${index}.wav`
        ).then(r => console.log(r));

        console.log(`Record Completed`);
        index++;
      });
      isRecording = true;
      micInstance.start();
    }
    loop();
  });
};

rl.on("close", function () {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});
loop();
