import { ModelServerMessageContents } from "@/command-interface";

export type SetEnvUpdates = (
  updates: ModelServerMessageContents["CALCULATED_ENV_UPDATES"]
) => void;

export const processCalculatedEnvUpdatesMessage = (
  content: ModelServerMessageContents["CALCULATED_ENV_UPDATES"],
  setEnvUpdates: SetEnvUpdates
) => setEnvUpdates(content);
