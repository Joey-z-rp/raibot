import { WebSocket } from "ws";
import { getMessage } from "./utils";

let currentConnection: WebSocket;

export const initialiseServerMessageSender = (connection: WebSocket) => {
  currentConnection = connection;
};

export const sendEnvUpdates = (updates: {
  image: Buffer;
  referenceDistance: number;
}) => {
  currentConnection.send(
    JSON.stringify(
      getMessage("ENV_UPDATES", {
        image: updates.image.toString("base64"),
        referenceDistance: updates.referenceDistance,
      })
    )
  );
};
