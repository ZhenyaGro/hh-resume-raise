import { TokenResponse, Tokens } from "../type";

/**
 * Добавляет поле expires_at к объекту токенов.
 * Поле expires_at вычисляется как текущее время плюс время жизни токена (expires_in) в миллисекундах,
 * минус 60 секунд для учета возможной задержки.
 * @param {TokenResponse} tokens - Объект токенов, содержащий поле expires_in.
 * @returns {Tokens} Объект токенов с добавленным полем expires_at.
 */
export const addExpiry = (tokens: TokenResponse): Tokens => {
  return {
    ...tokens,
    expires_at: Date.now() + tokens.expires_in * 1000 - 60_000,
  };
};
