import { WebSocketServer, WebSocket } from "ws";
import { networkInterfaces } from "os";
import { createServer } from "http";
import { processRobotServerMessages } from "./robot-server-messages";
import {
  initialiseBrowserMessageSender,
  initialiseRobotServerMessageSender,
} from "./send-messages";
import { robotState } from "../robot-state";
import { RobotServerMessageObject } from "../command-interface";

let browserConnection: WebSocket | undefined;

// For robot server connection
const wsClient = new WebSocket("ws://192.168.0.35:8000", {
  headers: { "user-agent": "Node.js" },
});

export const initialiseWebSocket = () => {
  const server = createServer();
  const wsServer = new WebSocketServer({ server });
  const port = 8001;
  server.listen(port, () => {
    console.info(`Modal running web socket server is running on port ${port}`);
    console.info(`IP: ${networkInterfaces()["wlan0"]?.[0].address}`);
  });

  wsServer.on("connection", (connection) => {
    if (browserConnection) browserConnection.close();
    browserConnection = connection;
    initialiseBrowserMessageSender(connection);
  });

  initialiseRobotServerMessageSender(wsClient);
  robotState.setProcessMessage(processRobotServerMessages);
  wsClient.on("message", (message) => {
    const parsedMessage = JSON.parse(
      message.toString()
    ) as RobotServerMessageObject;

    const isAudioInput = parsedMessage.type === "AUDIO_INPUT";
    const shouldQueueEnvUpdates =
      parsedMessage.type === "ENV_UPDATES" &&
      (!robotState.queuedMessage ||
        robotState.queuedMessage.type === "ENV_UPDATES");
    const shouldQueue = isAudioInput || shouldQueueEnvUpdates;

    if (robotState.isPlaying && shouldQueue) {
      robotState.queueMessage(parsedMessage);
    } else {
      processRobotServerMessages(parsedMessage);
    }
  });
};
