"use client";
import { Button } from "@/components/ui/button";
import { useModelServer } from "@/hooks/use-model-server";
import { useRobotServer } from "@/hooks/use-robot-server";
import { EnvUpdates } from "./env-updates";
import { useEffect, useState } from "react";

export default function Page() {
  const [shouldGetUpdates, setShouldGetUpdates] = useState(false);
  const { isConnected, envUpdates } = useModelServer();
  const { sendCommand } = useRobotServer();
  const sendGetEnvUpdatesCommand = () => {
    sendCommand({
      command: "CAPTURE_IMAGE",
      args: { action: "STILL", shouldDetectObjects: true },
    });
  };

  useEffect(() => {
    if (shouldGetUpdates) {
      sendGetEnvUpdatesCommand();
    }
  }, [envUpdates, shouldGetUpdates]);

  return (
    <div className="h-full">
      <h1 className="mb-4 text-5xl font-extrabold dark:text-white">Inspect</h1>
      <div>
        <div>
          Model server connection: {isConnected ? "Connected" : "Disconnected"}
        </div>
        <div>
          <Button onClick={() => setShouldGetUpdates(true)}>
            Start getting updates
          </Button>
          <Button onClick={() => setShouldGetUpdates(false)}>Stop</Button>
        </div>
        <EnvUpdates envUpdates={envUpdates} />
      </div>
    </div>
  );
}
