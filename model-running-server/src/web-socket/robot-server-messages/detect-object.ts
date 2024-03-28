import { RobotServerMessageContents } from "../../command-interface";

import { deleteFile } from "../../utils";
import { sendDetectedObject } from "../send-messages";
import { calculateOffCenterAngle, detectObject } from "./utils";

export const processDetectObjectMessage = async (
  content: RobotServerMessageContents["DETECT_OBJECT"]
) => {
  const { filePath, detectionResults } = await detectObject(
    content.image,
    content.name
  );

  const filteredResult = detectionResults.filter(
    (r) => r.name === content.name
  );
  sendDetectedObject({
    operationId: content.operationId,
    offCenterAngles: filteredResult
      .sort((a, b) => b.confidence - a.confidence)
      .map((r) => calculateOffCenterAngle(r.coordinate)),
  });

  deleteFile(filePath);
};
