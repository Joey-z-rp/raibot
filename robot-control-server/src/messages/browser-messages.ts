import { WebSocket } from "ws";
import { sendRobotStatus } from "./robot-status";
import { imageBufferToBase64, getMessage } from "./utils";

let currentConnection: WebSocket;

export const initialiseBrowsserMessageSender = (connection: WebSocket) => {
  currentConnection = connection;
  sendRobotStatus(connection);
};

export const sendImage = (data: Buffer) => {
  currentConnection.send(
    JSON.stringify(
      getMessage("CAPTURED_IMAGE", {
        image: imageBufferToBase64(data),
      })
    )
  );
};
