import { writeFileSync } from "fs";
import { v4 } from "uuid";
import { TEMP_IMAGE_FOLDER_PATH } from "../../shared/constants";
import { transcribe } from "../../processors";
import { detect } from "../../object-detection";

export const transcribeAudio = async (base64Data: string) => {
  if (!base64Data) return;

  const filePath = `${TEMP_IMAGE_FOLDER_PATH}/${v4()}.wav`;
  writeFileSync(filePath, Buffer.from(base64Data, "base64"));
  const transcribedText = await transcribe(filePath);
  return transcribedText;
};

const IMAGE_WIDTH = 1280;
const CAMERA_FOV = 75; // degree

export const calculateOffCenterAngle = (coordinate: number[]) => {
  const coordinateCenter = (coordinate[0] + coordinate[2]) / 2;
  const imageCenter = IMAGE_WIDTH / 2;
  const offCenter = coordinateCenter - imageCenter;

  return Math.round((offCenter / IMAGE_WIDTH) * CAMERA_FOV);
};

export const detectObject = async (image: string, name?: string) => {
  const imageBuffer = Buffer.from(image, "base64");
  const filePath = `${TEMP_IMAGE_FOLDER_PATH}/${v4()}.jpeg`;
  writeFileSync(filePath, imageBuffer);

  const detectionResults = await detect(filePath, name);
  return { detectionResults, filePath };
};
