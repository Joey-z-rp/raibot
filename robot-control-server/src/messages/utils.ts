import { ServerMessage, ServerMessageContents } from "../command-interface";

export const getMessage = <T extends ServerMessage>(
  type: T,
  content: ServerMessageContents[T]
) => ({
  type,
  content,
});
