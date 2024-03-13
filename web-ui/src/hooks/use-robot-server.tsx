"use client";
import { Position, ServerMessageObject, positions } from "@/command-interface";
import { processServerMessages } from "@/server-messages";
import {
  SendCommand,
  ServerContext,
  ServerState,
} from "@/types/server-context";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const defaultServoAngles = positions.reduce(
  (angles, position) => ({ ...angles, [position]: 0 }),
  {} as Record<Position, number>
);

const RobotServerContext = createContext<ServerContext>({
  wsServerIp: undefined,
  isConnected: false,
  connect: () => {},
  sendCommand: () => {},
  servoAngles: defaultServoAngles,
  speed: 5,
  lastDistanceMeasurement: 0,
});

const CapturedImageContext = createContext<{ image: string }>({
  image: "",
});

export const RobotServerProvider = ({ children }: { children: ReactNode }) => {
  const [wsServerIp, setWsServerIp] = useState<string>();
  const [serverState, setServerState] = useState<ServerState>({
    servoAngles: defaultServoAngles,
    speed: 5,
    lastDistanceMeasurement: 0,
  });
  const [capturedImage, setCapturedImage] = useState({ image: "" });

  const { sendJsonMessage, readyState, lastJsonMessage } = useWebSocket(
    wsServerIp ? `ws://${wsServerIp}:8000` : null,
    {
      onClose: () => {
        setWsServerIp(undefined);
      },
    }
  );

  useEffect(() => {
    processServerMessages(
      lastJsonMessage as ServerMessageObject,
      setServerState,
      setCapturedImage
    );
  }, [lastJsonMessage]);

  const connect = (ipAddress: string) => setWsServerIp(ipAddress);
  const sendCommand: SendCommand = (params) => {
    sendJsonMessage(params);
  };

  return (
    <RobotServerContext.Provider
      value={{
        wsServerIp,
        isConnected: readyState === ReadyState.OPEN,
        connect,
        sendCommand,
        servoAngles: serverState.servoAngles,
        speed: serverState.speed,
        lastDistanceMeasurement: serverState.lastDistanceMeasurement,
      }}
    >
      <CapturedImageContext.Provider value={capturedImage}>
        {children}
      </CapturedImageContext.Provider>
    </RobotServerContext.Provider>
  );
};

export const useRobotServer = () => {
  const context = useContext(RobotServerContext);
  return context;
};

export const useCapturedImage = () => {
  const { image } = useContext(CapturedImageContext);
  return image;
};
