import { WebSocket } from "ws";
import { SendMessage } from "./types";
import { buildSendStartRecoding } from "./start-recording";

let currentConnection: WebSocket;

const sendMessage: SendMessage = (message) => {
  currentConnection.send(JSON.stringify(message));
};

export const initialiseRobotServerMessageSender = (connection: WebSocket) => {
  currentConnection = connection;
};

export const sendStartRecoding = buildSendStartRecoding(sendMessage);
