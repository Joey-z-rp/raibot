import { WebSocket } from "ws";
import { buildSendEnvUpdates } from "./env-updates";
import { SendMessage } from "./types";
import { monitorAudioInput } from "./monitor-audio-input";
import { buildSendAudioInput } from "./audio-input";

let currentConnection: WebSocket;

const sendMessage: SendMessage = (message) => {
  currentConnection.send(JSON.stringify(message));
};

export const startMonitoringAudio = () => monitorAudioInput(sendMessage);

export const initialiseServerMessageSender = (connection: WebSocket) => {
  currentConnection = connection;
  startMonitoringAudio();
};

export const sendEnvUpdates = buildSendEnvUpdates(sendMessage);

export const sendAudioInput = buildSendAudioInput(sendMessage);
