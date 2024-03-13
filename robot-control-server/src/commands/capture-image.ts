import { CommandArguments } from "../command-interface";
import { sendImage } from "../messages";
import { robot } from "../robot";

export const captureImage = ({ action }: CommandArguments["CAPTURE_IMAGE"]) => {
  switch (action) {
    case "STILL":
      return robot.camera.captureImage(sendImage);
    case "VIDEO":
      return robot.camera.captureVideo(sendImage);
    case "OFF":
      return robot.camera.stopCapture();
    default:
      return;
  }
};
