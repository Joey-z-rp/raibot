import { getMessage } from "../utils";
import { SendMessage } from "./types";

export const buildSendDetectObject =
  (sendMessage: SendMessage) =>
  ({ image, name }: { image: Buffer; name: string }) => {
    sendMessage(
      getMessage("DETECT_OBJECT", {
        image: image.toString("base64"),
        name,
      })
    );
  };
