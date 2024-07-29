import { autoRecorder } from "../audio-io";
import { sendAudioInput } from "../messages";
import { robot } from "../robot";

export const startRecording = async () => {
  robot.led.render("BREATH_BLUE");

  autoRecorder.startRecording(async (audio) => {
    robot.led.render("OFF");
    sendAudioInput({
      data: audio,
      cameraImage: (await robot.camera.captureImage()).toString("base64"),
    });
  });
};
