import { CommandArguments } from "../command-interface";
import { robot } from "../robot";

export const savePosture = ({
  postureName,
}: CommandArguments["SAVE_POSTURE"]) => {
  robot.savePosture(postureName);
};
