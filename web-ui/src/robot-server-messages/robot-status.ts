import { RobotServerMessageContents } from "@/command-interface";
import { SetServerState } from "@/types/server-context";

export const processRobotStatusMessage = (
  content: RobotServerMessageContents["ROBOT_STATUS"],
  setServerState: SetServerState
) => {
  setServerState(content);
};
