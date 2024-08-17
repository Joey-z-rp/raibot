import { CommandArguments } from "../command-interface";
import { sendDetectObject, sendImage } from "../messages";
import { robot } from "../robot";

export const captureImage = async ({
  action,
  shouldDetectObjects,
}: CommandArguments["CAPTURE_IMAGE"]) => {
  switch (action) {
    case "STILL": {
      const image = await robot.camera.captureImage();
      if (!shouldDetectObjects) return sendImage(image);
      const referenceDistance = await robot.ultrasonic.getDistance();
      await sendDetectObject({ image, name: "", referenceDistance });
    }
    case "VIDEO":
      return robot.camera.captureVideo(sendImage);
    case "OFF":
      return robot.camera.stopCapture();
    default:
      return;
  }
};
