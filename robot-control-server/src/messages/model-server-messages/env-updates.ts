import { getMessage } from "../utils";
import { SendMessage } from "./types";

export const buildSendEnvUpdates =
  (sendMessage: SendMessage) =>
  (updates: { image: Buffer; referenceDistance: number }) => {
    sendMessage(
      getMessage("ENV_UPDATES", {
        image: updates.image.toString("base64"),
        referenceDistance: updates.referenceDistance,
      })
    );
  };
