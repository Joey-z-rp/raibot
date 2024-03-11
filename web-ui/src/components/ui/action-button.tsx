import { ReactNode, useRef } from "react";
import { Button } from "./button";
import { useRobotServer } from "@/hooks/use-robot-server";

const DELAY_TIME = 500;

export const ActionButton = ({
  action,
  children,
  className,
}: {
  action:
    | "MOVE_FORWARD"
    | "MOVE_BACKWARD"
    | "STEP_LEFT"
    | "STEP_RIGHT"
    | "TURN_LEFT"
    | "TURN_RIGHT";
  children: ReactNode;
  className?: string;
}) => {
  const { sendCommand } = useRobotServer();

  const mouseDownTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const performAction = (repeat: number) =>
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
  const continueAction = () => {
    performAction(Infinity);
    timerRef.current = setTimeout(continueAction, 1000);
  };

  const stop = () =>
    sendCommand({
      command: "STOP_ACTIONS",
      args: {},
    });

  return (
    <Button
      className={className}
      onMouseDown={() => {
        mouseDownTimeRef.current = Date.now();
        performAction(1);
        timerRef.current = setTimeout(continueAction, DELAY_TIME);
      }}
      onMouseUp={() => {
        timerRef.current && clearTimeout(timerRef.current);
        if (Date.now() - mouseDownTimeRef.current > DELAY_TIME) {
          stop();
        }
      }}
    >
      {children}
    </Button>
  );
};
