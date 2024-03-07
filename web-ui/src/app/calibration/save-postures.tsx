import { Posture } from "@/command-interface";
import { Button } from "@/components/ui/button";
import { SendCommand } from "@/types/server-context";

export const SavePostures = ({ sendCommand }: { sendCommand: SendCommand }) => {
  const save = (posture: Posture) =>
    sendCommand({
      command: "SAVE_POSTURE",
      args: { postureName: posture },
    });

  return (
    <div className="flex gap-1">
      <Button onClick={() => save("STAND")}>Save stand posture</Button>
      <Button onClick={() => save("REST")}>Save rest posture</Button>
    </div>
  );
};
