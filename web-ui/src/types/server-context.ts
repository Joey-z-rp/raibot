import { Command, CommandArguments, Position } from "@/command-interface";
import { MutableRefObject } from "react";

export type SendCommand = <T extends Command>(params: {
  command: T;
  args: CommandArguments[T];
}) => void;

type ServoAngles = Record<Position, number>;

export type ServerContext = {
  wsServerIp: string | undefined;
  isConnected: boolean;
  connect: (ipAddress: string) => void;
  sendCommand: SendCommand;
  servoAngles: ServoAngles;
};

export type ServerState = { servoAngles: ServoAngles };

export type SetServerState = (state: ServerState) => void;
