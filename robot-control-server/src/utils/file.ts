import { unlink } from "fs";

export const deleteFile = (filePath: string) => {
  unlink(filePath, (err) => {
    if (err) console.error(err);
  });
};
