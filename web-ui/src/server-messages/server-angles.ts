import { ServerMessageContents } from "@/command-interface";
import { SetServerState } from "@/types/server-context";

export const processServoAnglesMessage = (
  content: ServerMessageContents["SERVO_ANGLES"],
  setServerState: SetServerState
) => {
  setServerState({ servoAngles: content });
};
