"use client";
import { CaptureImageAction } from "@/command-interface";
import { Button } from "@/components/ui/button";
import { useCapturedImage, useRobotServer } from "@/hooks/use-robot-server";

export default function Page() {
  const { sendCommand } = useRobotServer();
  const image = useCapturedImage();
  const sendCaptureCommand = (action: CaptureImageAction) => {
    sendCommand({
      command: "CAPTURE_IMAGE",
      args: { action },
    });
  };

  return (
    <div className="h-full">
      <h1 className="mb-4 text-5xl font-extrabold dark:text-white">Camera</h1>
      <div>
        <div>
          <img src={image} />
        </div>
        <div>
          <Button onClick={() => sendCaptureCommand("STILL")}>
            Capture image
          </Button>
          <Button onClick={() => sendCaptureCommand("VIDEO")}>
            Capture video
          </Button>
          <Button onClick={() => sendCaptureCommand("OFF")}>Stop</Button>
        </div>
      </div>
    </div>
  );
}
