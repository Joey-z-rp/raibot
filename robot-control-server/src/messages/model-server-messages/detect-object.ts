import { getMessage } from "../utils";
import { SendMessage } from "./types";

export const buildSendDetectObject =
  (sendMessage: SendMessage, promiseMap: Record<string, Function>) =>
  ({
    image,
    name,
    operationId,
  }: {
    image: Buffer;
    name: string;
    operationId: string;
  }) => {
    sendMessage(
      getMessage("DETECT_OBJECT", {
        image: image.toString("base64"),
        name,
        operationId,
      })
    );

    return new Promise<number | undefined>((resolve) => {
      promiseMap[operationId] = resolve;
    });
  };
