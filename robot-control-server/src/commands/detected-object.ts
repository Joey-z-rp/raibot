import { CommandArguments } from "../command-interface";
import { promiseMap } from "../messages";

export const detectedObject = async ({
  offCenterAngles,
  operationId,
}: CommandArguments["DETECTED_OBJECT"]) => {
  const resolve = promiseMap[operationId];

  if (resolve) {
    resolve(offCenterAngles[0]);
    delete promiseMap[operationId];
  }
};
