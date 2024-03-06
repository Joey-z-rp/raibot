import { WebSocketServer, WebSocket } from "ws";
import { networkInterfaces } from "os";
import { createServer } from "http";
import { processCommand } from "./commands";

const server = createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;
server.listen(port, () => {
  console.info(`WebSocket server is running on port ${port}`);
  console.info(`IP: ${networkInterfaces()["wlan0"]?.[0].address}`);
});

let currentConnection: WebSocket | undefined;

wsServer.on("connection", (connection) => {
  if (currentConnection) currentConnection.close();
  currentConnection = connection;
  currentConnection.on("message", (message) => {
    processCommand(JSON.parse(message.toString()));
  });
});
