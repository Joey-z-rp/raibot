import { ReactNode, useRef } from "react";
import { Button } from "./button";

export const ActionButton = ({
  action,
  stop,
  children,
  className,
}: {
  action: () => void;
  stop: () => void;
  children: ReactNode;
  className?: string;
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const continueAction = () => {
    action();
    timerRef.current = setTimeout(continueAction, 1000);
  };

  return (
    <Button
      className={className}
      onMouseDown={continueAction}
      onMouseUp={() => {
        timerRef.current && clearTimeout(timerRef.current);
        stop();
      }}
    >
      {children}
    </Button>
  );
};
