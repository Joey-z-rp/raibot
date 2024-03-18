import { WebSocketServer, WebSocket } from "ws";
import { networkInterfaces } from "os";
import { createServer } from "http";
import { processRobotServerMessages } from "./robot-server-messages";
import { initialiseBrowsserMessageSender } from "./send-messages";

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
    initialiseBrowsserMessageSender(connection);
  });

  wsClient.on("message", (message) => {
    processRobotServerMessages(JSON.parse(message.toString()));
  });
};
