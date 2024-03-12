import { Command, CommandArguments, Position } from "@/command-interface";

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
  speed: number;
  lastDistanceMeasurement: number;
};

export type ServerState = {
  servoAngles: ServoAngles;
  speed: number;
  lastDistanceMeasurement: number;
};

export type SetServerState = (state: ServerState) => void;
