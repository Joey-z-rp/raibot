import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { SendCommand } from "@/types/server-context";

export const MovementControl = ({
  sendCommand,
}: {
  sendCommand: SendCommand;
}) => {
  const performAction = (action: "STAND" | "REST") =>
    sendCommand({
      command: "PERFORM_ACTIONS",
      args: {
        actions: [
          {
            type: action,
            args: {},
            repeat: 1,
          },
        ],
      },
    });

  return (
    <div>
      <h2 className="text-4xl font-bold dark:text-white">Movement control</h2>
      <div className="flex gap-1">
        <ActionButton action="MOVE_FORWARD">Forward</ActionButton>
        <ActionButton action="MOVE_BACKWARD">Backward</ActionButton>
        <ActionButton action="STEP_LEFT">Step left</ActionButton>
        <ActionButton action="STEP_RIGHT">Step right</ActionButton>
        <ActionButton action="TURN_LEFT">Turn left</ActionButton>
        <ActionButton action="TURN_RIGHT">Turn right</ActionButton>
      </div>
      <div className="flex gap-1">
        <Button onClick={() => performAction("STAND")}>Stand</Button>
        <Button onClick={() => performAction("REST")}>Rest</Button>
      </div>
    </div>
  );
};
