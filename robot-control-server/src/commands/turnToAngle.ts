import { CommandArguments } from "../command-interface";
import { robot } from "../robot";

export const turnToAngle = ({
  position,
  angle,
}: CommandArguments["TURN_TO_ANGLE"]) => {
  robot.servos[position].setTargetAngle(angle);
};
