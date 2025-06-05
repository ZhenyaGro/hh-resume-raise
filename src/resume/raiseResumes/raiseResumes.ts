import axios, { AxiosError } from "axios";
import { Resume } from "../type";
import { RESUMES_URL } from "../constants/resumesUrl";
import { checkCanResumeUpdate } from "../helpers/checkCanResumeUpdate";

export const raiseResumes = async (
  resumes: Resume[],
  token: string
): Promise<void> => {
  for (const resume of resumes) {
    if (!checkCanResumeUpdate(resume)) continue;

    const id = resume.id;
    try {
      await axios.post(`${RESUMES_URL}/${id}/publish`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`✅ Поднято резюме: ${resume.title}`);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError;
        if (err.response?.status === 429) {
          console.log(
            `⏰ Резюме "${resume.title}" недавно поднималось. Пропущено`
          );
        } else {
          console.error(
            `❌ Ошибка при поднятии резюме: ${resume.title}`,
            err.message
          );
        }
      } else {
        console.error(
          `❌ Неизвестная ошибка при поднятии резюме: ${resume.title}`,
          error
        );
      }
    }
  }
};
