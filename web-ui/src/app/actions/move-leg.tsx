import { LimbPosition, MoveLegDirection } from "@/command-interface";
import { ActionButton } from "@/components/ui/action-button";
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
  const stop = () =>
    sendCommand({
      command: "STOP_ACTIONS",
      args: {},
    });

  return (
    <div>
      <h2 className="text-4xl font-bold dark:text-white">{title}</h2>
      <div className="flex gap-1">
        <ActionButton action={() => move("UP")} stop={stop}>
          Up
        </ActionButton>
        <ActionButton action={() => move("DOWN")} stop={stop}>
          Down
        </ActionButton>
        <ActionButton action={() => move("FORWARD")} stop={stop}>
          Forward
        </ActionButton>
        <ActionButton action={() => move("BACKWARD")} stop={stop}>
          Backward
        </ActionButton>
      </div>
    </div>
  );
};
