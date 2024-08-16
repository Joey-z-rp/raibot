import { v4 } from "uuid";
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
      const operationId = v4();
      await sendDetectObject({ image, name: "", operationId });
    }
    case "VIDEO":
      return robot.camera.captureVideo(sendImage);
    case "OFF":
      return robot.camera.stopCapture();
    default:
      return;
  }
};
