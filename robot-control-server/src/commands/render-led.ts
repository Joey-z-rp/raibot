import { CommandArguments } from "../command-interface";
import { robot } from "../robot";

export const renderLed = ({ action }: CommandArguments["RENDER_LED"]) => {
  robot.led.render(action);
};
