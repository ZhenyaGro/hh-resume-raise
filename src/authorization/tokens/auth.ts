import dotenv from "dotenv";
import axios from "axios";
import { TokenResponse, Tokens } from "../type";
import { saveTokens } from "../helpers/tokenStorage";
import { addExpiry } from "../helpers/addExpiry";
import { TOKEN_URL } from "./constants/tokenUrl";
import { logError } from "@/logs/logError";

dotenv.config();

/**
 * Выполняет авторизацию и сохраняет токены в файл tokens.json.
 * Используется для получения токенов доступа к API HeadHunter.
 *
 * Перед запуском нужно убедиться, что переменная окружения HH_AUTHORIZATION_CODE установлена
 * с кодом авторизации, полученным от HeadHunter.
 */
export const auth = async () => {
  const code = process.env.HH_AUTHORIZATION_CODE!;

  const tokens = await getTokensFromCode(code);
  if (!tokens) return;

  await saveTokens(tokens);
  console.log("✅ Токены сохранены в tokens.json");
};

/**
 * Получение токенов по коду авторизации.
 * @param code - значение authorization_code, полученное при перенаправлении пользователя на hh.
 * @returns {Promise<Tokens>} токены с временем истечения.
 */
const getTokensFromCode = async (code: string): Promise<Tokens> => {
  /** @description описание параметров приведено в документации https://api.hh.ru/openapi/redoc#tag/Avtorizaciya-prilozheniya/operation/authorize */
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: process.env.HH_CLIENT_ID,
    client_secret: process.env.HH_CLIENT_SECRET,
    redirect_uri: process.env.HH_REDIRECT_URI,
  });

  try {
    const response = await axios.post<TokenResponse>(TOKEN_URL, params);
    return addExpiry(response.data);
  } catch (error) {
    logError(error);
  }
};
