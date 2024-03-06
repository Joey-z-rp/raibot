import { Position } from "@/command-interface";
import { Button } from "@/components/button";
import { SendCommand } from "@/types/command";
import { useRef } from "react";

const lowAndHeadPositionLabels = ["Down", "Up"];
const highPositionLabels = ["Back", "Front"];
const shoulderPositionLabels = ["In", "Out"];

const moveButtonLabels = {
  frontLeftLow: lowAndHeadPositionLabels,
  frontLeftHigh: highPositionLabels,
  frontLeftShoulder: shoulderPositionLabels,
  rearLeftLow: lowAndHeadPositionLabels,
  rearLeftHigh: highPositionLabels,
  rearLeftShoulder: shoulderPositionLabels,
  rearRightShoulder: shoulderPositionLabels,
  rearRightHigh: highPositionLabels,
  rearRightLow: lowAndHeadPositionLabels,
  frontRightShoulder: shoulderPositionLabels,
  frontRightHigh: highPositionLabels,
  frontRightLow: lowAndHeadPositionLabels,
  head: lowAndHeadPositionLabels,
};

const ServoControl = ({
  position,
  sendCommand,
}: {
  position: Position;
  sendCommand: SendCommand;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const move = (amount: number) =>
    sendCommand({
      command: "MOVE",
      args: {
        position,
        amount,
      },
    });

  const turnToAngle = () => {
    inputRef.current?.value &&
      sendCommand({
        command: "TURN_TO_ANGLE",
        args: {
          position,
          angle: Number(inputRef.current.value),
        },
      });
  };

  return (
    <div className="flex gap-1">
      <Button onClick={() => move(-2)}>{moveButtonLabels[position][0]}</Button>
      <Button onClick={() => move(2)}>{moveButtonLabels[position][1]}</Button>
      <div className="flex gap-2">
        <input className="w-10" ref={inputRef} type="number" />
        <Button onClick={turnToAngle}>Turn to angle</Button>
      </div>
    </div>
  );
};

export const Control = ({
  title,
  positions,
  sendCommand,
}: {
  title: string;
  positions: Position[];
  sendCommand: SendCommand;
}) => {
  return (
    <div>
      <h2 className="text-4xl font-bold dark:text-white">{title}</h2>
      <div>
        {positions.map((position) => {
          return (
            <ServoControl
              key={position}
              position={position}
              sendCommand={sendCommand}
            />
          );
        })}
      </div>
    </div>
  );
};
