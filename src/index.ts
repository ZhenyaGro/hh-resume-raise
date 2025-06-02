import { raiseAllResumes } from "./resume/raiseAllResumes";

async function main() {
  console.log("🚀 Запуск скрипта для поднятия резюме...");

  try {
    await raiseAllResumes();
  } catch (e: any) {
    console.error("❌ Ошибка при выполнении:", e.message);
    process.exit(1);
  }
}

main();
