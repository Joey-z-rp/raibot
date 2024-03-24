import { WebSocket } from "ws";
import { SendMessage } from "./types";
import { buildSendStartRecoding } from "./start-recording";
import { buildSendRenderLed } from "./render-led";
import { buildSendPlayAudio } from "./play-audio";

let currentConnection: WebSocket;

const sendMessage: SendMessage = (message) => {
  currentConnection.send(JSON.stringify(message));
};

export const initialiseRobotServerMessageSender = (connection: WebSocket) => {
  currentConnection = connection;
};

export const sendStartRecoding = buildSendStartRecoding(sendMessage);

export const sendRenderLed = buildSendRenderLed(sendMessage);

export const sendPlayAudio = buildSendPlayAudio(sendMessage);
