import dotenv from "dotenv";
import axios from "axios";
import { TOKEN_URL } from "./constants/tokenUrl";
import { loadTokens, saveTokens } from "../helpers/tokenStorage";
import { Tokens } from "../type";
import { addExpiry } from "../helpers/addExpiry";

dotenv.config();

/**
 * Обновление access_token по refresh_token.
 * @param {string} refreshToken - значение refresh_token, полученное при авторизации.
 * @returns {Promise<Tokens>} токены с временем истечения.
 */
const refreshAccessToken = async (refreshToken: string): Promise<Tokens> => {
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: process.env.HH_CLIENT_ID,
    client_secret: process.env.HH_CLIENT_SECRET,
  });

  const response = await axios.post(TOKEN_URL, params);
  return addExpiry(response.data);
};

/**
 * Получение валидного access_token.
 * Если токен истёк, то обновляет его по refresh_token.
 * @returns {Promise<string>} валидный access_token.
 */
export const getValidAccessToken = async (): Promise<string> => {
  let tokens = await loadTokens();

  if (!tokens) {
    throw new Error(
      "Нет сохранённых токенов. Необходимо получить code вручную."
    );
  }

  const now = Date.now();

  if (tokens.expires_at > now) {
    return tokens.access_token;
  }

  console.log("🔄 Токен истёк. Обновление...");
  tokens = await refreshAccessToken(tokens.refresh_token);
  await saveTokens(tokens);

  return tokens.access_token;
};
