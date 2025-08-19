import { writeToFile } from "@helpers/writeToFile";
import { LOG_FILE_NAME } from "./constants/logFileName";

export const logEvent = (message: string) => {
  console.log(message);
  writeToFile(LOG_FILE_NAME, message);
};
