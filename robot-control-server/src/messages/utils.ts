import {
  RobotServerMessage,
  RobotServerMessageContents,
} from "../command-interface";

export const getMessage = <T extends RobotServerMessage>(
  type: T,
  content: RobotServerMessageContents[T]
) => ({
  type,
  content,
});

export const imageBufferToBase64 = (buffer: Buffer) =>
  `data:image/jpeg;base64, ${buffer.toString("base64")}`;
