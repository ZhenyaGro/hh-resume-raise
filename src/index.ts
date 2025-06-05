import { startMenu } from "./menu/startMenu";
import { MenuAction } from "./menu/enum/menuAction";
import { raiseAllResumes } from "./resume/raiseResumes/raiseAllResumes";
import { auth } from "./authorization";

async function main() {
  console.log("🚀 Запуск скрипта поднятия резюме");

  const answer = await startMenu();
  switch (answer.action) {
    case MenuAction.Timer:
      console.log("Данный функционал находится в разработке");
      // console.log("▶ Настраиваем планировщик...");
      break;
    case MenuAction.Raise:
      try {
        await raiseAllResumes();
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
