import { Command, CommandArguments } from "@/command-interface";
import { useState } from "react";
import useWebSocket from "react-use-websocket";

export const useServerCommand = () => {
  const [wsServerIp, setWsServerIp] = useState<string>();
  const [isConnected, setIsConnected] = useState(false);

  const { sendJsonMessage } = useWebSocket(
    wsServerIp ? `ws://${wsServerIp}:8000` : null,
    {
      onOpen: () => {
        console.info("WebSocket connection established.");
        setIsConnected(true);
      },
    }
  );

  const sendCommand = <T extends Command>(params: {
    command: T;
    args: CommandArguments[T];
  }) => {
    sendJsonMessage(params);
  };

  return {
    connect: (ipAddress: string) => setWsServerIp(ipAddress),
    isConnected,
    sendCommand,
  };
};
