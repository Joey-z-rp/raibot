import { writeFileSync } from "fs";
import { v4 } from "uuid";

import { RobotServerMessageContents } from "../../command-interface";
import { sendEnvUpdates } from "../send-messages";
import { TEMP_IMAGE_FOLDER_PATH } from "../../shared/constants";
import { detect } from "../../object-detection";
import { estimate } from "../../depth-estimation";

const IMAGE_WIDTH = 1280;
const CAMERA_FOV = 75; // degree

const calculateOffCenterAngle = (coordinate: number[]) => {
  const coordinateCenter = (coordinate[0] + coordinate[2]) / 2;
  const imageCenter = IMAGE_WIDTH / 2;
  const offCenter = coordinateCenter - imageCenter;

  return Math.round((offCenter / IMAGE_WIDTH) * CAMERA_FOV);
};

export const processEnvUpdatesMessage = async (
  content: RobotServerMessageContents["ENV_UPDATES"]
) => {
  const imageBuffer = Buffer.from(content.image, "base64");
  const filePath = `${TEMP_IMAGE_FOLDER_PATH}/${v4()}.jpeg`;
  writeFileSync(filePath, imageBuffer);
  const startObjectDetectionTime = performance.now();
  const detectionResults = await detect(filePath);
  // Implement IOU filtering here
  const startDepthEstimationTime = performance.now();
  const estimationResults = await estimate({
    file_path: filePath,
    reference_distance: content.referenceDistance,
    objects: detectionResults.map((r) => ({
      name: r.name,
      coordinate: r.coordinate,
    })),
  });
  const endDepthEstimationTime = performance.now();
  sendEnvUpdates({
    image: content.image,
    objects: detectionResults.map((r) => ({
      name: r.name,
      confidence: r.confidence,
      coordinate: r.coordinate,
      distance: estimationResults[r.name],
      offCenterAngle: calculateOffCenterAngle(r.coordinate),
    })),
  });
  console.info(
    `Object detection time: ${
      startDepthEstimationTime - startObjectDetectionTime
    }`
  );
  console.info(
    `Depth estimation time: ${
      endDepthEstimationTime - startDepthEstimationTime
    }`
  );
  // Send to LLM
};
