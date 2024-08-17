import { getMessage } from "../utils";
import { SendMessage } from "./types";

export const buildSendDetectObject =
  (sendMessage: SendMessage) =>
  ({
    image,
    name,
    referenceDistance,
  }: {
    image: Buffer;
    name: string;
    referenceDistance: number;
  }) => {
    sendMessage(
      getMessage("DETECT_OBJECT", {
        image: image.toString("base64"),
        name,
        referenceDistance,
      })
    );
  };
