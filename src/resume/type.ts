export interface Resume {
  /** Идентификатор резюме */
  id: string;
  /** Желаемая должность */
  title: string;
  /** Можно ли опубликовать или обновить данное резюме */
  can_publish_or_update: boolean | null;
  /** Дата и время следующей возможной публикации/обновления. Для неопубликованных резюме возвращается null */
  next_publish_at: string | null;
  [string: string]: any;
}
