import { getValidAccessToken } from "@/authorization";
import { getResumes } from "../getResumes/getResumes";
import { raiseResumes } from "./raiseResumes";

/** Поднимает все резюме пользователя. */
export const raiseAllResumes = async () => {
  const token = await getValidAccessToken();

  const resumes = await getResumes(token);

  if (!resumes.length) {
    console.log("❌ Резюме не найдено.");
    return;
  }

  raiseResumes(resumes, token);
};
