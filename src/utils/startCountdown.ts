import readline from "readline";

/**
 * Интерактивный обратный отсчёт времени до следующего события.
 * @param targetTime - будущий timestamp в миллисекундах.
 */
export const startCountdown = async (targetTime: number) => {
  const interval = setInterval(() => {
    const now = Date.now();
    const diff = targetTime - now;

    if (diff <= 0) {
      clearInterval(interval);
      process.stdout.write("\rОтсчет таймера завершен\n");
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let timeString = "";
    if (hours > 0) {
      timeString += `${hours}ч `;
    }
    timeString += `${minutes}м ${seconds}с`;

    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`⏳ До следующего события: ${timeString}`);
  }, 1000);
};
