import { WebSocket } from "ws";
import { sendRobotStatus } from "./robot-status";
import { getMessage } from "./utils";

let currentConnection: WebSocket;

export const initialiseMessageSender = (connection: WebSocket) => {
  currentConnection = connection;
  sendRobotStatus(connection);
};

export const sendImage = (data: Buffer) => {
  currentConnection.send(
    JSON.stringify(
      getMessage("CAPTURED_IMAGE", {
        image: `data:image/jpeg;base64, ${data.toString("base64")}`,
      })
    )
  );
};
