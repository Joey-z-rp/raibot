import { CommandArguments } from "../command-interface";
import { robot } from "../robot";

export const setSpeed = ({ speed }: CommandArguments["SET_SPEED"]) =>
  robot.setSpeed(speed);
