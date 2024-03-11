import { ServerMessageContents } from "@/command-interface";
import { SetServerState } from "@/types/server-context";

export const processRobotStatusMessage = (
  content: ServerMessageContents["ROBOT_STATUS"],
  setServerState: SetServerState
) => {
  setServerState(content);
};
