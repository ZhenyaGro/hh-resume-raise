import fs from "fs";
import { formatDate } from "../@helpers/formatDate";
import { LOG_FILE_NAME } from "./constants/logFileName";

const writeToFile = (message: string) => {
  const timestamp = new Date();
  fs.appendFileSync(LOG_FILE_NAME, `[${formatDate(timestamp)}] ${message}\n`);
};

export const logError = (error: Error) => {
  console.error("❌ Ошибка при выполнении:", error.message);
  writeToFile(`❌ Ошибка при выполнении: ${error.message}`);
};
