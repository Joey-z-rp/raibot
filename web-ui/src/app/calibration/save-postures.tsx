import { Posture } from "@/command-interface";
import { Button } from "@/components/button";
import { SendCommand } from "@/types/command";

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
