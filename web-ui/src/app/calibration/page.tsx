"use client";
import { useRobotServer } from "@/hooks/use-robot-server";
import { Control } from "./control";
import { SavePostures } from "./save-postures";

export default function Page() {
  const { sendCommand } = useRobotServer();

  return (
    <div className="h-full">
      <h1 className="mb-4 text-5xl font-extrabold dark:text-white">
        Calibration
      </h1>
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
