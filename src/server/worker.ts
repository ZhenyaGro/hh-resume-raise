import { logEvent } from "@/logs/logEvent";
import { setSchedule } from "@/resume/raiseResumes/setSchedule";

async function worker() {
  logEvent("Скрипт начал работу. Настраиваем расписание...");
  setSchedule();
}

worker();
