import { SendMessage } from "./types";

export const buildSendDetectedObject =
  (sendMessage: SendMessage) =>
  ({
    offCenterAngles,
    operationId,
  }: {
    offCenterAngles: number[];
    operationId: string;
  }) => {
    sendMessage({
      command: "DETECTED_OBJECT",
      args: {
        offCenterAngles,
        operationId,
      },
    });
  };
