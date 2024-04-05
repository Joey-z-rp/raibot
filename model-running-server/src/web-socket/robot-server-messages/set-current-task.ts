import { RobotServerMessageContents } from "../../command-interface";
import { robotState } from "../../robot-state";

export const processSetCurrentTaskMessage = async (
  content: RobotServerMessageContents["SET_CURRENT_TASK"]
) => {
  robotState.setCurrentTask(content.currentTask);
};
