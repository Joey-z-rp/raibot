"use client";
import { useServerCommand } from "@/hooks/use-server-command";
import { useRef } from "react";
import { Control } from "./control";
import { Button } from "@/components/button";
import { SavePostures } from "./save-postures";

export default function Page() {
  const ipInputRef = useRef<HTMLInputElement>(null);

  const { connect, isConnected, sendCommand } = useServerCommand();

  return (
    <div className="h-full">
      <h1 className="mb-4 text-5xl font-extrabold dark:text-white">
        Calibration
      </h1>
      <div className="mb-4">
        <input placeholder="WS server IP" ref={ipInputRef} />
        <Button
          onClick={() =>
            ipInputRef.current?.value && connect(ipInputRef.current.value)
          }
        >
          Connect
        </Button>
        <div>
          WS Server connection status:{" "}
          {isConnected ? "Connected" : "Disconnected"}
        </div>
      </div>
      <div className="flex mb-4">
        <div>
          <div className="flex">
            <Control
              title="Rear left"
              positions={["rearLeftShoulder", "rearLeftHigh", "rearLeftLow"]}
              sendCommand={sendCommand}
            />
            <Control
              title="Front left"
              positions={["frontLeftShoulder", "frontLeftHigh", "frontLeftLow"]}
              sendCommand={sendCommand}
            />
          </div>
          <div className="flex">
            <Control
              title="Rear right"
              positions={["rearRightShoulder", "rearRightHigh", "rearRightLow"]}
              sendCommand={sendCommand}
            />
            <Control
              title="Front right"
              positions={[
                "frontRightShoulder",
                "frontRightHigh",
                "frontRightLow",
              ]}
              sendCommand={sendCommand}
            />
          </div>
        </div>
        <div>
          <Control
            title="Head"
            positions={["head"]}
            sendCommand={sendCommand}
          />
        </div>
      </div>
      <SavePostures sendCommand={sendCommand} />
    </div>
  );
}
