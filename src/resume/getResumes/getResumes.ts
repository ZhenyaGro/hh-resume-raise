import axios from "axios";
import { Resume } from "./type";
import { RESUMES_URL } from "./constants/resumesUrl";

/** Ответ hh на запрос списка резюме */
interface Response {
  found: number;
  page: number;
  pages: number;
  per_page: number;
  items: Resume[];
}

/**
 * Запрашивает список резюме пользователя.
 * @returns Список резюме пользователя.
 */
export const getResumes = async (token: string): Promise<Resume[]> => {
  const res = await axios.get<Response>(`${RESUMES_URL}/mine`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.items;
};
