"use client";
import { useRobotServer } from "@/hooks/use-robot-server";
import { MoveLeg } from "./actions/move-leg";
import { MovementControl } from "./actions/movement-control";

export default function Home() {
  const { sendCommand } = useRobotServer();

  return (
    <main>
      <h1 className="mb-4 text-5xl font-extrabold dark:text-white">
        Robot Control
      </h1>
      <div>
        <div className="flex">
          <MoveLeg
            title="Move rear left leg"
            position="rearLeft"
            sendCommand={sendCommand}
          />
          <MoveLeg
            title="Move front left leg"
            position="frontLeft"
            sendCommand={sendCommand}
          />
        </div>
        <div className="flex">
          <MoveLeg
            title="Move rear right leg"
            position="rearRight"
            sendCommand={sendCommand}
          />
          <MoveLeg
            title="Move front right leg"
            position="frontRight"
            sendCommand={sendCommand}
          />
        </div>
      </div>
      <MovementControl sendCommand={sendCommand} />
    </main>
  );
}
