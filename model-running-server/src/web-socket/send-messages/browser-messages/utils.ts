import {
  ModelServerMessage,
  ModelServerMessageContents,
} from "../../../command-interface";

export const getMessage = <T extends ModelServerMessage>(
  type: T,
  content: ModelServerMessageContents[T]
) => ({
  type,
  content,
});
