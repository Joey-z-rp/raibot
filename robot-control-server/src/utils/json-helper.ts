import { readFileSync, writeFileSync } from "fs";

export const readFromJson = (path: string): Object => {
  const data = readFileSync(path);
  return JSON.parse(data.toString());
};

export const writeToJson = (path: string, object: Object) => {
  const data = JSON.stringify(object);
  writeFileSync(path, data);
};
