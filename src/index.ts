import { startMenu } from "./menu/startMenu";
import { MenuAction } from "./menu/enum/menuAction";
import { raiseAllResumes } from "./resume/raiseResumes/raiseAllResumes";
import { auth, getValidAccessToken } from "./authorization";
import { setSchedule } from "./resume/raiseResumes/setSchedule";
import { showResumes } from "./resume/showResumes/showResumes";
import { logError } from "./logs/logError";
import { readLog } from "./logs/readLog";
import { clearLogFile } from "./logs/clearLog";
import { logEvent } from "./logs/logEvent";

async function main() {
  console.log("🚀 Запуск скрипта поднятия резюме");

  const answer = await startMenu();
  switch (answer.action) {
    case MenuAction.ResumeList:
      try {
        const token = await getValidAccessToken();
        if (token) await showResumes(token);
      } catch (e: any) {
        logError(e);
        process.exit(1);
      }
      break;
    case MenuAction.Timer:
      logEvent("Скрипт начал работу. Настраиваем расписание...");
      setSchedule();
      break;
    case MenuAction.Raise:
      try {
        const token = await getValidAccessToken();
        if (token) await raiseAllResumes(token);
      } catch (e: any) {
        logError(e);
        process.exit(1);
      }
      break;
    case MenuAction.Auth:
      console.log("Авторизация...");
      auth();
      break;
    case MenuAction.ReadLog:
      console.log("Чтение журнала событий...");
      readLog();
      break;
    case MenuAction.ClearLog:
      console.log("Очистка журнала событий...");
      clearLogFile();
      break;
    case MenuAction.Exit:
      console.log("Выход");
      process.exit(0);
  }
}

main();
