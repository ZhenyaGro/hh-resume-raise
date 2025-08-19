import fs from "fs";
import { LOG_FILE_NAME } from "./constants/logFileName";

export const clearLogFile = () => {
  fs.writeFileSync(LOG_FILE_NAME, "", { flag: "w" });
  console.log("✅ Журнал очищен");
};
