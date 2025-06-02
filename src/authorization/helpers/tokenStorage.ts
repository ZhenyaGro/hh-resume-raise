import path from "path";
import fs from "fs/promises";
import { Tokens } from "../type";

// Путь к корню проекта для хранения токенов
const TOKEN_FILE = path.resolve(process.cwd(), "tokens.json");

export async function saveTokens(tokens: Tokens) {
  await fs.writeFile(TOKEN_FILE, JSON.stringify(tokens, null, 2));
}

export async function loadTokens(): Promise<Tokens | null> {
  try {
    const raw = await fs.readFile(TOKEN_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
