import { startMenu } from "./menu/startMenu";
import { MenuAction } from "./menu/enum/menuAction";
import { raiseAllResumes } from "./resume/raiseResumes/raiseAllResumes";
import { auth, getValidAccessToken } from "./authorization";
import { setSchedule } from "./resume/raiseResumes/setSchedule";

async function main() {
  console.log("🚀 Запуск скрипта поднятия резюме");

  const answer = await startMenu();
  switch (answer.action) {
    case MenuAction.Timer:
      console.log("Настраиваем расписание...");
      setSchedule();
      break;
    case MenuAction.Raise:
      try {
        const token = await getValidAccessToken();
        await raiseAllResumes(token);
      } catch (e: any) {
        console.error("❌ Ошибка при выполнении:", e.message);
        process.exit(1);
      }
      break;
    case MenuAction.Auth:
      console.log("Авторизация...");
      auth();
      break;
    case MenuAction.Exit:
      console.log("Выход");
      process.exit(0);
  }
}

main();
