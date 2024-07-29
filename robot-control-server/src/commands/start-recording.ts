import { autoRecorder } from "../audio-io";
import { sendAudioInput } from "../messages";
import { imageBufferToBase64 } from "../messages/utils";
import { robot } from "../robot";

export const startRecording = async () => {
  robot.led.render("BREATH_BLUE");

  autoRecorder.startRecording(async (audio) => {
    robot.led.render("OFF");
    sendAudioInput({
      data: audio,
      cameraImage: imageBufferToBase64(await robot.camera.captureImage()),
    });
  });
};
