import { formatDate } from "@/@helpers/formatDate";
import { getResumes } from "../getResumes/getResumes";

export const showResumes = async (token: string) => {
  const resumeList = await getResumes(token);

  if (!resumeList.length) {
    console.log("Резюме отсутствуют");
    return;
  }

  console.log("📋 Список резюме:");
  resumeList.forEach((resume) =>
    console.log(
      `${resume.title}, можно поднять: ${
        resume.can_publish_or_update
          ? "сейчас"
          : formatDate(resume.next_publish_at)
      } `
    )
  );
};
