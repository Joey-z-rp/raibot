import { writeFileSync } from "fs";
import { v4 } from "uuid";

import { RobotServerMessageContents } from "../../command-interface";
import { sendEnvUpdates } from "../send-messages";
import { TEMP_IMAGE_FOLDER_PATH } from "../../shared/constants";
import { detect } from "../../object-detection";
import { estimate } from "../../depth-estimation";

export const processEnvUpdatesMessage = async (
  content: RobotServerMessageContents["ENV_UPDATES"]
) => {
  const imageBuffer = Buffer.from(content.image, "base64");
  const filePath = `${TEMP_IMAGE_FOLDER_PATH}/${v4()}.jpeg`;
  writeFileSync(filePath, imageBuffer);
  const detectionResults = await detect(filePath);
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
      name: r.name,
      confidence: r.confidence,
      coordinate: r.coordinate,
      distance: estimationResults[r.name],
    })),
  });
  // Send to LLM
};
