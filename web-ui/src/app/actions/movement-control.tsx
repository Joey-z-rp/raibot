import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { SendCommand } from "@/types/server-context";

export const MovementControl = ({
  sendCommand,
}: {
  sendCommand: SendCommand;
}) => {
  const performAction = (
    action:
      | "MOVE_FORWARD"
      | "MOVE_BACKWARD"
      | "STEP_LEFT"
      | "STEP_RIGHT"
      | "TURN_LEFT"
      | "TURN_RIGHT"
      | "STAND"
      | "REST",
    repeat = Infinity
  ) =>
    sendCommand({
      command: "PERFORM_ACTIONS",
      args: {
        actions: [
          {
            type: action,
            args: {},
            repeat,
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
      <h2 className="text-4xl font-bold dark:text-white">Movement control</h2>
      <div className="flex gap-1">
        <ActionButton action={() => performAction("MOVE_FORWARD")} stop={stop}>
          Forward
        </ActionButton>
        <ActionButton action={() => performAction("MOVE_BACKWARD")} stop={stop}>
          Backward
        </ActionButton>
        <ActionButton action={() => performAction("STEP_LEFT")} stop={stop}>
          Step left
        </ActionButton>
        <ActionButton action={() => performAction("STEP_RIGHT")} stop={stop}>
          Step right
        </ActionButton>
        <ActionButton action={() => performAction("TURN_LEFT")} stop={stop}>
          Turn left
        </ActionButton>
        <ActionButton action={() => performAction("TURN_RIGHT")} stop={stop}>
          Turn right
        </ActionButton>
      </div>
      <div className="flex gap-1">
        <Button onClick={() => performAction("STAND", 1)}>Stand</Button>
        <Button onClick={() => performAction("REST", 1)}>Rest</Button>
      </div>
    </div>
  );
};
