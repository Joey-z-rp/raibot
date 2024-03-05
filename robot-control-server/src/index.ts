import { WebSocketServer, WebSocket } from "ws";
import { createServer } from "http";
import { processCommand } from "./commands";

const server = createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;
server.listen(port, () => {
  console.info(`WebSocket server is running on port ${port}`);
});

let currentConnection: WebSocket | undefined;

wsServer.on("connection", (connection) => {
  if (currentConnection) currentConnection.close();
  currentConnection = connection;
  currentConnection.on("message", (message) => {
    processCommand(JSON.parse(message.toString()));
  });
});
