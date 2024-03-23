import { autoRecorder } from "../audio-io";
import { sendAudioInput } from "../messages";
import { robot } from "../robot";

export const startRecording = async () => {
  robot.led.render("BREATH_GREEN");

  autoRecorder.startRecording((audio) => {
    robot.led.render("OFF");
    sendAudioInput({ data: audio });
  });
};
