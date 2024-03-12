import { Button } from "@/components/ui/button";
import { SendCommand } from "@/types/server-context";

export const UltrasonicControl = ({
  sendCommand,
  lastDistanceMeasurement,
}: {
  sendCommand: SendCommand;
  lastDistanceMeasurement: number;
}) => {
  return (
    <div className="flex gap-1">
      <h2 className="text-2xl font-bold dark:text-white">
        Distance: {lastDistanceMeasurement}cm
      </h2>
      <Button
        onClick={() =>
          sendCommand({
            command: "MEASURE_DISTANCE",
            args: {},
          })
        }
      >
        Measure
      </Button>
    </div>
  );
};
