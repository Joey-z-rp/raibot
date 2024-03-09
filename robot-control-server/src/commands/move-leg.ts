import { CommandArguments } from "../command-interface";
import { robot } from "../robot";

export const moveLeg = (params: CommandArguments["MOVE_LEG"]) => {
  robot.moveLeg(params);
};
