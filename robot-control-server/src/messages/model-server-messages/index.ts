import { WebSocket } from "ws";
import { buildSendEnvUpdates } from "./env-updates";
import { SendMessage } from "./types";
import { monitorAudioInput } from "./monitor-audio-input";

let currentConnection: WebSocket;

const sendMessage: SendMessage = (message) => {
  currentConnection.send(JSON.stringify(message));
};

export const initialiseServerMessageSender = (connection: WebSocket) => {
  currentConnection = connection;
  monitorAudioInput(sendMessage);
};

export const sendEnvUpdates = buildSendEnvUpdates(sendMessage);
