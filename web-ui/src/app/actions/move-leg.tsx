import { LimbPosition, MoveLegDirection } from "@/command-interface";
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
  const move = (direction: MoveLegDirection) =>
    sendCommand({
      command: "PERFORM_ACTIONS",
      args: {
        actions: [
          {
            type: "MOVE_LEG",
            repeat: Infinity,
            args: {
              position,
              direction,
              distance: 2,
            },
          },
        ],
      },
    });

  return (
    <div>
      <h2 className="text-4xl font-bold dark:text-white">{title}</h2>
      <div className="flex gap-1">
        <Button onClick={() => move("UP")}>Up</Button>
        <Button onClick={() => move("DOWN")}>Down</Button>
        <Button onClick={() => move("FORWARD")}>Forward</Button>
        <Button onClick={() => move("BACKWARD")}>Backward</Button>
      </div>
    </div>
  );
};
