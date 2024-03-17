import { sendEnvUpdates } from "../messages";
import { robot } from "../robot";

export const getEnvUpdates = async () => {
  const [image, referenceDistance] = await Promise.all([
    robot.camera.captureImage(),
    robot.ultrasonic.getDistance(),
  ]);

  sendEnvUpdates({ image, referenceDistance });
};
