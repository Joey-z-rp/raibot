import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { SendCommand } from "@/types/server-context";

export const MovementControl = ({
  sendCommand,
}: {
  sendCommand: SendCommand;
}) => {
  const stop = () =>
    sendCommand({
      command: "STOP_ACTIONS",
      args: {},
    });

  return (
    <div>
      <h2 className="text-4xl font-bold dark:text-white">Movement control</h2>
      <div className="flex gap-1">
        <ActionButton
          action={() =>
            sendCommand({
              command: "PERFORM_ACTIONS",
              args: {
                actions: [
                  {
                    type: "MOVE_FORWARD",
                    args: {},
                    repeat: 1,
                  },
                ],
              },
            })
          }
          stop={stop}
        >
          Forward
        </ActionButton>
        <ActionButton
          action={() =>
            sendCommand({
              command: "PERFORM_ACTIONS",
              args: {
                actions: [
                  {
                    type: "MOVE_BACKWARD",
                    args: {},
                    repeat: 1,
                  },
                ],
              },
            })
          }
          stop={stop}
        >
          Backward
        </ActionButton>
        <ActionButton
          action={() =>
            sendCommand({
              command: "PERFORM_ACTIONS",
              args: {
                actions: [
                  {
                    type: "STEP_LEFT",
                    args: {},
                    repeat: 1,
                  },
                ],
              },
            })
          }
          stop={stop}
        >
          Step left
        </ActionButton>
        <ActionButton
          action={() =>
            sendCommand({
              command: "PERFORM_ACTIONS",
              args: {
                actions: [
                  {
                    type: "STEP_RIGHT",
                    args: {},
                    repeat: 1,
                  },
                ],
              },
            })
          }
          stop={stop}
        >
          Step right
        </ActionButton>
        <ActionButton
          action={() =>
            sendCommand({
              command: "PERFORM_ACTIONS",
              args: {
                actions: [
                  {
                    type: "TURN_LEFT",
                    args: {},
                    repeat: 1,
                  },
                ],
              },
            })
          }
          stop={stop}
        >
          Turn left
        </ActionButton>
        <ActionButton
          action={() =>
            sendCommand({
              command: "PERFORM_ACTIONS",
              args: {
                actions: [
                  {
                    type: "TURN_RIGHT",
                    args: {},
                    repeat: 1,
                  },
                ],
              },
            })
          }
          stop={stop}
        >
          Turn right
        </ActionButton>
      </div>
      <div className="flex gap-1">
        <Button
          onClick={() =>
            sendCommand({
              command: "PERFORM_ACTIONS",
              args: {
                actions: [
                  {
                    type: "STAND",
                    args: {},
                    repeat: 1,
                  },
                ],
              },
            })
          }
        >
          Stand
        </Button>
        <Button
          onClick={() =>
            sendCommand({
              command: "PERFORM_ACTIONS",
              args: {
                actions: [
                  {
                    type: "REST",
                    args: {},
                    repeat: 1,
                  },
                ],
              },
            })
          }
        >
          Rest
        </Button>
      </div>
    </div>
  );
};
