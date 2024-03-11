import { Button } from "@/components/ui/button";
import { useRobotServer } from "@/hooks/use-robot-server";
import { useRef } from "react";

export const SetSpeed = () => {
  const { speed, sendCommand } = useRobotServer();
  const speedInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h2>Speed: {speed}</h2>
      <div>
        <input placeholder="Speed" ref={speedInputRef} type="number" />
        <Button
          onClick={() =>
            speedInputRef.current?.value &&
            sendCommand({
              command: "SET_SPEED",
              args: { speed: Number(speedInputRef.current.value) },
            })
          }
        >
          Connect
        </Button>
      </div>
    </div>
  );
};
