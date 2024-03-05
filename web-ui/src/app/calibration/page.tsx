"use client";
import { useRef, useState } from "react";
import useWebSocket from "react-use-websocket";

export default function Page() {
  const [wsServerIp, setWsServerIp] = useState<string>();
  const [isConnected, setIsConnected] = useState(false);
  const ipInputRef = useRef<HTMLInputElement>(null);

  const { sendJsonMessage } = useWebSocket(
    wsServerIp ? `ws://${wsServerIp}:8000` : null,
    {
      onOpen: () => {
        console.log("WebSocket connection established.");
        setIsConnected(true);
      },
    }
  );

  return (
    <div className="h-full">
      <h1>Calibration</h1>
      <div>
        <input placeholder="WS server IP" ref={ipInputRef} />
        <button
          onClick={() =>
            ipInputRef.current?.value && setWsServerIp(ipInputRef.current.value)
          }
        >
          Connect
        </button>
        <div>
          WS Server connection status:{" "}
          {isConnected ? "Connected" : "Disconnected"}
        </div>
      </div>
      <div>
        <div className="flex">
          <div>
            <h2>Rear left</h2>
            <div>
              <button
                onClick={() =>
                  sendJsonMessage({
                    action: "test",
                  })
                }
              >
                Move
              </button>
            </div>
          </div>
          <div>
            <h2>Front left</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
