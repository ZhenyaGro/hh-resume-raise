export const formatDate = (date: number | string | Date): string =>
  new Date(date).toLocaleString();
