import { ServerMessageContents } from "@/command-interface";
import { SetCapturedImage, SetServerState } from "@/types/server-context";

export const processCapturedImageMessage = (
  content: ServerMessageContents["CAPTURED_IMAGE"],
  _: SetServerState,
  setCapturedImage: SetCapturedImage
) => {
  setCapturedImage(content);
};
