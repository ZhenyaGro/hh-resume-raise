import fs from "fs";
import { LOG_FILE_NAME } from "./constants/logFileName";

export const readLog = () => {
  fs.readFile(LOG_FILE_NAME, "utf8", (err, data) => {
    if (err) {
      console.error("Ошибка чтения файла:", err);
      return;
    }
    console.log(data ? data : "Журнал событий пуст");
  });
};
