"use client";
import { useRef } from "react";
import { Button } from "../ui/button";
import { useRobotServer } from "@/hooks/use-robot-server";

export const ConnectToServer = () => {
  const ipInputRef = useRef<HTMLInputElement>(null);

  const { connect, isConnected } = useRobotServer();

  return (
    <div>
      <input placeholder="WS server IP" ref={ipInputRef} />
      <Button
        onClick={() =>
          ipInputRef.current?.value && connect(ipInputRef.current.value)
        }
      >
        Connect
      </Button>
      <span>
        Connection status: {isConnected ? "Connected" : "Disconnected"}
      </span>
    </div>
  );
};
