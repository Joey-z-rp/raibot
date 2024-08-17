import { RobotServerMessageContents } from "../../command-interface";
import { estimate } from "../../depth-estimation";

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

  const estimationResults = await estimate({
    file_path: filePath,
    reference_distance: content.referenceDistance,
    objects: detectionResults.map((r) => ({
      name: r.name,
      coordinate: r.coordinate,
    })),
  });

  sendEnvUpdates({
    image: content.image,
    objects: detectionResults.map((r) => ({
      ...r,
      distance: estimationResults[r.name],
      offCenterAngle: calculateOffCenterAngle(r.coordinate),
    })),
  });

  deleteFile(filePath);
};
