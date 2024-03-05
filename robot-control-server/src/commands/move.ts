import { CommandArguments } from "../command-interface";
import { robot } from "../robot";

export const move = ({ position, amount }: CommandArguments["MOVE"]) => {
  robot.servos[position].move(amount);
};
