import { writeToFile } from "@helpers/writeToFile";
import { LOG_FILE_NAME } from "./constants/logFileName";

export const logError = (error: Error) => {
  console.error("❌ Ошибка при выполнении:", error.message);
  writeToFile(LOG_FILE_NAME, `❌ Ошибка при выполнении: ${error.message}`);
};
