import inquirer from "inquirer";
import { MENU_ITEMS } from "./constants/menuItems";

export const startMenu = async () => {
  return await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Выберите действие:",
      choices: MENU_ITEMS,
    },
  ]);
};
