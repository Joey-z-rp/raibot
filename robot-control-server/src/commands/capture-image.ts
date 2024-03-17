import { CommandArguments } from "../command-interface";
import { sendImage } from "../messages";
import { robot } from "../robot";

export const captureImage = async ({
  action,
}: CommandArguments["CAPTURE_IMAGE"]) => {
  switch (action) {
    case "STILL":
      return sendImage(await robot.camera.captureImage());
    case "VIDEO":
      return robot.camera.captureVideo(sendImage);
    case "OFF":
      return robot.camera.stopCapture();
    default:
      return;
  }
};
