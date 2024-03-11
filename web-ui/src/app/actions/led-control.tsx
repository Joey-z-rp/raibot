import { Button } from "@/components/ui/button";
import { SendCommand } from "@/types/server-context";

export const LedControl = ({ sendCommand }: { sendCommand: SendCommand }) => {
  const render = (action: "FLOW_COLOR" | "OFF") =>
    sendCommand({
      command: "RENDER_LED",
      args: { action },
    });

  return (
    <div className="flex gap-1">
      <h2 className="text-4xl font-bold dark:text-white">LED:</h2>
      <Button onClick={() => render("FLOW_COLOR")}>On</Button>
      <Button onClick={() => render("OFF")}>Off</Button>
    </div>
  );
};
