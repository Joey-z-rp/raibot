import { RenderLedAction } from "../../../command-interface";
import { SendMessage } from "./types";

export const buildSendRenderLed =
  (sendMessage: SendMessage) => (action: RenderLedAction) => {
    sendMessage({
      command: "RENDER_LED",
      args: {
        action,
      },
    });
  };
