import { WebSocketServer, WebSocket } from "ws";
import { networkInterfaces } from "os";
import { createServer } from "http";
import { processCommand } from "./commands";
import {
  initialiseBrowsserMessageSender,
  initialiseServerMessageSender,
} from "./messages";

const server = createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;
server.listen(port, () => {
  console.info(`WebSocket server is running on port ${port}`);
  console.info(`IP: ${networkInterfaces()["wlan0"]?.[0].address}`);
});

let browserConnection: WebSocket | undefined;
let modelServerConnection: WebSocket | undefined;

wsServer.on("connection", (connection, req) => {
  const userAgent = req.headers["user-agent"];
  const isFromServer = userAgent.includes("Node.js");
  if (isFromServer) {
    if (modelServerConnection) modelServerConnection.close();
    modelServerConnection = connection;
    initialiseServerMessageSender(connection);
  } else {
    if (browserConnection) browserConnection.close();
    browserConnection = connection;
    browserConnection.on("message", (message) => {
      processCommand(JSON.parse(message.toString()));
    });
    initialiseBrowsserMessageSender(connection);
  }
});
