import { CommandArguments } from "../command-interface";
import { robot } from "../robot";

export const performActions = ({
  actions,
}: CommandArguments["PERFORM_ACTIONS"]) => {
  return robot.control.performActions(
    actions.map((action) => ({
      ...action,
      repeat: action.repeat === null ? Infinity : action.repeat,
    }))
  );
};
