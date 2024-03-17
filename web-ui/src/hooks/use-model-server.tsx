import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { processModelServerMessages } from "@/model-server-messages";
import {
  ModelServerMessageContents,
  ModelServerMessageObject,
} from "@/command-interface";

export const useModelServer = () => {
  const [envUpdates, setEnvUpdates] =
    useState<ModelServerMessageContents["CALCULATED_ENV_UPDATES"]>();
  const { readyState, lastJsonMessage } = useWebSocket("ws://localhost:8001");
  useEffect(() => {
    processModelServerMessages(
      lastJsonMessage as ModelServerMessageObject,
      setEnvUpdates
    );
  }, [lastJsonMessage]);

  return {
    isConnected: readyState === ReadyState.OPEN,
    envUpdates,
  };
};
