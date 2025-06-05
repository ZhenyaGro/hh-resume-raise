import { MenuAction } from "../enum/menuAction";
import { Menu } from "../type";

export const MENU_ITEMS: Menu = [
  {
    name: "⏱️ Запустить автоматическое поднятие (раз в 4 часа)",
    value: MenuAction.Timer,
  },
  { name: "🆙 Поднять резюме", value: MenuAction.Raise },
  {
    name: "🔑 Авторизоваться (получить токены по code)",
    value: MenuAction.Auth,
  },
  { name: "🚪 Выйти", value: MenuAction.Exit },
];
