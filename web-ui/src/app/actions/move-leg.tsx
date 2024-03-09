import { LimbPosition } from "@/command-interface";
import { Button } from "@/components/ui/button";
import { SendCommand } from "@/types/server-context";

export const MoveLeg = ({
  title,
  position,
  sendCommand,
}: {
  title: string;
  position: LimbPosition;
  sendCommand: SendCommand;
}) => {
  return (
    <div>
      <h2 className="text-4xl font-bold dark:text-white">{title}</h2>
      <div className="flex gap-1">
        <Button
          onClick={() =>
            sendCommand({
              command: "MOVE_LEG",
              args: { position, direction: "UP", distance: 2 },
            })
          }
        >
          Up
        </Button>
        <Button
          onClick={() =>
            sendCommand({
              command: "MOVE_LEG",
              args: { position, direction: "DOWN", distance: 2 },
            })
          }
        >
          Down
        </Button>
        <Button
          onClick={() =>
            sendCommand({
              command: "MOVE_LEG",
              args: { position, direction: "FORWARD", distance: 2 },
            })
          }
        >
          Forward
        </Button>
        <Button
          onClick={() =>
            sendCommand({
              command: "MOVE_LEG",
              args: { position, direction: "BACKWARD", distance: 2 },
            })
          }
        >
          Backward
        </Button>
      </div>
    </div>
  );
};
