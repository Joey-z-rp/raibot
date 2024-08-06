import { robot } from "../robot";
import { codeEvaluator } from "./code-evaluator";

export const stopActions = () => {
  robot.control.stopActions();
  codeEvaluator.stop();
};
