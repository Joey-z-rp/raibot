import { CommandArguments } from "../command-interface";
import { codeEvaluator } from "./code-evaluator";

export const executeCode = async ({
  code,
}: CommandArguments["EXECUTE_CODE"]) => {
  console.info(code)
  codeEvaluator.stop();
  codeEvaluator.evaluate(code);
};
