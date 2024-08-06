import { WebSocket } from "ws";
import { SendMessage } from "./types";
import { buildSendStartRecoding } from "./start-recording";
import { buildSendRenderLed } from "./render-led";
import { buildSendPlayAudio } from "./play-audio";
import { buildSendGetEnvUpdates } from "./get-env-updates";
import { buildSendStartMonitoringAudioInput } from "./start-monitoring-audio-input";
import { buildSendExecuteCode } from "./execute-code";
import { buildSendStopActions } from "./stop-actions";

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

export const sendGetEnvUpdates = buildSendGetEnvUpdates(sendMessage);

export const sendStartMonitoringAudioInput =
  buildSendStartMonitoringAudioInput(sendMessage);

export const sendExecuteCode = buildSendExecuteCode(sendMessage);

export const sendStopActions = buildSendStopActions(sendMessage);
