import fs from "fs";
import { formatDate } from "./formatDate";

export const writeToFile = (fileName: string, message: string) => {
  const timestamp = new Date();
  fs.appendFileSync(fileName, `[${formatDate(timestamp)}] ${message}\n`);
};
