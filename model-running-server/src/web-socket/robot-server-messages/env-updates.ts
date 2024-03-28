import { RobotServerMessageContents } from "../../command-interface";
import { sendEnvUpdates, sendGetEnvUpdates } from "../send-messages";
import { deleteFile } from "../../utils";
import { robotState } from "../../robot-state";
import { calculateOffCenterAngle, detectObject } from "./utils";

const ENV_REFRESH_INTERVAL = 1000;

export const processEnvUpdatesMessage = async (
  content: RobotServerMessageContents["ENV_UPDATES"]
) => {
  const { detectionResults, filePath } = await detectObject(content.image);

  robotState.setEnvUpdates({
    updatedTime: Date.now(),
    ultrasonicSensorReading: content.referenceDistance,
    detectedObjects: detectionResults.map((r) => ({
      name: r.name,
      relativeDistance: 0,
      offCenterAngle: calculateOffCenterAngle(r.coordinate),
    })),
  });
  if (robotState.isRecording) {
    robotState.setRefreshEnvTimer(
      setTimeout(sendGetEnvUpdates, ENV_REFRESH_INTERVAL)
    );
  }

  sendEnvUpdates({
    image: content.image,
    objects: detectionResults.map((r) => ({
      name: r.name,
      confidence: r.confidence,
      coordinate: r.coordinate,
      distance: 0,
      offCenterAngle: calculateOffCenterAngle(r.coordinate),
    })),
  });

  deleteFile(filePath);
};
