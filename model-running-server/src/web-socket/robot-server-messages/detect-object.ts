import { RobotServerMessageContents } from "../../command-interface";

import { deleteFile } from "../../utils";
import { sendEnvUpdates } from "../send-messages";
import { calculateOffCenterAngle, detectObject } from "./utils";

export const processDetectObjectMessage = async (
  content: RobotServerMessageContents["DETECT_OBJECT"]
) => {
  const { filePath, detectionResults } = await detectObject(
    content.image,
    content.name
  );

  sendEnvUpdates({
    image: content.image,
    objects: detectionResults.map((r) => ({
      ...r,
      offCenterAngle: calculateOffCenterAngle(r.coordinate),
    })),
  });

  deleteFile(filePath);
};
