import { startCountdown } from "@/utils/startCountdown";
import { getResumes } from "../getResumes/getResumes";
import { raiseAllResumes } from "./raiseAllResumes";
import { getValidAccessToken } from "@/authorization";

/**
 * Задержка в миллисекундах.
 * @param ms Количество миллисекунд для задержки.
 * @returns Promise, которая разрешается через указанное время.
 */
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 * Устанавливает расписание для обновления резюме.
 * @param token Токен доступа пользователя.
 */
export const setSchedule = async () => {
  // Проверка токенов перед выполнением действия по расписанию
  const token = await getValidAccessToken();
  if (!token) return;

  await raiseAllResumes(token);

  const resumes = await getResumes(token);
  if (!resumes.length) {
    console.log("❌ Резюме не найдено.");
    return;
  }

  const nextUpdateTime = Math.min(
    ...resumes
      .filter((resume) => !resume.can_publish_or_update)
      .map((resume) => new Date(resume.next_publish_at).getTime())
  );

  /** Задержка до следующего запуска функции поднятия. Добавляется 1 минута для избежания возможных проблем с таймингом. */
  const delay = nextUpdateTime - Date.now() + 60 * 1000;

  console.log(
    "🕒 Следующее обновление резюме:",
    new Date(nextUpdateTime).toLocaleString()
  );

  startCountdown(nextUpdateTime);
  await sleep(delay);
  setSchedule();
};
