import { formatDate } from "@helpers/formatDate";
import { Resume } from "../type";

/**
 * Проверяет, можно ли поднять резюме
 * @param {Resume} resume - Резюме, которое нужно проверить
 * @returns {boolean} - true, если резюме можно поднять, иначе false
 */
export const checkCanResumeUpdate = (resume: Resume): boolean => {
  // Если поднять резюме нельзя
  if (!resume.can_publish_or_update) {
    // Но указана дата следующего поднятия
    if (resume.next_publish_at) {
      console.log(
        `⏳ "Резюме ${resume.title}" можно поднять после: ${formatDate(
          resume.next_publish_at
        )}`
      );
    } else {
      console.warn(
        `❌ "${resume.title}" нельзя поднять. Дата следующего поднятия не указана.`
      );
    }
    return false;
  }
  return true;
};
