import { getResumes } from "../getResumes/getResumes";
import { raiseResumes } from "./raiseResumes";

/** Поднимает все резюме пользователя. */
export const raiseAllResumes = async (token: string) => {
  const resumes = await getResumes(token);

  if (!resumes.length) {
    console.log("❌ Резюме не найдено.");
    return;
  }

  raiseResumes(resumes, token);
};
